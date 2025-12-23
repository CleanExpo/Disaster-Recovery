/**
 * Mobile Data Store - Local SQLite Database Management
 *
 * Manages persistent local storage using SQLite on mobile platforms,
 * with encryption, indexing, and query optimization.
 *
 * @module MobileDataStore
 */

import { EventEmitter } from 'events';
import { Logger } from '../logging/logger';
import { MetricsCollector } from '../monitoring/metrics-collector';
import { NativeBridge } from './native-bridge';

interface DataStoreConfig {
  databaseName: string;
  version: number;
  encryptionKey?: string;
  maxSize: number; // MB
  enableWAL: boolean; // Write-Ahead Logging
}

interface TableSchema {
  name: string;
  columns: {
    name: string;
    type: 'INTEGER' | 'REAL' | 'TEXT' | 'BLOB';
    primary?: boolean;
    unique?: boolean;
    notnull?: boolean;
    default?: any;
  }[];
  indices: {
    name: string;
    columns: string[];
    unique?: boolean;
  }[];
}

interface QueryResult {
  success: boolean;
  rowsAffected: number;
  insertId?: number;
  rows?: any[];
  error?: string;
}

export class MobileDataStore extends EventEmitter {
  private config: DataStoreConfig;
  private logger: Logger;
  private metrics: MetricsCollector;
  private nativeBridge: NativeBridge;
  private isInitialized = false;
  private tables = new Map<string, TableSchema>();
  private queryCache = new Map<string, { result: any; timestamp: number }>();
  private cacheMaxAge = 5 * 60 * 1000; // 5 minutes

  constructor(config: DataStoreConfig, nativeBridge: NativeBridge) {
    super();
    this.config = config;
    this.nativeBridge = nativeBridge;
    this.logger = new Logger('MobileDataStore');
    this.metrics = new MetricsCollector('mobile_data_store');
  }

  /**
   * Initialize the database
   */
  async initialize(): Promise<void> {
    try {
      this.logger.info('Initializing mobile data store', {
        database: this.config.databaseName,
        maxSize: this.config.maxSize
      });

      // Create database
      const result = await this.nativeBridge.invokeMethod('Database', 'open', {
        name: this.config.databaseName,
        version: this.config.version,
        encryption: !!this.config.encryptionKey,
        encryptionKey: this.config.encryptionKey,
        maxSize: this.config.maxSize * 1024 * 1024,
        wal: this.config.enableWAL
      });

      if (!result?.success) {
        throw new Error('Failed to open database');
      }

      this.isInitialized = true;
      this.emit('initialized');

      this.logger.info('Mobile data store initialized');
    } catch (error) {
      this.logger.error('Failed to initialize mobile data store', { error });
      throw error;
    }
  }

  /**
   * Create a table
   */
  async createTable(schema: TableSchema): Promise<void> {
    try {
      const result = await this.nativeBridge.invokeMethod('Database', 'executeSQL', {
        sql: this.buildCreateTableSQL(schema)
      });

      if (!result?.success) {
        throw new Error(`Failed to create table: ${schema.name}`);
      }

      // Create indices
      for (const index of schema.indices) {
        await this.nativeBridge.invokeMethod('Database', 'executeSQL', {
          sql: this.buildCreateIndexSQL(schema.name, index)
        });
      }

      this.tables.set(schema.name, schema);

      this.logger.debug('Table created', { table: schema.name });
      this.emit('tableCreated', schema);
    } catch (error) {
      this.logger.error('Failed to create table', { error, table: schema.name });
      throw error;
    }
  }

  /**
   * Insert a row
   */
  async insert(table: string, data: Record<string, any>): Promise<number> {
    try {
      const { columns, placeholders, values } = this.buildInsertData(data);

      const sql = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;

      const result = await this.nativeBridge.invokeMethod('Database', 'executeSQL', {
        sql,
        args: values
      });

      if (!result?.success) {
        throw new Error(`Insert failed: ${result?.error}`);
      }

      this.clearCache();
      this.metrics.recordMetric('insert', { table });

      return result.insertId || 0;
    } catch (error) {
      this.logger.error('Failed to insert row', { error, table });
      throw error;
    }
  }

  /**
   * Insert multiple rows in a batch
   */
  async insertBatch(table: string, rows: Record<string, any>[]): Promise<number> {
    try {
      let insertedCount = 0;

      for (const row of rows) {
        await this.insert(table, row);
        insertedCount++;
      }

      return insertedCount;
    } catch (error) {
      this.logger.error('Failed to insert batch', { error, table });
      throw error;
    }
  }

  /**
   * Update rows
   */
  async update(table: string, data: Record<string, any>, where: Record<string, any>): Promise<number> {
    try {
      const { updates, values } = this.buildUpdateData(data);
      const { whereClause, whereValues } = this.buildWhereClause(where);

      const sql = `UPDATE ${table} SET ${updates} WHERE ${whereClause}`;
      const allValues = [...values, ...whereValues];

      const result = await this.nativeBridge.invokeMethod('Database', 'executeSQL', {
        sql,
        args: allValues
      });

      if (!result?.success) {
        throw new Error(`Update failed: ${result?.error}`);
      }

      this.clearCache();
      this.metrics.recordMetric('update', { table, rowsAffected: result.rowsAffected });

      return result.rowsAffected || 0;
    } catch (error) {
      this.logger.error('Failed to update rows', { error, table });
      throw error;
    }
  }

  /**
   * Delete rows
   */
  async delete(table: string, where: Record<string, any>): Promise<number> {
    try {
      const { whereClause, whereValues } = this.buildWhereClause(where);

      const sql = `DELETE FROM ${table} WHERE ${whereClause}`;

      const result = await this.nativeBridge.invokeMethod('Database', 'executeSQL', {
        sql,
        args: whereValues
      });

      if (!result?.success) {
        throw new Error(`Delete failed: ${result?.error}`);
      }

      this.clearCache();
      this.metrics.recordMetric('delete', { table, rowsAffected: result.rowsAffected });

      return result.rowsAffected || 0;
    } catch (error) {
      this.logger.error('Failed to delete rows', { error, table });
      throw error;
    }
  }

  /**
   * Query rows
   */
  async query(
    sql: string,
    args: any[] = [],
    useCache: boolean = true
  ): Promise<any[]> {
    try {
      // Check cache first
      const cacheKey = `${sql}:${JSON.stringify(args)}`;
      if (useCache) {
        const cached = this.queryCache.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < this.cacheMaxAge) {
          this.logger.debug('Query result from cache');
          return cached.result;
        }
      }

      const result = await this.nativeBridge.invokeMethod('Database', 'executeSQL', {
        sql,
        args
      });

      if (!result?.success) {
        throw new Error(`Query failed: ${result?.error}`);
      }

      const rows = result.rows || [];

      // Cache the result
      if (useCache) {
        this.queryCache.set(cacheKey, { result: rows, timestamp: Date.now() });
      }

      this.metrics.recordMetric('query', { rowsReturned: rows.length });

      return rows;
    } catch (error) {
      this.logger.error('Failed to execute query', { error });
      throw error;
    }
  }

  /**
   * Find rows by criteria
   */
  async find(table: string, where: Record<string, any> = {}, limit?: number): Promise<any[]> {
    try {
      const { whereClause, whereValues } = this.buildWhereClause(where);

      let sql = `SELECT * FROM ${table}`;
      if (whereClause) {
        sql += ` WHERE ${whereClause}`;
      }
      if (limit) {
        sql += ` LIMIT ${limit}`;
      }

      return this.query(sql, whereValues);
    } catch (error) {
      this.logger.error('Failed to find rows', { error, table });
      throw error;
    }
  }

  /**
   * Find a single row
   */
  async findOne(table: string, where: Record<string, any>): Promise<any | null> {
    const results = await this.find(table, where, 1);
    return results[0] || null;
  }

  /**
   * Get count of rows
   */
  async count(table: string, where: Record<string, any> = {}): Promise<number> {
    try {
      const { whereClause, whereValues } = this.buildWhereClause(where);

      let sql = `SELECT COUNT(*) as count FROM ${table}`;
      if (whereClause) {
        sql += ` WHERE ${whereClause}`;
      }

      const results = await this.query(sql, whereValues);
      return results[0]?.count || 0;
    } catch (error) {
      this.logger.error('Failed to count rows', { error, table });
      throw error;
    }
  }

  /**
   * Execute a transaction
   */
  async transaction(callback: () => Promise<void>): Promise<void> {
    try {
      await this.nativeBridge.invokeMethod('Database', 'executeSQL', {
        sql: 'BEGIN TRANSACTION'
      });

      try {
        await callback();
        await this.nativeBridge.invokeMethod('Database', 'executeSQL', {
          sql: 'COMMIT'
        });
        this.clearCache();
        this.logger.debug('Transaction committed');
      } catch (error) {
        await this.nativeBridge.invokeMethod('Database', 'executeSQL', {
          sql: 'ROLLBACK'
        });
        throw error;
      }
    } catch (error) {
      this.logger.error('Transaction failed', { error });
      throw error;
    }
  }

  /**
   * Get database statistics
   */
  async getStatistics(): Promise<{
    size: number; // bytes
    tables: number;
    pageSize: number;
    pageCount: number;
  }> {
    try {
      const pragmaResult = await this.query('PRAGMA page_count');
      const pageSizeResult = await this.query('PRAGMA page_size');

      const pageCount = pragmaResult[0]?.page_count || 0;
      const pageSize = pageSizeResult[0]?.page_size || 4096;

      return {
        size: pageCount * pageSize,
        tables: this.tables.size,
        pageSize,
        pageCount
      };
    } catch (error) {
      this.logger.warn('Failed to get statistics', { error });
      return { size: 0, tables: 0, pageSize: 0, pageCount: 0 };
    }
  }

  /**
   * Backup database
   */
  async backup(backupPath: string): Promise<void> {
    try {
      const result = await this.nativeBridge.invokeMethod('Database', 'backup', {
        destination: backupPath
      });

      if (!result?.success) {
        throw new Error('Backup failed');
      }

      this.logger.info('Database backup created', { path: backupPath });
      this.emit('backupCreated', { path: backupPath });
    } catch (error) {
      this.logger.error('Failed to backup database', { error });
      throw error;
    }
  }

  /**
   * Restore database from backup
   */
  async restore(backupPath: string): Promise<void> {
    try {
      const result = await this.nativeBridge.invokeMethod('Database', 'restore', {
        source: backupPath
      });

      if (!result?.success) {
        throw new Error('Restore failed');
      }

      this.clearCache();
      this.logger.info('Database restored', { path: backupPath });
      this.emit('restored', { path: backupPath });
    } catch (error) {
      this.logger.error('Failed to restore database', { error });
      throw error;
    }
  }

  /**
   * Clear cache
   */
  private clearCache(): void {
    this.queryCache.clear();
  }

  /**
   * Build CREATE TABLE SQL
   */
  private buildCreateTableSQL(schema: TableSchema): string {
    const columnDefs = schema.columns
      .map(col => {
        let def = `${col.name} ${col.type}`;
        if (col.primary) def += ' PRIMARY KEY';
        if (col.unique) def += ' UNIQUE';
        if (col.notnull) def += ' NOT NULL';
        if (col.default !== undefined) def += ` DEFAULT ${col.default}`;
        return def;
      })
      .join(', ');

    return `CREATE TABLE IF NOT EXISTS ${schema.name} (${columnDefs})`;
  }

  /**
   * Build CREATE INDEX SQL
   */
  private buildCreateIndexSQL(tableName: string, index: any): string {
    const unique = index.unique ? 'UNIQUE' : '';
    const columns = index.columns.join(', ');
    return `CREATE ${unique} INDEX IF NOT EXISTS ${index.name} ON ${tableName} (${columns})`;
  }

  /**
   * Build INSERT data
   */
  private buildInsertData(data: Record<string, any>): {
    columns: string;
    placeholders: string;
    values: any[];
  } {
    const columns = Object.keys(data).join(', ');
    const placeholders = Object.keys(data).map(() => '?').join(', ');
    const values = Object.values(data);

    return { columns, placeholders, values };
  }

  /**
   * Build UPDATE data
   */
  private buildUpdateData(data: Record<string, any>): {
    updates: string;
    values: any[];
  } {
    const updates = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = Object.values(data);

    return { updates, values };
  }

  /**
   * Build WHERE clause
   */
  private buildWhereClause(where: Record<string, any>): {
    whereClause: string;
    whereValues: any[];
  } {
    const conditions = Object.entries(where)
      .map(([key]) => `${key} = ?`)
      .join(' AND ');

    const values = Object.values(where);

    return { whereClause: conditions, whereValues: values };
  }

  /**
   * Close database
   */
  async close(): Promise<void> {
    try {
      await this.nativeBridge.invokeMethod('Database', 'close');
      this.isInitialized = false;
      this.clearCache();
      this.logger.info('Database closed');
    } catch (error) {
      this.logger.warn('Failed to close database', { error });
    }
  }

  /**
   * Cleanup
   */
  async cleanup(): Promise<void> {
    await this.close();
    this.removeAllListeners();
    this.logger.info('Mobile data store cleanup complete');
  }
}

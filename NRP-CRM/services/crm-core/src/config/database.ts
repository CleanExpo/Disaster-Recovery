import { PrismaClient } from '@prisma/client';
import logger from './logger';

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'event',
      level: 'error',
    },
    {
      emit: 'event',
      level: 'info',
    },
    {
      emit: 'event',
      level: 'warn',
    },
  ],
  errorFormat: 'colorless',
});

// Log database queries in development
if (process.env.NODE_ENV === 'development') {
  prisma.$on('query', (e) => {
    logger.debug('Database Query', {
      query: e.query,
      params: e.params,
      duration: `${e.duration}ms`,
    });
  });
}

// Log database errors
prisma.$on('error', (e) => {
  logger.error('Database Error', {
    message: e.message,
    target: e.target,
  });
});

// Log database info
prisma.$on('info', (e) => {
  logger.info('Database Info', {
    message: e.message,
    target: e.target,
  });
});

// Log database warnings
prisma.$on('warn', (e) => {
  logger.warn('Database Warning', {
    message: e.message,
    target: e.target,
  });
});

// Graceful shutdown
process.on('SIGINT', async () => {
  logger.info('Disconnecting from database...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  logger.info('Disconnecting from database...');
  await prisma.$disconnect();
  process.exit(0);
});

export default prisma;
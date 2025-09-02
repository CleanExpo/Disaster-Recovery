import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss',
  }),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    const metaStr = Object.keys(meta).length ? JSON.stringify(meta, null, 2) : '';
    return `${timestamp} [${level}]: ${message} ${metaStr}`;
  })
);

// Define log transports
const transports: winston.transport[] = [];

// Console transport for development
if (process.env.NODE_ENV === 'development') {
  transports.push(
    new winston.transports.Console({
      format: consoleFormat,
      level: 'debug',
    })
  );
} else {
  // Console transport for production (only errors and warnings)
  transports.push(
    new winston.transports.Console({
      format: logFormat,
      level: 'warn',
    })
  );
}

// File transports for all environments
transports.push(
  // Error logs
  new DailyRotateFile({
    filename: 'logs/error-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    level: 'error',
    format: logFormat,
    maxSize: process.env.LOG_FILE_MAX_SIZE || '20m',
    maxFiles: process.env.LOG_FILE_MAX_FILES || '14d',
    zippedArchive: true,
  }),
  
  // Combined logs
  new DailyRotateFile({
    filename: 'logs/combined-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    format: logFormat,
    maxSize: process.env.LOG_FILE_MAX_SIZE || '20m',
    maxFiles: process.env.LOG_FILE_MAX_FILES || '14d',
    zippedArchive: true,
  }),
  
  // Application logs
  new DailyRotateFile({
    filename: 'logs/app-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    level: 'info',
    format: logFormat,
    maxSize: process.env.LOG_FILE_MAX_SIZE || '20m',
    maxFiles: process.env.LOG_FILE_MAX_FILES || '14d',
    zippedArchive: true,
  })
);

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  transports,
  exitOnError: false,
});

// Handle unhandled exceptions and rejections
logger.exceptions.handle(
  new DailyRotateFile({
    filename: 'logs/exceptions-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m',
    maxFiles: '30d',
  })
);

logger.rejections.handle(
  new DailyRotateFile({
    filename: 'logs/rejections-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m',
    maxFiles: '30d',
  })
);

// Create a stream object for Morgan
export const stream = {
  write: (message: string) => {
    logger.info(message.trim());
  },
};

export default logger;
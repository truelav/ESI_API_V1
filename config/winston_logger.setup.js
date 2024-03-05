import winston from 'winston';
import  DailyRotateFile from 'winston-daily-rotate-file';
import { randomBytes } from 'crypto';

const { combine, timestamp, colorize, json, label, printf, metadata } = winston.format;

const timestampFormat = 'MMM-DD-YYYY HH:mm:ss';
const appVersion = process.env.NPM_PACKAGE_VERSION;

const generateLogId = () => randomBytes(16).toString('hex');

// Logger for API endpoints
export const httpLogger = winston.createLogger({
    format: combine(
      timestamp({ format: timestampFormat }),
      json(),
      printf(({ timestamp, level, message, ...data }) => {
        const response = {
          level,
          logId: generateLogId(),
          timestamp,
          appInfo: {
            appVersion,
            environment: process.env.NODE_ENV, // development/staging/production
            proccessId: process.pid,
          },
          message,
          data,
        };
  
        return JSON.stringify(response, null, LogIndentation.MD);
      })
    ),
    transports: [
      // log to console
      new winston.transports.Console({
        // if set to true, logs will not appear
        silent: process.env.NODE_ENV === 'test_env' // true/false
      }),
      // log to file
      new winston.transports.File({
        filename: 'logs/application-logs.log',
      }),
      // log to file, but rotate daily
      new DailyRotateFile({
        filename: 'logs/rotating-logs-%DATE%.log', // file name includes current date
        datePattern: 'MMMM-DD-YYYY',
        zippedArchive: false, // zip logs true/false
        maxSize: '20m', // rotate if file size exceeds 20 MB
        maxFiles: '14d' // max files
      })
    ],
  });
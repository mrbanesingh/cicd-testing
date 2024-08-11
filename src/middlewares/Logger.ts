import { NextFunction } from "express";
import winston, { createLogger, format } from "winston";
import "winston-daily-rotate-file"; // Ensure this import for daily file rotation
import LokiTransport from "winston-loki";
//import HttpTransport from './http-transport'; // Import your custom HTTP transport

const logFormat = winston.format.combine(
  winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
    winston.format.errors({ stack: true }),
    winston.format.json(),
    // winston.format.printf(({ timestamp, level, message, metadata }) => {
    //   return `[${timestamp}] ${level}: ${message}. ${JSON.stringify(metadata)}`;
    // }),
    winston.format.colorize({ all: true })
  )
);

//logger using winston library
const loggerOptions = {
  transports: [
    new LokiTransport({
      labels: {
        appName: "Boiler App",
      },
      //host: "http://your-loki-instance-url", // Replace with your Loki instance URL
      host: "http://127.0.0.1:3100",
      json: true,
      format: format.json(),
    }),
  ],
};

const logger = createLogger(loggerOptions);

export default logger;

// const levels = {
//   error: 0,
//   warn: 1,
//   info: 2,
//   http: 3,
//   debug: 4,
// };

// const colors = {
//   error: "red",
//   warn: "yellow",
//   info: "green",
//   http: "magenta",
//   debug: "white",
// };

// winston.addColors(colors);

// const format = winston.format.combine(
//   winston.format.combine(
//     winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
//     winston.format.errors({ stack: true }),
//     winston.format.json(),
//     // winston.format.printf(({ timestamp, level, message, metadata }) => {
//     //   return `[${timestamp}] ${level}: ${message}. ${JSON.stringify(metadata)}`;
//     // }),
//     winston.format.colorize({ all: true })
//   )
// );

// const transports = [
//   new winston.transports.Console(),
//   //new HttpTransport({ level: 'info' }), // Add your HTTP transport instance here

//   new winston.transports.DailyRotateFile({
//     filename: "logs/error-%DATE%.log",
//     datePattern: "YYYY-MM-DD",
//     zippedArchive: true,
//     maxSize: "20m",
//     maxFiles: 14,
//     level: "error",
//   }),
//   new winston.transports.File({
//     filename: "logs/all.log",
//     zippedArchive: true,
//   }),
// ];

// const logger = winston.createLogger({
//   levels,
//   format,
//   transports,
//   exceptionHandlers: [
//     new winston.transports.File({ filename: "logs/exception.log" }),
//   ],
//   rejectionHandlers: [
//     new winston.transports.File({ filename: "logs/rejections.log" }),
//   ],
// });

// export default logger;

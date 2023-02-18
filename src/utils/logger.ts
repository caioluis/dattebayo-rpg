import { createLogger, format, transports } from "winston";
import { Logtail } from "@logtail/node";
import { LogtailTransport } from "@logtail/winston";

// Logger formats
const console_format = format.combine(
  format((info) => ({ ...info, level: info.level.toUpperCase() }))(),

  format.colorize(),
  format.metadata(),
  format.errors({ stack: true }),
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.printf(({ timestamp, level, message, metadata }) => {
    return `${timestamp} [${metadata.context}] ${level}: ${message}`;
  })
);

const file_format = format.combine(
  format((info) => ({ ...info, level: info.level.toUpperCase() }))(),

  format.metadata(),
  format.errors({ stack: true }),
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.json()
);

const transports_dev = [
  new transports.Console({ format: console_format }),
  new transports.File({ filename: "logs/error.log", format: file_format, level: "error" }),
  new transports.File({ filename: "logs/combined.log", format: file_format })
];

// Create LogTail client
const token = process.env.NODE_ENV === "production" ? process.env.LOGTAIL_TOKEN : process.env.LOGTAIL_TOKEN_STAGING;
const logtail = new Logtail(token || "");

// Create the logger
const logger = createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  transports: process.env.NODE_ENV === "development" ? transports_dev : [new LogtailTransport(logtail)]
});

export default logger;

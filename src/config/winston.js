const { transports, format, createLogger } = require("winston");
const { colorize, combine, timestamp, printf } = format;

const logFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level} : ${message}`;
});

const logger = createLogger({
  level: "info",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    colorize(),
    logFormat,
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "logs/error.log", level: "error" }),
    new transports.File({ filename: "logs/combined.log" }),
  ],
  exitOnError: false,
});

module.exports = logger;
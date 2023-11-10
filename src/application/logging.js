import winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({}),
        new DailyRotateFile({
            filename: 'src/logs/app-%DATE%.log',
            zippedArchive: true,
            maxSize: "1m",
            maxFiles: "14d",
            level: "error"
        })
    ]
})
/* eslint-disable prettier/prettier */
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { transports, format, LoggerOptions, Logform } from 'winston';

export const winstonLoggerConfig: LoggerOptions = {
    transports: [
        new transports.Console({
            format: format.combine(
                format.timestamp(),
                nestWinstonModuleUtilities.format.nestLike('RAG-MS', {
                    prettyPrint: true,
                }) as Logform.Format,
            ),
        }),
        new transports.File({
            filename: 'logs/error.log', // Logs with level = error or higher will be written here.
            level: 'error',
        }),
        new transports.File({
            filename: 'logs/combined.log', // Logs all levels (info, warn, error, etc.).
        }),
    ],
};

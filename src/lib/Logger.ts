import winston from "winston";

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3
};

const colors = {
    debug: 'blue',
    verbose: 'cyan',
    info: 'green',
    warn: 'yellow',
    error: 'red'
};

winston.addColors(colors);

const consoleFormat = winston.format.combine(
    winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }),
    winston.format.colorize(),
    winston.format.errors({ stack: true }),
    winston.format.printf(info => {
        let msg = `${info.timestamp} ${info.level}: ${info.message}`;

        const splat = info[Symbol.for('splat') as unknown as string];

        if (splat) {
            if (splat.length === 1) {
                msg += ` ${JSON.stringify(splat[0])}`;
            } else if (splat.length > 1) {
                msg += ` ${JSON.stringify(info[Symbol.for('splat') as unknown as string])}`;
            }
        }

        return msg;
    })
);

const logger = winston.createLogger({
    levels: levels
});

logger.add(
    new winston.transports.Console({
        format: consoleFormat
    })
);

export default logger;
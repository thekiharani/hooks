import pino from 'pino';

export const logger = pino({
    level: process.env.PINO_LOG_LEVEL || 'debug',
    timestamp: pino.stdTimeFunctions.isoTime,
    redact: {
        paths: ['email'],
    },
});

logger.info({
    message: 'Welcome to Noria Payments API!',
    status: 'Connected',
    timestamp: new Date().toUTCString(),
});

export default logger;
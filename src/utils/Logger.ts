enum LogLevel {
    DEBUG = 'debug',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error',
}

interface LogMessage {
    level: LogLevel;
    message: string;
    timestamp: string;
}

export class APILogger {
    private static instance: APILogger;
    private logs: LogMessage[];

    private constructor() {
        this.logs = [];
    }

    public static getInstance(): APILogger {
        if (!APILogger.instance) {
            APILogger.instance = new APILogger();
        }
        return APILogger.instance;
    }

    public debug(message: string): void {
        this.log(LogLevel.DEBUG, message);
    }

    public info(message: string): void {
        this.log(LogLevel.INFO, message);
    }

    public warn(message: string): void {
        this.log(LogLevel.WARN, message);
    }

    public error(message: string): void {
        this.log(LogLevel.ERROR, message);
    }

    private log(level: LogLevel, message: string): void {
        const logMessage: LogMessage = {
            level,
            message,
            timestamp: new Date().toISOString(),
        };
        this.logs.push(logMessage);

        // You can customize logging behavior here, e.g., send logs to server, write to file, etc.
        console.log(`[${logMessage.timestamp}] [${logMessage.level.toUpperCase()}]: ${logMessage.message}`);
    }

    public getLogs(): LogMessage[] {
        return this.logs;
    }
}

// Usage example:

// Create an instance of Logger
export default APILogger.getInstance();
// Log messages
// logger.debug('Debug message');
// logger.info('Info message');
// logger.warn('Warning message');
// logger.error('Error message');

// Retrieve logs
// const logs = logger.getLogs();
// console.log('Logs:', logs);

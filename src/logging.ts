/* eslint-disable no-console */
import { format } from "date-fns";

const formatDate = (date: Date): string => format(date, "yyyy-MM-dd HH:mm:ss.SSS");

const levels = { debug: 0, info: 1, warn: 2, error: 3 } as const;

type Level = keyof typeof levels;

class Logger {
    level: Level;
    static format(level: Level, message: string) {
        return `[${formatDate(new Date())}] [${level.toUpperCase()}] ${message}`;
    }

    constructor(level: Level) {
        this.level = level;
    }

    debug(message: string) {
        if (levels[this.level] > levels.debug) {
            return;
        }
        console.log(Logger.format(this.level, message));
    }

    info(message: string) {
        if (levels[this.level] > levels.info) {
            return;
        }
        console.log(Logger.format(this.level, message));
    }

    warn(message: string) {
        if (levels[this.level] > levels.warn) {
            return;
        }
        console.log(Logger.format(this.level, message));
    }

    error(message: string) {
        if (levels[this.level] > levels.error) {
            return;
        }
        console.error(Logger.format(this.level, message));
    }
}

export const logger = new Logger("debug");

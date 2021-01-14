import {Logger} from 'typescript-logging';

export const logger = (logger: Logger) => ({
    debug: (string: string) => () => logger.debug(string),
    info: (string: string) => () => logger.info(string),
    error: (string: string) => () => logger.error(string),
    trace: (string: string) => () => logger.trace(string),
});
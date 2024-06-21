import { Service } from "typedi";
import pino from "pino";

@Service({ id: "logger" })
export class Logger {

    constructor(source: string) {
        this.source = source;
    }

    static logger = pino({ level: 'debug', timestamp: pino.stdTimeFunctions.isoTime });
    private source = "unknown";

    d(message :string, json :any = {}) :void {
        Logger.debug(`${message}`, Object.assign({ src: `${this.source}`}, json))
    }

    i(message :string, json :any = {}) :void {
        Logger.info(`${message}`, Object.assign({ src: `${this.source}`}, json))
    }

    w(message :string, json :any = {}) :void {
        Logger.warn(`${message}`, Object.assign({ src: `${this.source}`}, json))
    }

    e(message :string, json :any = {}) :void {
        Logger.error(`${message}`, Object.assign({ src: `${this.source}`}, json))
    }

    static debug(message :string, json :any = {}) :void {
        this.logger.debug(json, `${message}`);
    }

    static info(message :string, json :any = {}) :void {
        this.logger.info(json, `${message}`);
    }

    static warn(message :string, json :any = {}) :void {
        this.logger.warn(json, `${message}`);
    }

    static error(message :string, json :any = {}) :void {
        this.logger.error(json, `${message}`);
    }
}

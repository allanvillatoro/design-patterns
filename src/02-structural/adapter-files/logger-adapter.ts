import log4javascript from "log4javascript";

//Target interface
interface ILoggerAdapter {
  file: string;
  writeLog(msg: string): void;
  writeWarning(msg: string): void;
  writeError(msg: string): void;
}

export class JSLoggerAdapter implements ILoggerAdapter {
  file: string;
  private logger = log4javascript.getLogger();

  constructor(file: string) {
    this.file = file;
    const consoleAppender = new log4javascript.BrowserConsoleAppender();
    this.logger.addAppender(consoleAppender);
  }

  writeLog(msg: string): void {
    this.logger.info(`[${this.file} Log] ${msg}`);
  }
  writeWarning(msg: string): void {
    this.logger.warn(`[${this.file} warning] ${msg}`);
  }
  writeError(msg: string): void {
    this.logger.error(`[${this.file} Error] ${msg}`);
  }
}

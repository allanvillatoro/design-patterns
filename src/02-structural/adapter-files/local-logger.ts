export class LocalLogger {
  constructor(private file: string) {}

  writeLog(msg: string): void {
    console.log(`[${this.file} Log] ${msg}`);
  }

  writeError(msg: string): void {
    console.log(`[${this.file} Error] ${msg}`);
  }

  writeWarning(msg: string): void {
    console.log(`[${this.file} warning] ${msg}`);
  }
}

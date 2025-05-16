/* eslint-disable no-console */
import chalk from "chalk";
import dayjs from "dayjs";

class Logger {
  private prefix: string;

  constructor(prefix = "") {
    this.prefix = prefix;
  }

  public setPrefix(prefix: string) {
    this.prefix = prefix;
  }

  public getPrefix() {
    return this.prefix;
  }

  public info(...args: unknown[]) {
    console.log(
      chalk.blue(
        `[${dayjs().format("YYYY-MM-DD HH:mm:ss.SSS")}]${
          this.prefix ? `[${this.prefix}]` : ""
        }[INFO]`
      ),
      ...args
    );
  }

  public warn(...args: unknown[]) {
    console.log(
      chalk.yellow(
        `[${dayjs().format("YYYY-MM-DD HH:mm:ss.SSS")}]${
          this.prefix ? `[${this.prefix}]` : ""
        }[WARNING]`
      ),
      ...args
    );
  }

  public error(...args: unknown[]) {
    console.log(
      chalk.red(
        `[${dayjs().format("YYYY-MM-DD HH:mm:ss.SSS")}]${
          this.prefix ? `[${this.prefix}]` : ""
        }[ERROR]`
      ),
      ...args
    );
  }
}

export const logger = new Logger();

import { execSync } from "child_process";

/*
  This class is responsible for running commands in the terminal.
*/
export class CommandRunner {
  private cmdPath: string;

  constructor(cmdPath: string) {
    this.cmdPath = cmdPath;
  }

  public gitInit(): void {
    try {
      execSync("git init", { cwd: this.cmdPath });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public npmInstall(): void {
    try {
      execSync("npm install", { cwd: this.cmdPath });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

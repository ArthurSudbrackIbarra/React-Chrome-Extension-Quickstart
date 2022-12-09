import pkg from "fs-extra";
const { copySync } = pkg; /* CommonJS module import. */
import { existsSync, mkdirSync } from "fs";

export class FileHandler {
  public static createDirectory(path: string): void {
    try {
      if (!existsSync(path)) {
        mkdirSync(path, { recursive: true });
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }
  public static copyDirectory(source: string, destination: string): void {
    try {
      copySync(source, destination, {
        recursive: true,
        overwrite: true,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

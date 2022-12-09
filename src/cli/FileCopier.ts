import fsExtra from "fs-extra";
const { copySync } = fsExtra; /* CommonJS module import. */
import { existsSync, mkdirSync } from "fs";

/*
  This class is responsible for handling file operations.
*/
export class FileHandler {
  /*
    Creates a directory if it doesn't exist.
  */
  public static createDirectory(path: string): void {
    try {
      if (!existsSync(path)) {
        mkdirSync(path, { recursive: true });
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }
  /*
    Copies the content of a directory to another directory.
  */
  public static copyDirectory(
    source: string,
    destination: string,
    ignoreList: string[] = []
  ): void {
    try {
      copySync(source, destination, {
        recursive: true,
        overwrite: true,
        filter: (path: string) => {
          for (const item of ignoreList) {
            if (path.endsWith(item)) {
              return false;
            }
          }
          return true;
        },
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

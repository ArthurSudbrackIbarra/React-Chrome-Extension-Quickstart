import { readdirSync, readFileSync } from "fs";
import { ReplacementsMap } from "./ReplacementsMap.js";

export class TemplateFiller {
  private templatesDir: string;
  private replacementsMap: ReplacementsMap;

  constructor(templatesDir: string, replacementsMap: ReplacementsMap) {
    this.templatesDir = templatesDir;
    this.replacementsMap = replacementsMap;
  }

  //   private replacePlaceholder(line: string): string {
  //     const regex = new RegExp("::([^=]+)(=?)([^=]+)::", "g");
  //   }

  public fill(): void {
    try {
      for (const file of readdirSync(this.templatesDir, {
        withFileTypes: true,
      })) {
        if (file.isDirectory()) {
          /*
            Recursively filling the template files in the directory.
          */
          new TemplateFiller(
            `${this.templatesDir}/${file.name}`,
            this.replacementsMap
          ).fill();
        } else {
          /*
            Reading the file content.
          */
          const filePath = `${this.templatesDir}/${file.name}`;
          const filesLines = readFileSync(filePath, "utf8").split("\n");
          for (const line of filesLines) {
          }
        }
      }
    } catch (error) {
      console.error("Error while reading template files: ", error);
      process.exit(1);
    }
  }
}

import { readdirSync, readFileSync } from "fs";
import { TemplateVariable, ReplacementsMap } from "./ReplacementsMap.js";

export class TemplateFiller {
  private templatesDir: string;
  private replacementsMap: ReplacementsMap;
  private regex: RegExp;

  constructor(templatesDir: string, replacementsMap: ReplacementsMap) {
    this.templatesDir = templatesDir;
    this.replacementsMap = replacementsMap;
    this.regex = new RegExp("::([^(=|:)]+)(=[^(=|:)]+)?::", "g");
  }

  private replaceVariables(line: string): string {
    for (const match of line.matchAll(this.regex)) {
      /*
        Example of a match:
        ['::NAME=Arthur::', 'NAME', '=Arthur']
      */
      const fullMatch = match[0];
      const variable = match[1] as TemplateVariable;
      const defaultValue = match[2].slice(1);
      const replacement = this.replacementsMap.get(variable);
      if (replacement) {
        line = line.replace(fullMatch, replacement);
      } else {
        line = line.replace(fullMatch, defaultValue);
      }
    }
    return line;
  }

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

import { readdirSync, readFileSync, writeFileSync } from "fs";
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

  private replaceVariables(str: string): string {
    for (const match of str.matchAll(this.regex)) {
      /*
        Example of a match:
        ['::NAME=Arthur::', 'NAME', '=Arthur']
      */
      const fullMatch = match[0];
      const variable = match[1] as TemplateVariable;
      const defaultValue = match[2]?.slice(1);
      const replacement = this.replacementsMap.get(variable);
      if (replacement) {
        str = str.replace(fullMatch, replacement);
      } else {
        str = str.replace(fullMatch, defaultValue);
      }
    }
    return str;
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
          const fileContent = readFileSync(filePath, "utf8");
          /*
            Replacing the variables in the file content.
          */
          const contentAfterFill = this.replaceVariables(fileContent);
          if (fileContent !== contentAfterFill) {
            /*
              Writing the filled content to the file.
            */
            writeFileSync(filePath, contentAfterFill, "utf8");
          }
        }
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }
}

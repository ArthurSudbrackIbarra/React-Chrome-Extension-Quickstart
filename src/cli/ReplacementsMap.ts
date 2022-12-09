/*
  The following variables are used to replace the placeholders in the template files.
  The placeholders are defined in the template files.
*/
export type TemplateVariable =
  | "PROJECT_NAME" /* package.json. */
  | "AUTHOR_NAME" /* package.json. */
  | "EXTENSION_NAME" /* public/manifest.json -- src/components/App/App.tsx */
  | "EXTENSION_DESCRIPTION" /* public/manifest.json */
  | "TOGGLE_EXTENSION_KEYBIND"; /* src/scripts/content.ts */

export class ReplacementsMap {
  private map: Map<TemplateVariable, string>;

  public constructor() {
    this.map = new Map<TemplateVariable, string>();
  }

  public set(variable: TemplateVariable, value: string): void {
    this.map.set(variable, value);
  }

  public get(variable: TemplateVariable): string {
    return this.map.get(variable) || "";
  }
}

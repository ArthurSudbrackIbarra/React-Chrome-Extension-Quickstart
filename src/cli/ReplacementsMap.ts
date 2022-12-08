/*
  The following variables are used to replace the placeholders in the template files.
  The placeholders are defined in the template files.
*/
export type ReplacementKey =
  | "PROJECT_NAME" /* package.json. */
  | "AUTHOR_NAME" /* package.json. */
  | "EXTENSION_NAME" /* public/manifest.json -- src/components/App/App.tsx */
  | "EXTENSION_DESCRIPTION" /* public/manifest.json */
  | "TOGGLE_EXTENSION_KEYBIND"; /* src/scripts/content.ts */

export class ReplacementsMap {
  private map: Map<ReplacementKey, string>;

  public constructor() {
    this.map = new Map<ReplacementKey, string>();
  }

  public set(key: ReplacementKey, value: string): void {
    this.map.set(key, value);
  }
}

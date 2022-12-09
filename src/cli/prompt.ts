import prompt from "prompt-sync";

/*
  This class is a wrapper around the prompt-sync library.
  It is used to get user input.
*/
export class Prompt {
  private static _prompt: prompt.Prompt = prompt({ sigint: true });

  /*
    Prompts the user for a single input.
  */
  public static input(prompt: string): string {
    console.log(`\n${prompt}`);
    return this._prompt("> ");
  }

  /*
    Prompts the user for multiple inputs.
  */
  public static manyInputs(prompts: string[][]): any {
    const result: any = {};
    for (const prompt of prompts) {
      if (prompt.length < 2) {
        continue;
      }
      result[prompt[0]] = this.input(prompt[1]);
    }
    return result;
  }
}

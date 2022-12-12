import prompt from "prompt-sync";

/*
  This interface is used to define the options for the input methods.
*/
export interface PromptOptions {
  prompt: string;
  default?: string;
  variableName?: string;
}

/*
  This class is a wrapper around the prompt-sync library.
  It is used to get user input.
*/
export class Prompts {
  private static _prompt: prompt.Prompt = prompt({ sigint: true });

  /*
    Prompts the user for a single input.
  */
  public static input(promptOptions: PromptOptions): string {
    console.log(
      `\n${promptOptions.prompt}${
        promptOptions.default ? ` (${promptOptions.default})` : ""
      }`
    );
    const answer = this._prompt("> ");
    return answer || promptOptions.default || "";
  }

  /*
    Prompts the user for multiple inputs.
  */
  public static manyInputs(promptOptions: PromptOptions[]): any {
    const answers: any = {};
    for (const promptOption of promptOptions) {
      if (!promptOption.variableName) {
        continue;
      }
      answers[promptOption.variableName] = this.input(promptOption);
    }
    return answers;
  }
}

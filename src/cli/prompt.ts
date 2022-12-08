import prompt from "prompt-sync";

/*
  Functions to get input from the user.
*/

const _prompt = prompt({ sigint: true });

export function input(prompt: string): string {
  console.log(`\n${prompt}`);
  return _prompt("> ");
}

export function manyInputs(prompts: string[][]): any {
  const result: any = {};
  for (const prompt of prompts) {
    if (prompt.length < 2) {
      continue;
    }
    result[prompt[0]] = input(prompt[1]);
  }
  return result;
}

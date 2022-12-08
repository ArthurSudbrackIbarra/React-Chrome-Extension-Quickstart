import prompt from "prompt-sync";

/*
  Get a string from the user.
*/

const input = prompt({ sigint: true });

export function askForString(prompt: string): string {
  console.log(`\n${prompt}`);
  return input("> ");
}

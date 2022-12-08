#! /usr/local/bin/node

import { realpathSync } from "fs";
import { fileURLToPath } from "url";
import { resolve } from "path";
import prompt from "prompt-sync";

/*
  Paths.
*/

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const cmdPath = realpathSync(process.cwd());
const templateFilesPath = resolve(
  realpathSync(__dirname),
  "..",
  "template-files"
);

console.log(`[Info] Current directory: ${cmdPath}`);
console.log(`[Info] Project directory: ${templateFilesPath}`);

/*
  Handle command line arguments.
*/

const args = process.argv.slice(2);
const command = args[0]?.toLowerCase();

if (!command) {
  console.log("[Error] No command provided.");
  process.exit(1);
}

switch (command) {
  case "create":
    {
      let projectName = args[1];
      if (!projectName) {
        console.log("[Error] Please provide a project name.");
        console.log(
          "Example: react-extension-quickstart create <PROJECT_NAME>"
        );
        process.exit(1);
      }
      projectName = projectName.replace(/[^a-zA-Z0-9-_]/g, "-");
      create(projectName);
    }
    break;
  default: {
    console.log(`[Error] Unknown command '${command}'.`);
    process.exit(1);
  }
}

/*
  Functions to handle the commands.
*/

function create(projectName: string): void {
  const input = prompt();
  const extensionName = input("What will be the name of the extension? ");
  const extensionDescription = input(
    "What will be the description of the extension? "
  );
}

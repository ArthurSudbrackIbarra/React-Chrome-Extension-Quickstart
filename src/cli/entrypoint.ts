#!/usr/bin/env node

import { realpathSync } from "fs";
import { fileURLToPath } from "url";
import { resolve } from "path";
import { Prompts } from "./Prompts.js";
import { ReplacementsMap } from "./ReplacementsMap.js";
import { TemplateFiller } from "./TemplateFiller.js";
import { FileHandler } from "./FileCopier.js";
import { CommandRunner } from "./CommandRunner.js";

/*
  Paths.
*/
const __dirname = fileURLToPath(new URL(".", import.meta.url));
const cmdPath = realpathSync(process.cwd());
const templatesDir = resolve(realpathSync(__dirname), "..", "template-files");

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
  /*
    Welcome message.
  */
  console.log("Welcome to the React Extension Quickstart CLI!");
  console.log(
    "Answer the following questions to create your extension. Press 'Enter' to use default values.\n"
  );
  /*
    Get input from the user to fill the placeholders.
  */
  const answers = Prompts.manyInputs([
    {
      prompt: "What will be the name of your extension?",
      default: projectName,
      variableName: "EXTENSION_NAME",
    },
    {
      prompt: "What will be the description of your extension?",
      default: "My Chrome extension.",
      variableName: "EXTENSION_DESCRIPTION",
    },
    {
      prompt: "What will be the author of your extension?",
      default: "None",
      variableName: "EXTENSION_AUTHOR",
    },
    {
      prompt:
        "Which key will be used to toggle the extension popup on/off (Escape, Control, F7...)?",
      default: "Escape",
      variableName: "TOGGLE_EXTENSION_KEYBIND",
    },
    {
      prompt: "Do you want to initialize a git repository - y/n?",
      default: "y",
      variableName: "INITIALIZE_GIT_REPOSITORY",
    },
  ]);
  console.log(); /* Add a new line. */
  const {
    EXTENSION_NAME,
    EXTENSION_DESCRIPTION,
    EXTENSION_AUTHOR,
    TOGGLE_EXTENSION_KEYBIND,
    INITIALIZE_GIT_REPOSITORY,
  } = answers;

  /*
    ReplacementsMap is used to replace the variables in the template files.
  */
  const replacementsMap = new ReplacementsMap();
  replacementsMap.set("PROJECT_NAME", projectName);
  replacementsMap.set("AUTHOR_NAME", EXTENSION_AUTHOR);
  replacementsMap.set("EXTENSION_NAME", EXTENSION_NAME);
  replacementsMap.set("EXTENSION_DESCRIPTION", EXTENSION_DESCRIPTION);
  replacementsMap.set("TOGGLE_EXTENSION_KEYBIND", TOGGLE_EXTENSION_KEYBIND);

  /*
    Create the project directory.
  */
  const projectPath = `${cmdPath}/${projectName}`;
  try {
    FileHandler.createDirectory(projectPath);
  } catch (error) {
    console.error("Error creating the project directory.", error);
    process.exit(1);
  }

  /*
    Copy the template files to the project directory.
  */
  try {
    FileHandler.copyDirectory(templatesDir, projectPath, [
      ".git",
      "build",
      "node_modules",
    ]);
  } catch (error) {
    console.error("Error copying the template files.", error);
    process.exit(1);
  }

  /*
    Fill the variables in the copied template files.
  */
  const templateFiller = new TemplateFiller(projectPath, replacementsMap);
  try {
    templateFiller.fill();
  } catch (error) {
    console.error("Error filling the template file values.", error);
    process.exit(1);
  }

  /*
    Initialize a git repository if the user wants to.
  */
  const commandRunner = new CommandRunner(projectPath);
  if (
    INITIALIZE_GIT_REPOSITORY.toLowerCase() === "y" ||
    INITIALIZE_GIT_REPOSITORY.toLowerCase() === "yes"
  ) {
    try {
      console.log("[PENDING] Initializing git repository...");
      commandRunner.gitInit();
      console.log("[OK] Git repository initialized.");
    } catch (error) {
      console.error("Error initializing git repository.", error);
      process.exit(1);
    }
  }

  /*
    Execute npm install command.
  */
  try {
    console.log(
      "[PENDING] Installing the project dependencies (this may take a while)..."
    );
    commandRunner.npmInstall();
    console.log("[OK] Project dependencies installed.");
  } catch (error) {
    console.error("Error installing the project dependencies.", error);
    process.exit(1);
  }

  /*
    Feedback to the user.
  */
  console.log(`[DONE] Project created at ${projectPath}.`);
}

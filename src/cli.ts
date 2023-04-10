#!/usr/bin/env node
import inquirer from "inquirer";
import generateProject from "./generateProject.ts";
import fs from "fs";
import * as url from "url";
const CURR_DIR = process.cwd();
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

export async function main() {
  const CHOICES = fs.readdirSync(__dirname + "../templates");

  const QUESTIONS = [
    {
      name: "template",
      type: "list",
      message: "Choose a template",
      choices: CHOICES,
    },
    {
      name: "projectName",
      type: "input",
      message: "Project name:",
      validate: function (input: string) {
        if (/^([A-Za-z\-\\_\d])+$/.test(input)) return true;
        else
          return "Project name may only include letters, numbers, underscores and hashes.";
      },
    },
  ];
  inquirer.prompt(QUESTIONS).then((answers) => {
    const projectChoice: string = answers["template"];
    const projectName: string = answers["projectName"];
    const templatePath = `${__dirname}/../templates/${projectChoice}`;

    fs.mkdirSync(`${CURR_DIR}/${projectName}`);

    generateProject(templatePath, projectName);
  });
}

main();

#!/usr/bin/env node
import inquirer from "inquirer";
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

function generateProject(templatePath: string, newProjectPath: string) {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach((file) => {
    const origFilePath = `${templatePath}/${file}`;

    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath, "utf8");

      // Rename
      if (file === ".npmignore") file = ".gitignore";

      const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
      fs.writeFileSync(writePath, contents, "utf8");
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);

      // recursive call
      generateProject(`${templatePath}/${file}`, `${newProjectPath}/${file}`);
    }
  });
}

main();

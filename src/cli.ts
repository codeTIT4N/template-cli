#!/usr/bin/env ts-node
import inquirer from "inquirer";
import fs from "fs";
import * as url from "url";
import util from "util";
import path from "path";
import { exec as importedExec } from "child_process";
const exec = util.promisify(importedExec);
import ora from "ora";

const CURR_DIR = process.cwd();
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

function generateProject(templatePath: string, newProjectPath: string) {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach((file) => {
    const origFilePath = `${templatePath}/${file}`;

    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath);
      // Rename
      if (file === ".npmignore") file = ".gitignore";
      let writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
      if (newProjectPath === ".") writePath = `${CURR_DIR}/${file}`;
      fs.writeFileSync(writePath, contents);
    } else if (stats.isDirectory()) {
      if (newProjectPath === ".") {
        fs.mkdirSync(`${CURR_DIR}/${file}`);
        // recursive call
        generateProject(`${templatePath}/${file}`, `${file}`);
      } else {
        fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);
        // recursive call
        generateProject(`${templatePath}/${file}`, `${newProjectPath}/${file}`);
      }
    }
  });
}

(() => {
  const CHOICES = fs
    .readdirSync(__dirname + "../templates", {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

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
      message: "Project name? (Enter . to use current directory):",
      validate: function (input: string) {
        if (
          input === "." &&
          /^(?!-)[A-Za-z\-\\_\d]*(?<!-)$/.test(path.basename(CURR_DIR))
        ) {
          if (fs.readdirSync(CURR_DIR).length === 0) {
            return true;
          } else {
            return "Directory is not empty!";
          }
        } else if (
          input !== "" &&
          input !== "." &&
          /^(?!-)[A-Za-z\-\\_\d]*(?<!-)$/.test(input)
        ) {
          if (!fs.existsSync(`${CURR_DIR}/${input}`)) return true;
          else return "Directory already exists!";
        } else
          return "Invalid Project Name! It may only include letters, numbers, underscores and hashes.";
      },
    },
    {
      name: "gitRemote",
      type: "input",
      message: "Git remote url? (Keep empty to skip):",
    },
  ];
  inquirer.prompt(QUESTIONS).then(async (answers) => {
    const spinner = ora("Creating project Please wait...").start();
    try {
      const projectChoice: string = answers["template"];
      const projectName: string = answers["projectName"];
      const gitRemote: string = answers["gitRemote"];
      const templatePath = `${__dirname}/../templates/${projectChoice}`;

      if (projectName !== ".") {
        fs.mkdirSync(`${CURR_DIR}/${projectName}`);
        generateProject(templatePath, projectName);
        if (gitRemote !== "") {
          await exec(
            `cd ${projectName} && npm install && rm -rf .git && git init && git branch -M main && git remote add origin ${gitRemote}`
          );
        } else {
          await exec(
            `cd ${projectName} && npm install && rm -rf .git && git init && git branch -M main`
          );
        }
      } else {
        generateProject(templatePath, projectName);
        if (gitRemote !== "") {
          await exec(
            `npm install && rm -rf .git && git init && git branch -M main && git remote add origin ${gitRemote}`
          );
        } else {
          await exec(
            `npm install && rm -rf .git && git init && git branch -M main`
          );
        }
      }
      ora("Project created successfully!").succeed();
      spinner.stop();
    } catch (e) {
      spinner.stop();
      ora("Error creating project!").fail();
      console.log("Error:", e);
    }
  });
})();

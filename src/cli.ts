#!/usr/bin/env node
import inquirer from "inquirer";
// import * as path from "path";
import fs from "fs";
import * as url from "url";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

export async function main() {
  const CHOICES = fs.readdirSync(__dirname + "../templates");

  console.log(CHOICES[0]);
  /*const answers = await inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?",
    },
  ]);
  console.log(answers);*/
}

main();

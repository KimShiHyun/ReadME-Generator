const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is the title of your project?",
    },
    {
      type: "input",
      name: "description",
      message: "Please input a description of your project.",
    },
    {
      type: "input",
      name: "installation",
      message: "What are the steps required to install your project?",
    },
    {
      type: "input",
      name: "usage",
      message: "Please provide examples for usage",
    },
    {
      type: "input",
      name: "contributing",
      message:
        "If you would like other developers to contribute to your project, you will want to add guidelines for how to do so. Please input the contribution guidelines of your project.",
    },
    {
      type: "input",
      name: "tests",
      message:
        "Write tests for your project. Then provide examples on how to run them. Please enter test instructions here.",
    },
    {
      type: "list",
      name: "license",
      message:
        "Choose a license from the list provided. This lets other developers know what they can and cannot do with your project.",
      choices: ["MIT", "Apache2.0", "GPL", "BSD"],
    },
    {
      type: "input",
      name: "github",
      message: "Enter your GitHub Username.",
    },
    {
      type: "input",
      name: "email",
      message: "Enter your E-Mail Address.",
    },
  ]);
};

const generateMD = (answers) =>
  `# ${answers.title}
![License](https://img.shields.io/badge/License-${answers.license}-BLUE)
## Description
${answers.description}
## Table of Contents
1. [Installation](#Installation)
1. [Usage](#Usage)
1. [License](#License)
1. [Contributing](#Contributing)
1. [Tests](#Tests)
## Installation
${answers.installation}
## Usage
${answers.usage}
## License
NOTICE: This project is covered under ${answers.license} license.
## Contributing
${answers.contributing}
## Tests
${answers.tests}
## Questions
GitHub URL: https://github.com/${answers.github}
For any additional questions, you can reach me here: ${answers.email}`;

const init = async () => {
  console.log("hi");
  try {
    const answers = await promptUser();

    const md = generateMD(answers);

    await writeFileAsync("README.md", md);

    console.log("Successfully wrote to README.md");
  } catch (err) {
    console.log(err);
  }
};

init();

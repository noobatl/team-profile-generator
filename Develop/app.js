const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
const employeeArray = [];
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
// The first class is an `Employee` parent class with the following properties and methods:
const employeeQuestions = [
  //   * name
  {
    type: "input",
    name: "name",
    message: `What is the employee's name?`,
  },
  //   * id
  {
    type: "input",
    name: "id",
    message: `What is the employee's id number?`,
  },
  //   * email
  {
    type: "input",
    name: "email",
    message: `What is the employee's email address?`,
  },
  //  * role
  {
    type: "list",
    name: "role",
    message: `What is the employee's role?`,
    choices: ["Manager", "Engineer", "Intern"],
  },
];

// In addition to `Employee`'s properties and methods, `Manager` will also have:
const managerQuestions = [
  //   * officeNumber
  {
    type: "input",
    name: "officeNumber",
    message: `What is the manager's office number?`,
  },
];

// In addition to `Employee`'s properties and methods, `Engineer` will also have:
const engineerQuestions = [
  //   * github  // GitHub username
  {
    type: "input",
    name: "github",
    message: `What is the engineer's GitHub username?`,
  },
];

// In addition to `Employee`'s properties and methods, `Intern` will also have:
const internQuestions = [
  //   * school
  {
    type: "input",
    name: "school",
    message: `What is the intern's school?`,
  },
];

async function askQuestions() {
  try {
    const employeeAnswers = await inquirer.prompt(employeeQuestions);
    const { name, id, email } = employeeAnswers;
    switch (employeeAnswers.role) {
      case "Manager":
        try {
          const managerAnswers = await inquirer.prompt(managerQuestions);
          const { officeNumber } = managerAnswers;
          let manager = new Manager(name, id, email, officeNumber);
          employeeArray.push(manager);
        } catch (err) {
          console.log("Error: Manager");
        }
        break;
      case "Engineer":
        try {
          const engineerAnswers = await inquirer.prompt(engineerQuestions);
          const { github } = engineerAnswers;
          let engineer = new Engineer(name, id, email, github);
          employeeArray.push(engineer);
        } catch (err) {
          console.log("Error: Engineer");
        }
        break;
      case "Intern":
        try {
          const internAnswers = await inquirer.prompt(internQuestions);
          const { school } = internAnswers;
          let intern = new Intern(name, id, email, school);
          employeeArray.push(intern);
        } catch (err) {
          console.log("Error: Intern");
        }
        break;
    }
  } catch (err) {
    console.log("Error: Ask Questions");
  }
}

// After the user has input all employees desired, call the `render` function (required above) 
// the `render` function will generate and return a block of HTML including templated divs for each employee!
async function generator() {
  await askQuestions();
  // pass in an array containing all employee objects;
  const renderedHTML = render(employeeArray);
  // Hint: you may need to check if the `output` folder exists and create it if it does not.
  const dir = "./output";
  if (fs.existsSync(dir)) {
    console.log("Output directory exists!");
  } else {
    fs.mkdirSync(dir);
    console.log("Output directory created!");
  }
  // After you have your html, you're now ready to create an HTML file using the HTML
  // returned from the `render` function. Now write it to a file named `team.html` in the
  // `output` folder. You can use the variable `outputPath` above target this location.
  fs.writeFile(outputPath, renderedHTML, (error) => {
    if (error) throw error;
    console.log("File saved!");
  });
}

generator()
  .then(() => console.log("Team generated!"))
  .catch((error) => console.log(error));

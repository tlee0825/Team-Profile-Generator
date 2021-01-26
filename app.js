const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
let teamMembers = [];

function createPage() {
    fs.writeFileSync(outputPath, render(teamMembers), "utf8")
}

function createTeam() {

    inquirer.prompt([
        {
            type: "list",
            name: "teamChoice",
            message: "Which position would you like to add?",
            choices: ["Manager",
                "Engineer",
                "Intern",
                "I don't want to add anymore"]

        }]).then(userChoice => {
            switch (userChoice.teamChoice) {
                case "Manager":
                    addManager();
                    break;

                case "Engineer":
                    addEngineer();
                    break;

                case "Intern":
                    addIntern();
                    break;

                default:
                    createPage();
            }
        })
}

function addManager() {
    inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "Please enter the name of this Manager"
        },
        {
            type: "input",
            name: "managerId",
            message: "Please enter the Id of this Manager"
        },
        {
            type: "input",
            name: "managerEmail",
            message: "Please enter the email of this Manager"
        },
        {
            type: "input",
            name: "officeNumber",
            message: "Please enter this Manager office number"
        }

    ]).then(data => {
        const manager = new Manager(data.managerName, data.managerId, data.managerEmail, data.officeNumber)
        teamMembers.push(manager)
        createTeam();
    })
}

function addEngineer() {
    inquirer.prompt([
        {
            type: "input",
            name: "engName",
            message: "Please enter the name of the Engineer"
        },
        {
            type: "input",
            name: "engId",
            message: "Please enter the Id of the Engineer"
        },
        {
            type: "input",
            name: "engEmail",
            message: "Please enter the email of this Engineer"
        },
        {
            type: "input",
            name: "engGithub",
            message: "Please enter this Engineer github information"
        }

    ]).then(data => {
        const engineer = new Engineer(data.engName, data.engId, data.engEmail, data.engGithub);
        teamMembers.push(engineer)
        createTeam();
    })
}

function addIntern() {
    inquirer.prompt([
        {
            type: "input",
            name: "internName",
            message: "Please enter the name of the Intern"
        },
        {
            type: "input",
            name: "internId",
            message: "Please enter the Id of the Intern"

        },
        {
            type: "input",
            name: "internEmail",
            message: "Please enter the email of the Intern"
        },
        {
            type: "input",
            name: "internSchool",
            message: "Please enter the school this Intern is attending"
        }

    ]).then(data => {
        const intern = new Intern(data.internName, data.internId, data.internEmail, data.internSchool);
        teamMembers.push(intern)
        createTeam();
    })

}
createTeam();



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

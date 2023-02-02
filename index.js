const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const managerQuestions = require('./utils/managerQuestions');
const roleQuestion = require('./utils/roleQuestion');
const engineerQuestions = require('./utils/engineerQuestions');
const internQuestions = require('./utils/internQuestions');
const inquireManager = require();

const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

const render = require('./src/page-template.js');

// * Array of employees info
const employeesInfo = [];

// # Functions

// * Inquires the manager to generate a Manager Object with the answers
async function inquireManager(employeesInfo) {
	const { name, id, email, office } = await inquirer.prompt(managerQuestions);
	const manager = new Manager(name, id, email, office);

	// The new Manager Object gets pushed into the employeesInfo
	employeesInfo.push(manager);

	// When the inquirer and the Object are dealt with, the role inquire runs
	await inquireRole(employeesInfo);
}

// * Inquires the engineer to generate an Engineer Object with the answers
async function inquireEngineer(employeesInfo) {
	const { name, id, email, github } = await inquirer.prompt(
		engineerQuestions
	);
	const engineer = new Engineer(name, id, email, github);

	// The new Engineer Object gets pushed into the employeesInfo
	employeesInfo.push(engineer);

	// When the inquirer and the Object are dealt with, the role inquire runs
	await inquireRole(employeesInfo);
}

// * Inquires the intern to generate a Intern Object with the answers
async function inquireIntern(employeesInfo) {
	const { name, id, email, school } = await inquirer.prompt(internQuestions);
	const intern = new Intern(name, id, email, school);

	// The new Intern Object gets pushed into the employeesInfo
	employeesInfo.push(intern);

	// When the inquirer and the Object are dealt with, the role inquire runs
	await inquireRole(employeesInfo);
}

async function inquireRole(employeesInfo) {
	const { role } = await inquirer.prompt(roleQuestion);
	switch (role) {
		case 'Engineer':
			inquireEngineer(employeesInfo);
			break;
		case 'Intern':
			inquireIntern(employeesInfo);
			break;
		case 'Finish building the team':
			console.log(JSON.stringify(employeesInfo, null, ' '));
			console.log('\n =============== Team Completed! ===============');
			break;
	}
}

// * Initialize the inquirer prompts
function init() {
	inquireManager(employeesInfo);
}

// # Initialisation
init();

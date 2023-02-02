const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

const OUTPUT_DIR = path.resolve(__dirname, 'output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

const render = require('./src/page-template.js');

// TODO: Write Code to gather information about the development team members, and render the HTML file.
// # Inquirer variables
// * Array of employees info
const employeesInfo = [];

// * Array of questions for user
const managerQuestions = [
	// Manager questions
	{
		type: 'input',
		name: 'name',
		message: 'What is the manager name?',
		default: 'Santiago Gomez',
	},
	{
		type: 'number',
		name: 'id',
		message: 'Enter your ID',
		validate(answer) {
			const valid = !isNaN(parseFloat(answer));
			return valid || 'Please enter a number';
		},
		filter: Number,
	},
	{
		type: 'input',
		name: 'email',
		message: 'Enter your Email address',
	},
	{
		type: 'number',
		name: 'office',
		message: 'Enter your office number',
		validate(answer) {
			const valid = !isNaN(parseFloat(answer));
			return valid || 'Please enter a number';
		},
		filter: Number,
	},
];

const roleQuestion = [
	{
		type: 'rawlist',
		name: 'role',
		message: 'What is the role of the employee?',
		choices: [
			'Engineer',
			'Intern',
			new inquirer.Separator(),
			'Finish building the team',
		],
		default: 3,
	},
];

const engineerQuestions = [
	{
		type: 'input',
		name: `name`,
		message: `Enter name of the engineer`,
	},
	{
		type: 'input',
		name: `id`,
		message: `Enter engineer ID`,
		validate(answer) {
			const valid = !isNaN(parseFloat(answer));
			return valid || 'Please enter a number';
		},
		filter: Number,
	},
	{
		type: 'input',
		name: `email`,
		message: `Enter engineer Email address`,
	},
	{
		type: 'input',
		name: `github`,
		message: 'Enter GitHub username',
	},
];
const internQuestions = [
	{
		type: 'input',
		name: `name`,
		message: `Enter name of the intern`,
	},
	{
		type: 'input',
		name: `id`,
		message: `Enter intern ID`,
		validate(answer) {
			const valid = !isNaN(parseFloat(answer));
			return valid || 'Please enter a number';
		},
		filter: Number,
	},
	{
		type: 'input',
		name: `email`,
		message: `Enter intern Email address`,
	},

	{
		type: 'input',
		name: `school`,
		message: 'Enter intern school',
	},
];

// # Functions

// * Inquires the manager to generate a Manager Object with the answers
async function inquireManager(employeesInfo) {
	const inquire = await inquirer.prompt(managerQuestions);
	const manager = new Manager(
		inquire.name,
		inquire.id,
		inquire.email,
		inquire.office
	);

	// The new Manager Object gets pushed into the employeesInfo
	employeesInfo.push(manager);

	// When the inquirer and the Object are dealt with, the role inquire runs
	await inquireRole(employeesInfo);
}

// * Inquires the engineer to generate an Engineer Object with the answers
async function inquireEngineer(employeesInfo) {
	const inquire = await inquirer.prompt(engineerQuestions);
	const engineer = new Engineer(
		inquire.name,
		inquire.id,
		inquire.email,
		inquire.github
	);

	// The new Engineer Object gets pushed into the employeesInfo
	employeesInfo.push(engineer);

	// When the inquirer and the Object are dealt with, the role inquire runs
	await inquireRole(employeesInfo);
}

// * Inquires the intern to generate a Intern Object with the answers
async function inquireIntern(employeesInfo) {
	const inquire = await inquirer.prompt(internQuestions);
	const intern = new Intern(
		inquire.name,
		inquire.id,
		inquire.email,
		inquire.school
	);

	// The new Intern Object gets pushed into the employeesInfo
	employeesInfo.push(intern);

	// When the inquirer and the Object are dealt with, the role inquire runs
	await inquireRole(employeesInfo);
}

async function inquireRole(employeesInfo) {
	const inquire = await inquirer.prompt(roleQuestion);
	switch (inquire.role) {
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

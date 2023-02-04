// # Imports

const inquirer = require('inquirer');
const chalk = require('chalk');

const path = require('path');
const fs = require('fs');

const render = require('../src/page-template');

// * Importing que employee inquirers
const managerQuestions = require('./inquirers/managerQuestions');
const engineerQuestions = require('./inquirers/engineerQuestions');
const internQuestions = require('./inquirers/internQuestions');
const roleQuestion = require('./inquirers/roleQuestion');

// * Importing the constructor classes
const Engineer = require('../lib/Engineer');
const Intern = require('../lib/Intern');
const Manager = require('../lib/Manager');

// # Path

const OUTPUT_DIR = path.resolve(__dirname, '../output');
const outputPath = path.join(OUTPUT_DIR, 'team.html');

// # Functions

// * Inquires the manager to generate a Manager Object with the answers
async function inquireManager(employeesArray) {
	const { name, id, email, office } = await inquirer.prompt(managerQuestions);
	const manager = new Manager(name, id, email, office);

	// The new Manager Object gets pushed into the employeesArray
	employeesArray.push(manager);

	// When the inquirer and the Object are dealt with, the role inquire runs
	await inquireRole(employeesArray);
}

// * Inquires the engineer to generate an Engineer Object with the answers
async function inquireEngineer(employeesArray) {
	const { name, id, email, github } = await inquirer.prompt(engineerQuestions);
	const engineer = new Engineer(name, id, email, github);

	// The new Engineer Object gets pushed into the employeesArray
	employeesArray.push(engineer);

	// When the inquirer and the Object are dealt with, the role inquire runs
	await inquireRole(employeesArray);
}

// * Inquires the intern to generate a Intern Object with the answers
async function inquireIntern(employeesArray) {
	const { name, id, email, school } = await inquirer.prompt(internQuestions);
	const intern = new Intern(name, id, email, school);

	// The new Intern Object gets pushed into the employeesArray
	employeesArray.push(intern);

	// When the inquirer and the Object are dealt with, the role inquire runs
	await inquireRole(employeesArray);
}

async function inquireRole(employeesArray) {
	const { role } = await inquirer.prompt(roleQuestion);
	switch (role) {
		case 'Engineer':
			inquireEngineer(employeesArray);
			break;
		case 'Intern':
			inquireIntern(employeesArray);
			break;
		case 'Finish building the team':
			renderTeam(employeesArray);
			console.log('\n ---------- Team content being generated ----------\n');
			break;
	}
}

function renderTeam(employeesArray) {
	console.log(employeesArray);
	const rendered = render(employeesArray);
	writeRendered(outputPath, rendered);
}

function writeRendered(fileName, content) {
	fs.writeFile(fileName, content, err => {
		err
			? console.error(err)
			: console.log(
					`${chalk.green('SUCCESS!')}: File generated in\n${outputPath}`
			  );
	});
}

module.exports = inquireManager;

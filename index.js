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

const employeeQuestions = [
	// Role of employee
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

	// Employee questions
	{
		type: 'input',
		name: `employee_name`,
		message: answer => `Enter name of the ${answer.role}`,
	},
	{
		type: 'input',
		name: `employee_id`,
		message: answer => `Enter ${answer.role} ID`,
		validate(answer) {
			const valid = !isNaN(parseFloat(answer));
			return valid || 'Please enter a number';
		},
		filter: Number,
	},
	{
		type: 'input',
		name: `employee_email`,
		message: answer => `Enter ${answer.role} Email address`,
	},

	// Engineer questions
	{
		when(answer) {
			return answer.role === 'Engineer';
		},

		type: 'input',
		name: `engineer_github`,
		message: 'Enter GitHub username',
	},

	// Intern questions
	{
		when(answer) {
			return answer.role === 'Intern';
		},

		type: 'input',
		name: `intern_school`,
		message: 'Enter intern school',
	},

	// add more employees
	{
		type: 'confirm',
		name: `add_more`,
		message: 'Do you want to add another employee?',
		default: true,
	},
];

function inquireAgain() {
	inquirer.prompt(employeeQuestions).then(data => {
		employeesInfo.push(data);

		if (data.add_more) {
			inquirer.prompt(employeeQuestions);
		} else {
			console.log(JSON.stringify(data, null, ' '));
		}
	});
}

// function inquireManager() {
// 	inquirer.prompt(managerQuestions).then(answers => {
// 		console.log(JSON.stringify(answers, null, '  '));
// 	});
// }

async function init() {
	const inquireManager = await inquirer.prompt(managerQuestions);
	console.log(JSON.stringify(inquireManager, null, ' '));
	const addEmployees = await inquirer.prompt(employeeQuestions);
	console.log(JSON.stringify(addEmployees, null, ' '));
	console.log(employeesInfo);

	inquireAgain();
}
init();

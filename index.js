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
const questions = [
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
		filter: String,
	},

	// Role of employee
	{
		type: 'list',
		name: 'role',
		message: 'What is the role of the employee?',
		choices: [
			'Engineer',
			'Intern',
			new inquirer.Separator(),
			'Finish building the team',
		],
		default: 'Finish building the team',
	},

	// Exit inquirer
	{
		when(answer) {
			return answer.role === 'Finish building the team';
		},
		type: 'confirm',
		name: 'exit',
		message: 'Do you want to exit the Team Builder App?',
		default: 'n',
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
	},
	{
		type: 'input',
		name: `employee_email`,
		message: answer => `Enter ${answer.role} Email address`,
	},

	// Engineer questions
	{
		when(inquire1) {
			return inquire1.role === 'Engineer';
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
		name: 'add_employee',
		message: 'Do you want to add another employee?',
		default: true,
	},
];

function init() {
	inquirer.prompt(questions).then(data => {
		employeesInfo.push(data);

		if (data.add_employee) {
			init();
		} else {
			console.log(JSON.stringify(data, null, ' '));
		}
	});
}
init();
console.log(employeesInfo);

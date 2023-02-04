const inquirer = require('inquirer');

const roleQuestion = [
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
];

module.exports = roleQuestion;

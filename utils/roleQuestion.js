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

module.exports = roleQuestion;

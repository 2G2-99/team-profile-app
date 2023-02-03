const engineerQuestions = [
	{
		type: 'input',
		name: `name`,
		message: `Enter name of the engineer`,
		validate(answer) {
			const valid = answer !== undefined || answer !== null;
			return valid || 'Please enter a name';
		},
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
		validate(answer) {
			const valid = answer.includes('@') && answer.includes('.com');
			return valid || 'Please enter a valid email address';
		},
	},
	{
		type: 'input',
		name: `github`,
		message: 'Enter GitHub username',
		validate(answer) {
			const valid = answer !== undefined || answer !== null;
			return valid || 'Please enter a GitHub user name';
		},
	},
];

module.exports = engineerQuestions;

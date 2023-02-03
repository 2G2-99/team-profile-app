const managerQuestions = [
	// Manager questions
	{
		type: 'input',
		name: 'name',
		message: 'What is the manager name?',
		default: 'Santiago Gomez',
		validate(answer) {
			const valid = answer !== undefined || answer !== null;
			return valid || 'Please enter a name';
		},
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
		validate(answer) {
			const valid = answer.includes('@') && answer.includes('.com');
			return valid || 'Please enter a valid email address';
		},
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

module.exports = managerQuestions;

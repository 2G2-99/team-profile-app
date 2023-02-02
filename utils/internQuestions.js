const internQuestions = [
	{
		type: 'input',
		name: `name`,
		message: `Enter name of the intern`,
		validate(answer) {
			const valid = answer !== undefined || answer !== null;
			return valid || 'Please enter a name';
		},
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
		validate(answer) {
			const valid = answer.includes('@') && answer.includes('.com');
			return valid || 'Please enter a valid email address';
		},
	},

	{
		type: 'input',
		name: `school`,
		message: 'Enter intern school',
		validate(answer) {
			const valid = answer !== undefined || answer !== null;
			return valid || 'Please enter an school name';
		},
	},
];

module.exports = internQuestions;

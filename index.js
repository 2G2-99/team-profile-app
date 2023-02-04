// # Imports

const inquireManager = require('./utils/inquirerPrompts');

// * Array of employees info
const employeesInfo = [];

// * Initialise the inquirer prompts
function init() {
	inquireManager(employeesInfo);
}

// # Initialisation
init();

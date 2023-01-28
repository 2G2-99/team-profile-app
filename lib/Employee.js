class Employee {
	constructor(name, id, email) {
		// if (typeof name != 'string') {
		// 	throw new Error(`${name} is not a valid name`);
		// }
		// if (typeof id != 'number') {
		// 	throw new Error(`${id} is not a valid id`);
		// }
		// if (typeof email != 'string' || !email.contains('@')) {
		// 	throw new Error(`${email} is not a valid email`);
		// }

		if (typeof name === undefined) {
			throw new Error(
				`Invalid value of ${name} was provided for parameter 'name'`
			);
		}
		if (typeof id === undefined) {
			throw new Error(
				`Invalid value of ${id} was provided for parameter 'id'`
			);
		}
		if (typeof email === undefined) {
			throw new Error(
				`Invalid value of ${email} was provided for parameter 'email'`
			);
		}

		this.name = name;
		this.id = id;
		this.email = email;
	}

	getName() {
		return this.name;
	}
	getId() {
		return this.id;
	}
	getEmail() {
		return this.email;
	}
	getRole() {
		return this.constructor.name;
	}
}

module.exports = Employee;

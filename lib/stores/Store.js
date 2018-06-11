class Store extends Map {
	constructor(client) {
		super();
		Object.defineProperty(this, 'client', { value: client });
	}
}

module.exports = Store;

const UserStore = require('./stores/UserStore');
const Api = require('./util/Api');

class Client {

	constructor(token) {
		if (!token) throw new Error('Token is required to interact with the API. If you dont have one, get one from https://RoyaleAPI.com !');
		
		this._token = token;
		
		this.Users = new UserStore(this);
		
		this.Api = new Api(this);
	}
	
		
}

module.exports = Client;
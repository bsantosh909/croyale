const { get } = require('snekfetch');

class API {
	
	constructor(client) {
		Object.defineProperty(this, 'client', { value: client });
		
		this._baseURL = 'http://api.royaleapi.com/';
		
		this._rateLimitRemaining = 5;
		this._rateLimitReset = Date.now();
	}
	
	_get(endpoint, options = {}) {
		console.log('Requesting data from the API.');
		if (this._rateLimitRemaining === 0 || Date.now() < this._rateLimitReset) throw new Error('You are making requests too fast. In this rate you will make the API slow for everyone else.');

		// Checking if the input for options are correct or not.
        if (options.keys && options.exclude) throw new TypeError('You can only request with either Keys or Exclude.');
		if (options.keys) {
            if (!(options.keys instanceof Array)) throw new TypeError('Make sure the keys argument you pass is an array.');
            options.keys = options.keys.join(', ');
        }
		if (options.exclude) {
            if (!(options.exclude instanceof Array)) throw new TypeError('Make sure the exclude argument you pass is an array.');
            options.exclude = options.exclude.join(',');
        }

        return get(`${this._baseURL}${endpoint}`)
            .query(options)
            .set('auth', this.client._token)
            .then(res => {
				this._rateLimitRemaining = parseInt(res.headers['x-ratelimit-remaining']);
				this._rateLimitReset = parseInt(res.headers['x-ratelimit-reset']);
				return res.body;
			});
    }
	
	getUserProfile(tag, options = {}) {		
		return this._get(`player/${tag}`, options);
	}
	
	getUserBattles(tag) {
		return this._get(`player/${tag}/battles`);
	}

	getUserChests(tag) {
		return this._get(`player/${tag}/chests`);
	}
	
	getTopUsers(loc) {
		return this._get(`top/players/${loc}`);
	}
	
	getPopularUsers() {
		return this._get(`popular/players`);
	}
	
	getClanData(tag) {
		return this._get(`clan/${tag}`);
	}
	
	getClanBattles(tag) {
		return this._get(`clan/${tag}/battles`);
	}

	getClanWar(tag) {
		return this._get(`clan/${tag}/war`);
	}
	
	getClanWarLog(tag) {
		return this._get(`clan/${tag}/warlog`);
	}
	
	getClanHistory(tag) {
		return this._get(`clan/${tag}/history`);
	}
	
	getClanWeeklyHistory(tag) {
		return this.get(`clan/${tag}/history/weekly`);
	}
	
	getClanTracking(tag) {
		return this._get(`clan/${tag}/tracking`);
	}
	
	getTopClans(loc) {
		return this._get(`top/clans/${loc}`);
	}
	
	getPopularClans() {
		return this._get(`popular/clans`);
	}
	
	getOpenTournaments() {
		return this._get(`tournaments/open`);
	}
	
	getKnownTournaments() {
		return this._get(`tournaments/known`);
	}
	
	getTournamentInfo(tag) {
		return this._get(`tournaments/${tag}`);
	}
	
	getPopularTournament() {
		return this._get(`popular/tournaments`);
	}
	
	getPopularDecks() {
		return this._get(`popular/decks`);
	}
	
	getKeyStats() {
		return this._get(`auth/stats`);
	}
	
	getEndpoints() {
		return this._get(`endpoints`);
	}
	
}

module.exports = API;
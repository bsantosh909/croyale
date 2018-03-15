const { get } = require('snekfetch');
const Player = require('./structures/player');
const Clan = require('./structures/clan');
const Tournament = require('./structures/tournament');

/**
 * The client for handling everything.
 */
class Client {

	/**
     * @typedef {object} RequestOptions
     * @property {Array<string>} [keys] The keys to get in the response from the API.
     * @property {Array<string>} [exclude] The keys to exclude in the response from the API.
     */

	/**
	 * Constructs the croyale client
	 * @since 2.0.0
	 * @param {string} token The token to interact with the API.
	 */
	constructor(token) {
		if (!token) throw new Error('Token is an essential component to interact with the API. Make sure to provide it.');

		/**
		 * The token provided
		 * @since 2.0.0
		 * @type {?string}
		 */
		this.token = token;

		/**
		 * The valid characters for any tag
		 * @type {string}
		 * @private
		 */
		this.tagCharacters = '0289PYLQGRJCUV';
	}

	/**
     * A string conatining the valid tag characters.
     * @typedef {string} tag
     */

	/**
	 * check if the provided tag is a valid one.
	 * @since 2.0.0
	 * @param {string} tag The tag that is to be checked.
	 * @returns {tag} the verified tag.
     * @example
     * let tag = API.verifyTag('CVLQ2GV8');
     * if (tag) console.log('It is a tag with proper characters.');
     * else console.error('The tag has invalid charactrs.');
	 */
	verifyTag(tag) {
		if (!tag) return false;
		tag = tag.toUpperCase().replace('#', '').replace(/O/g, '0');
		for (var i = 0; i < tag.length; i++) {
			if (!this.tagCharacters.includes(tag[i])) return false;
		}
		return tag;
	}

	/**
     * get the player data from the api with the tag
     * @since 2.0.0
     * @param {string} tag The player tag to get the data for.
     * @param {RequestOptions} options The options to be passed for customized result.
     * @returns {Promise<Player>} the arranged player data.
     * @example
     * API.getPlayer('CVLQ2GV8', {
     *  keys: ['name']
     * })
     *  .then(player => {
     *    console.log(`The Player's name is ${player.name}`);
     *  })
     *  .catch(console.error);
     */
	async getPlayer(tag, options = {}) {
		if (!tag) throw new Error('Invalid usage! Must provide the tag');
		if (typeof tag !== 'string') throw new Error('Tag must be string');

		const verifiedTag = this.verifyTag(tag);
		if (!verifiedTag) throw new Error(`The tag you provided has some invalid character. Make sure it contains only the following characters: "${this.tagCharacters}"`);

		if (options.keys && options.exclude) throw new Error('You can only request with either Keys or Exclude.');
		if (options.keys && !options.keys.length) throw new Error('Make sure the keys argument you pass is an array.');
		if (options.exclude && !options.exclude.length) throw new Error('Make sure the exclude argument you pass is an array.');

		const { body } = await get(`http://api.royaleapi.com/player/${verifiedTag}${options.keys ? `?keys=${options.keys.join(',')}` : ''}${options.exclude ? `?exclude=${options.exclude.join(',')}` : ''}`)
			.set('auth', this.token);
		const player = new Player(body);
		return player;
	}

	/**
     * get the clan data from the api with the tag
     * @since 2.0.0
     * @param {string} tag The clan tag to get the data for.
     * @param {RequestOptions} options The options to be passed for customized result.
     * @returns {Promise<Clan>} the arranged clan data.
	 * @example
	 * API.getClan('2CCCP', {
	 *  keys: ['name']
	 * })
	 *  .then(clan => {
	 *    console.log(`The clan's name is ${clan.name}`);
	 *  })
	 *  .catch(console.error);
     */
	async getClan(tag, options = {}) {
		if (!tag) throw new Error('Invalid usage! Must provide the tag');
		if (typeof tag !== 'string') throw new Error('Tag must be string');

		const verifiedTag = this.verifyTag(tag);
		if (!verifiedTag) throw new Error(`The tag you provided has some invalid character. Make sure it contains only the following characters: "${this.tagCharacters}"`);

		if (options.keys && options.exclude) throw new Error('You can only request with either Keys or Exclude.');
		if (options.keys && !options.keys.length) throw new Error('Make sure the keys argument you pass is an array.');
		if (options.exclude && !options.exclude.length) throw new Error('Make sure the exclude argument you pass is an array.');

		const { body } = await get(`http://api.royaleapi.com/clan/${verifiedTag}${options.keys ? `?keys=${options.keys.join(',')}` : ''}${options.exclude ? `?exclude=${options.exclude.join(',')}` : ''}`)
			.set('auth', this.token);
		const clan = new Clan(body);
		return clan;
	}

	/**
	 * get top 200 players (global or specific location).
	 * Have a look at royaleapi-data/json/regions.json for the full list of acceptable keys.
	 * @since 2.0.0
	 * @param {string} locationKey The specific location to get the top players of.
	 * @returns {Promise<Array<Player>>} array of top 200 players.
	 */
	async getTopPlayers(locationKey) {
		if (typeof locationKey !== 'string') throw new Error('Location key must be a string');
		const { body } = await get(`http://api.royaleapi.com/top/players${locationKey ? `/${locationKey}` : ''}`)
			.set('auth', this.token);
		return body;
	}

	/**
	 * get top 200 clans (global or specified location).
	 * Have a look at royaleapi-data/json/regions.json for the full list of acceptable keys.
	 * @since 2.0.0
	 * @param {string} locationKey The specific location to get the top clans of.
	 * @returns {Promise<Array<Clan>>} array of top 200 clans.
	 */
	async getTopClans(locationKey) {
		if (typeof locationKey !== 'string') throw new Error('Location key must be a string');
		const { body } = await get(`http://api.royaleapi.com/top/clans${locationKey ? `/${locationKey}` : ''}`)
			.set('auth', this.token);
		return body;
	}

	/**
	 * @typedef {Object} ClanSearchOptions
	 * @property {string} [name] The name of the clan you want to search for.
	 * @property {number} [score] The score of the clan you want to search for.
	 * @property {number} [minMembers] Minimum members of the clan you want to search for.
	 * @property {number} [maxMembers] Maximum members of the clan you want to search for.
	 */

	/**
	 * search for a clan with some query options.
	 * @since 2.0.0
	 * @param {ClanSearchOptions} options The options which you want the clan to match.
	 * @returns {Promise<Array<Clan>>} array of clans matching the criteria.
	 * @example
	 * API.searchClan({
	 *  name : 'ABC',
	 *  minMembers : 45
	 * })
	 *  .then(clans => {
	 *    console.log(`${clans.length} clans found with the criteria you set.`);
	 *  })
	 *  .catch(console.error);
	 */
	async searchClan(options = {}) {
		if (!options.name && !options.score && !options.minMembers && !options.maxMembers) throw new Error('You must provide at least one query string parameters to see results.');

		const queries = [];
		if (options.name) {
			if (typeof options.name !== 'string') throw new Error('Name property must be a string.');
			queries.push(`name=${options.name}`);
		}
		if (options.score) {
			if (typeof options.score !== 'number') throw new Error('Score property must be a number.');
			queries.push(`score=${options.score}`);
		}
		if (options.minMembers) {
			if (typeof options.minMembers !== 'number') throw new Error('minMembers property must be a number.');
			queries.push(`minMembers=${options.minMembers}`);
		}
		if (options.maxMembers) {
			if (typeof options.maxMembers !== 'number') throw new Error('maxMembers property must be a number.');
			queries.push(`maxMembers=${options.maxMembers}`);
		}

		const { body } = await get(`http://api.royaleapi.com/clan/search?${queries.join('&')}`)
			.set('auth', this.token);
		const result = body.map(clan => new Clan(clan));
		return result;
	}

	/**
     * @typedef {string} APIVersion
	 * The current version of the API.
     */

	/**
     * get the current version of the api
     * @since 2.0.0
     * @returns {Promise<APIVersion>} the api version.
     * @example
     * API.getVersion()
     *  .then(result => {
     *    console.log(`The Current API version is ${result}`);
     *  })
	 *  .catch(console.error);
     */
	async getVersion() {
		const { text } = await get('http://api.royaleapi.com/version');
		return text;
	}

	/**
	 * get a list of open tournaments
	 * @since 2.0.0
	 * @returns {Promise<Array<Tournament>>} list of open tournaments.
	 * @example
	 * API.getOpenTournaments()
	 *  .then(tournies => {
	 *    console.log(`The data of first open tournament is ${tournies[0]}`);
	 *  })
	 *  .catch(console.error);
	 */
	async getOpenTournaments() {
		const { body } = await get('http://api.royaleapi.com/tournaments/open')
			.set('auth', this.token);
		const tournies = body.map(tourney => new Tournament(tourney));
		return tournies;
	}

}

module.exports = Client;

const { get } = require('snekfetch');
const Player = require('./structures/player');
const Clan = require('./structures/clan');
const Tournament = require('./structures/tournament');

/**
 * The client for fetching data from the RoyaleAPI.
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
		 * @type {string}
		 */
        this.token = token;

        /**
		 * The valid characters for any tag
		 * @type {string}
		 * @private
		 */
        this.tagCharacters = '0289PYLQGRJCUV';

        /**
		 * The base URL of the API.
		 * @type {string}
		 * @private
		 */
        this.baseURL = 'http://api.royaleapi.com/';
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
     * if (tag) console.log(`${tag} is a valid tag.`);
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
	 * The base funtion that makes all the necessary API calls.
	 * @since 2.2.0
	 * @async
	 * @param {string} endpoint The endpoint to call.
	 * @param {RequestOptions} options The options for the API call.
	 * @returns {Promise<Object>} The raw API response.
	 * @private
	 */
    _get(endpoint, options = {}) {
        return get(`${this.baseURL}${endpoint}`)
            .query(options)
            .set('auth', this.token)
            .then(res => res.body)
            .catch(error => { throw `There was a error while trying to get Information from the API: ${error}`; });
    }

    /**
     * get the player data from the api with the tag
	 * @async
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
    getPlayer(tag, options = {}) {
        if (!tag) throw new Error('Invalid usage! Must provide the tag');
        if (typeof tag !== 'string') throw new Error('Tag must be string');

        // checking if the input for options are correct or not.
        if (options.keys && options.exclude) throw new TypeError('You can only request with either Keys or Exclude.');
        if (options.keys && !options.keys.length) throw new TypeError('Make sure the keys argument you pass is an array.');
        if (options.exclude && !options.exclude.length) throw new TypeError('Make sure the exclude argument you pass is an array.');

        // making the query parameters ready
        if (options.keys) options.keys = options.keys.join(', ');
        if (options.exclude) options.exclude = options.exclude.join(',');

        const verifiedTag = this.verifyTag(tag);
        if (!verifiedTag) throw new Error(`The tag you provided has some invalid character. Make sure it contains only the following characters: "${this.tagCharacters}"`);

        return this._get(`player/${verifiedTag}`, options)
            .then(res => new Player(res));
    }

    /**
     * get the clan data from the api with the tag
	 * @async
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
    getClan(tag, options = {}) {
        if (!tag) throw new Error('Invalid usage! Must provide the tag');
        if (typeof tag !== 'string') throw new Error('Tag must be string');

        // checking if the input for options are correct or not.
        if (options.keys && options.exclude) throw new TypeError('You can only request with either Keys or Exclude.');
        if (options.keys && !options.keys.length) throw new TypeError('Make sure the keys argument you pass is an array.');
        if (options.exclude && !options.exclude.length) throw new TypeError('Make sure the exclude argument you pass is an array.');

        // making the query parameters ready
        if (options.keys) options.keys = options.keys.join(', ');
        if (options.exclude) options.exclude = options.exclude.join(',');

        const verifiedTag = this.verifyTag(tag);
        if (!verifiedTag) throw new Error(`The tag you provided has some invalid character. Make sure it contains only the following characters: "${this.tagCharacters}"`);

        return this._get(`clan/${verifiedTag}`, options)
            .then(res => new Clan(res));
    }

    /**
	 * get top 200 players (global or specific location).
	 * Have a look at royaleapi-data/json/regions.json for the full list of acceptable keys.
	 * @async
	 * @since 2.0.0
	 * @param {string} locationKey The specific location to get the top players of.
	 * @returns {Promise<Array<Player>>} array of top 200 players.
	 */
    getTopPlayers(locationKey) {
        if (locationKey && typeof locationKey !== 'string') throw new Error('Location key must be a string');
        return this._get(`top/players${locationKey ? `/${locationKey}` : ''}`);
    }

    /**
	 * get top 200 clans (global or specified location).
	 * Have a look at royaleapi-data/json/regions.json for the full list of acceptable keys.
	 * @async
	 * @since 2.0.0
	 * @param {string} locationKey The specific location to get the top clans of.
	 * @returns {Promise<Array<Clan>>} array of top 200 clans.
	 */
    getTopClans(locationKey) {
        if (locationKey && typeof locationKey !== 'string') throw new Error('Location key must be a string');
        return this._get(`top/clans${locationKey ? `/${locationKey}` : ''}`);
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
	 * @async
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
    searchClan(options = {}) {
        if (!options.name && !options.score && !options.minMembers && !options.maxMembers) throw new Error('You must provide at least one query string parameters to see results.');

        if (options.name && typeof options.name !== 'string') throw new Error('Name property must be a string.');
        if (options.score && typeof options.score !== 'number') throw new Error('Score property must be a number.');
        if (options.minMembers && typeof options.score !== 'number') throw new Error('minMembers property must be a number.');
        if (options.maxMembers && typeof options.score !== 'number') throw new Error('maxMembers property must be a number.');

        return this._get('clan/search', options)
            .then(res => res.map(clan => new Clan(clan)));
    }

    /**
     * @typedef {string} APIVersion
	 * The current version of the API.
     */

    /**
     * get the current version of the api
	 * @async
     * @since 2.0.0
     * @returns {Promise<APIVersion>} the api version.
     * @example
     * API.getVersion()
     *  .then(result => {
     *    console.log(`The Current API version is ${result}`);
     *  })
	 *  .catch(console.error);
     */
    getVersion() {
        return get('http://api.royaleapi.com/version')
            .then(res => res.text);
    }

    /**
	 * get a list of open tournaments
	 * @async
	 * @since 2.0.0
	 * @returns {Promise<Array<Tournament>>} list of open tournaments.
	 * @example
	 * API.getOpenTournaments()
	 *  .then(tournies => {
	 *    console.log(`The data of first open tournament is ${tournies[0]}`);
	 *  })
	 *  .catch(console.error);
	 */
    getOpenTournaments() {
        return this._get('tournaments/open')
            .then(res => res.map(tourney => new Tournament(tourney)));
    }

}

module.exports = Client;

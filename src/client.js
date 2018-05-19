const { get } = require('snekfetch');
const Player = require('./structures/player');
const Clan = require('./structures/clan');
const Tournament = require('./structures/tournament');

/**
 * The client for fetching data from RoyaleAPI
 */
class Client {

    /**
	 * Constructs the Croyale client.
	 * @since 2.0.0
	 * @param {string} token The token to interact with the API.
	 */
    constructor(token) {
        if (!token) throw new Error('Token is required to interact with the API. Make sure to provide it.');

        /**
		 * The token provided.
		 * @since 2.0.0
		 * @type {string}
		 */
        this.token = token;

        /**
		 * The valid characters for any tag.
		 * @type {string}
		 * @private
		 */
        this._tagCharacters = '0289PYLQGRJCUV';

        /**
		 * The base URL of the API.
		 * @type {string}
		 * @private
		 */
        this._baseURL = 'http://api.royaleapi.com/';
    }

    /**
     * A string conatining the valid tag characters.
     * @typedef {string} tag
     */

    /**
	 * Checks if the provided tag is a valid one.
	 * @since 2.0.0
	 * @param {string} tag The tag that is to be checked.
	 * @returns {tag} The verified tag.
     * @example
     * try {
     *     const verifiedTag = client.verifyTag('CVLQ2GV8');
     *     console.log(`${verifiedTag} is a valid tag.`)
     * } catch (error) {
     *     console.log(error.message);
     * }
	 */
    verifyTag(tag) {
        if (!tag) throw new Error('Invalid usage! Must provide the tag');
        if (typeof tag !== 'string') throw new Error('Tag must be string');
        tag = tag.toUpperCase().replace('#', '').replace(/O/g, '0');
        for (var i = 0; i < tag.length; i++) {
            if (!this._tagCharacters.includes(tag[i])) throw new Error(`The tag you provided has some invalid character. Make sure it contains only the following characters: "${this._tagCharacters}"`);
        }
        return tag;
    }

    /**
     * @typedef {object} RequestOptions
     * @property {Array<string>} [keys] The keys to get in the response from the API.
     * @property {Array<string>} [exclude] The keys to exclude in the response from the API.
     * @memberof Client
     */

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
        return get(`${this._baseURL}${endpoint}`)
            .query(options)
            .set('auth', this.token)
            .then(res => res.body);
    }

    /**
     * Gets the player data from the API with the provided tag.
     * @since 2.0.0
     * @param {string} tag The player tag to get the data for.
     * @param {RequestOptions} options The options to be passed for customized result.
     * @returns {Promise<Player>} The arranged player data.
     * @example
     * API.getPlayer('CVLQ2GV8', {
     *  keys: ['name']
     * })
     *  .then(player => {
     *    console.log(`The Player's name is ${player.name}`);
     *  })
     *  .catch(error => console.log(error.message));
     */
    async getPlayer(tag, options = {}) {
        const verifiedTag = this.verifyTag(tag);

        // Checking if the input for options are correct or not.
        if (options.keys && options.exclude) throw new TypeError('You can only request with either Keys or Exclude.');
        if (options.keys) {
            if (!options.keys.length) throw new TypeError('Make sure the keys argument you pass is an array.');
            options.keys = options.keys.join(', ');
        }
        if (options.exclude) {
            if (!options.exclude.length) throw new TypeError('Make sure the exclude argument you pass is an array.');
            options.exclude = options.exclude.join(',');
        }

        const res = await this._get(`player/${verifiedTag}`, options);
        return new Player(res);
    }

    /**
     * Gets the player chest cycle data from the API with the provided tag.
     * @since 2.0.0
     * @param {string} tag The player tag to get the data for.
     * @returns {Promise<Player>} The arranged player chest cycle data.
     * @example
     * API.getPlayerChests('CVLQ2GV8', {
     *   })
     *   .then(chests => {
     *   console.log(`The Player's upcoming chests are ${chests.upcomingChests}`);
     *   console.log(`The Player's next magical chest is in ${chests.specialChests.magical} chests`)
     *   })
     *   .catch(error => console.log(error.message));
     */
    async getPlayerChests(tag) {
        const verifiedTag = this.verifyTag(tag);
        const res = await this._get(`player/${verifiedTag}/chests/`);
        return new Player({
            chestCycle: {
                upcoming: res.upcoming,
                superMagical: res.superMagical,
                magical: res.magical,
                legendary: res.legendary,
                epic: res.epic,
                giant: res.giant
            }
        });
    }

    /**
     * Gets the clan data from the API with the provided tag.
     * @since 2.0.0
     * @param {string} tag The clan tag to get the data for.
     * @param {RequestOptions} options The options to be passed for customized result.
     * @returns {Promise<Clan>} The arranged clan data.
	 * @example
	 * API.getClan('2CCCP', {
	 *  keys: ['name']
	 * })
	 *  .then(clan => {
	 *    console.log(`The clan's name is ${clan.name}`);
	 *  })
	 *  .catch(error => console.log(error.message));
     */
    async getClan(tag, options = {}) {
        const verifiedTag = this.verifyTag(tag);

        // checking if the input for options are correct or not.
        if (options.keys && options.exclude) throw new TypeError('You can only request with either Keys or Exclude.');
        if (options.keys) {
            if (!options.keys.length) throw new TypeError('Make sure the keys argument you pass is an array.');
            options.keys = options.keys.join(', ');
        }
        if (options.exclude) {
            if (!options.exclude.length) throw new TypeError('Make sure the exclude argument you pass is an array.');
            options.exclude = options.exclude.join(',');
        }

        const res = await this._get(`clan/${verifiedTag}`, options);
        return new Clan(res);
    }

    /**
	 * Gets the top 200 players (global or specific location).
	 * Have a look at https://royaleapi-data/json/regions.json for the full list of acceptable keys.
	 * @since 2.0.0
	 * @param {string} locationKey The specific location to get the top players of.
	 * @returns {Promise<Array<Player>>} Array of the top 200 players.
	 */
    async getTopPlayers(locationKey) {
        if (locationKey && typeof locationKey !== 'string') throw new Error('Location key must be a string');
        return this._get(`top/players${locationKey ? `/${locationKey}` : ''}`);
    }

    /**
	 * Gets top 200 clans (global or specified location).
	 * Have a look at https://royaleapi-data/json/regions.json for the full list of acceptable keys.
	 * @since 2.0.0
	 * @param {string} locationKey The specific location to get the top clans of.
	 * @returns {Promise<Array<Clan>>} Array of top 200 clans.
	 */
    async getTopClans(locationKey) {
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
	 * Search for a clan with some query options.
	 * @since 2.0.0
	 * @param {ClanSearchOptions} options The options which you want the clan to match.
	 * @returns {Promise<Array<Clan>>} Array of clans matching the criteria.
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
        if (typeof options !== 'object') throw new TypeError('dictionary must be an object.');

        if (!options.name && !options.score && !options.minMembers && !options.maxMembers) throw new Error('You must provide at least one query string parameters to see results.');
        if (options.name && typeof options.name !== 'string') throw new TypeError('Name property must be a string.');
        if (options.score && typeof options.score !== 'number') throw new TypeError('Score property must be a number.');
        if (options.minMembers && typeof options.score !== 'number') throw new TypeError('minMembers property must be a number.');
        if (options.maxMembers && typeof options.score !== 'number') throw new TypeError('maxMembers property must be a number.');

        const res = await this._get('clan/search', options);
        return res.map(clan => new Clan(clan));
    }

    /**
     * @typedef {string} APIVersion
	 * The current version of the API.
     * @memberof Client
     */

    /**
     * Get the current version of the API.
     * @since 2.0.0
     * @returns {Promise<APIVersion>} The API version.
     * @example
     * API.getVersion()
     *  .then(result => {
     *    console.log(`The Current API version is ${result}`);
     *  })
	 *  .catch(error => console.log(`Error: ${error.message}`));
     */
    async getVersion() {
        const res = await get('http://api.royaleapi.com/version');
        return res.text;
    }

    /**
	 * Gets a list of open tournaments.
	 * @since 2.0.0
	 * @returns {Promise<Array<Tournament>>} List of open tournaments.
	 * @example
	 * API.getOpenTournaments()
	 *  .then(tournies => {
	 *    console.log(`The data of the first open tournament is ${tournies[0]}`);
	 *  })
	 *  .catch(console.error);
	 */
    async getOpenTournaments() {
        const res = await this._get('tournaments/open');
        return res.map(tourney => new Tournament(tourney));
    }

}

module.exports = Client;

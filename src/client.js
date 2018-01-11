const { get } = require('snekfetch');
const Player = require('./structures/player');
const Clan = require('./structures/clan');

/**
 * The client for handling everything.
 */
class Client {

	/**
     * @typedef {object} RequestOptions
     * @property {Array<string>} [keys] The keys to get in the response from the API.
     * @property {Array<string>} [exclude] The keys to exclude in the response from the API.
     * @memberof Client
     */

	/**
	 * Constructs the croyale client
	 * @since 2.0.0
	 * @param {string} token The token to interact with the API.
	 */
	constructor(token) {
		if (!token) throw new TypeError('Token is an essential component to interact with the API. Make sure to provide it.');

		/**
		 * The token provided
		 * @since 2.0.0
		 * @type {?string}
		 */
		this.token = token;

		/**
		 * The valid characters for any tag
		 * @since 2.0.0
		 * @type {string}
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
     * let tag = API.verifyTag('CVLQ2GV8')
     * if (tag) console.log('It is a tag with proper characters.')
     * else console.error('The tag has invalid charactrs.')
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
     * @returns {Promise<?Player>} the arranged player data.
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
		if (!tag) throw new TypeError('Invalid usage! Must provide the tag');
		if (typeof tag !== 'string') throw new TypeError('Tag must be string');

		const verifiedTag = this.verifyTag(tag);
		if (!verifiedTag) throw new TypeError(`The tag you provided has some invalid character. Make sure it contains only the following characters: "${this.tagCharacters}"`);

		if (options.keys && options.exclude) throw new TypeError('You can only request with either Keys or Exclude.');
		if (options.keys && !options.keys.length) throw new TypeError('Make sure the keys argument you pass is an array.');
		if (options.exclude && !options.exclude.length) throw new TypeError('Make sure the exclude argument you pass is an array.');

		const { body } = await get(`http://api.cr-api.com/player/${verifiedTag}${options.keys ? `?keys=${options.keys.join(',')}` : ''}${options.exclude ? `?exclude=${options.exclude.join(',')}` : ''}`)
			.set('auth', this.token);
		const player = new Player(body);
		return player;
	}

	/**
     * get the clan data from the api with the tag
     * @since 2.0.0
     * @param {string} tag The clan tag to get the data for.
     * @param {RequestOptions} options The options to be passed for customized result.
     * @returns {Promise<?Clan>} the arranged clan data.
     */
	async getClan(tag, options = {}) {
		if (!tag) throw new TypeError('Invalid usage! Must provide the tag');
		if (typeof tag !== 'string') throw new TypeError('Tag must be string');

		const verifiedTag = this.verifyTag(tag);
		if (!verifiedTag) throw new TypeError(`The tag you provided has some invalid character. Make sure it contains only the following characters: "${this.tagCharacters}"`);

		if (options.keys && options.exclude) throw new TypeError('You can only request with either Keys or Exclude.');
		if (options.keys && !options.keys.length) throw new TypeError('Make sure the keys argument you pass is an array.');
		if (options.exclude && !options.exclude.length) throw new TypeError('Make sure the exclude argument you pass is an array.');

		const { body } = await get(`http://api.cr-api.com/clan/${verifiedTag}${options.keys ? `?keys=${options.keys.join(',')}` : ''}${options.exclude ? `?exclude=${options.exclude.join(',')}` : ''}`)
			.set('auth', this.token);
		const clan = new Clan(body);
		return clan;
	}

	/**
     * @typedef {string} APIVersion
     */

	/**
     * get the current version of the api
     * @since 2.0.0
     * @returns {Promise<?APIVersion>} the api version.
     * @example
     * API.getVersion()
     *  .then(result => {
     *    console.log(`The Current API version is ${result}`)
     *  })
     */
	async getVersion() {
		const { text } = await get('http://api.cr-api.com/version');
		return text;
	}

}

module.exports = Client;

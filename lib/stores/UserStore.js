const Store = require('./Store');
const Util = require('../util/Util');
const Player = require('../structures/Player');
const PlayerBattles = require('../structures/PlayerBattles');
const PlayerChests = require('../structures/PlayerChests');
const Collection = require('../util/Collection');

/**
  * @typedef {Object} APIRequestOptions
  * @property {string[]} keys The only keys to get from the API request.
  * @property {string[]} exclude The keys to exclude from the API result.
  */

/**
 * Stores all the users data obtained from the API.
 * @extends {Store}
 */
class UserStore extends Store {

    /**
	 * Constructs our UserStore for the user in CRoyale
	 * @since 3.0.0
	 * @param {Client} client The CRoyale client
	 */
    constructor(client) {
        super(client);

        /**
         * The collection of cache of user battles requested from the API.
         * @since 3.0.0
         * @type {Collection}
         */
        this.battles = new Collection();

        /**
         * The collection of cahche of user chests requested from the API.
         * @since 3.0.0
         * @type {Collection}
         */
        this.chests = new Collection();
    }

    /**
     * Get a users profile from the API.
     * @async
     * @since 3.0.0
     * @param {string} tag The player's tag to get information about.
     * @param {APIRequestOptions} [options={}] Optional information for fetching the player data.
     * @returns {Promise<Player>}
     */
    async getProfile(tag, options) {
        const verifiedTag = Util.verifyTag(tag);

        const existing = this.get(verifiedTag);
        if (existing && Date.now() < existing._cacheTime) return existing;

        const _rawData = await this.client.Api.getUserProfile(verifiedTag, options);

        // Checking if the cahce size is less than the size user requested in the client options.
        if (this.cacheSize === 0) return new Player(_rawData);
        if (this.size >= this.cacheSize && this.cacheSize > 0) this.delete(this.firstKey());
        return this.set(verifiedTag, new Player(_rawData)).get(verifiedTag);
    }

    /**
     * Get the battles of a player.
     * @async
     * @since 3.0.0
     * @param {string} tag The player's tag to get information about.
     * @param {APIRequestOptions} [options={}] Optional information for fetching the player data.
     * @returns {Promise<PlayerBattles>}
     */
    async getBattles(tag, options) {
        const verifiedTag = Util.verifyTag(tag);

        const existing = this.battles.get(verifiedTag);
        if (existing && Date.now() < existing._cacheTime) return existing;

        const _rawData = await this.client.Api.getUserBattles(verifiedTag, options);

        // Checking if the cahce size is less than the size user requested in the client options.
        if (this.cacheSize === 0) return new PlayerBattles(_rawData);
        if (this.battles.size >= this.cacheSize && this.cacheSize > 0) this.battles.delete(this.battles.firstKey());
        return this.battles.set(verifiedTag, new PlayerBattles(_rawData)).get(verifiedTag);
    }

    /**
     * Get the chests of a player.
     * @async
     * @since 3.0.0
     * @param {string} tag The player's tag to get information about.
     * @param {APIRequestOptions} [options={}] Optional information for fetching the player data.
     * @returns {Promise<PlayerChests>}
     */
    async getChests(tag, options) {
        const verifiedTag = Util.verifyTag(tag);

        const existing = this.chests.get(verifiedTag);
        if (existing && Date.now() < existing._cacheTime) return existing;

        const _rawData = await this.client.Api.getUserChests(verifiedTag, options);

        // Checking if the cahce size is less than the size user requested in the client options.
        if (this.cacheSize === 0) return new PlayerChests(_rawData);
        if (this.chests.size >= this.cacheSize && this.cacheSize > 0) this.chests.delete(this.chests.firstKey());
        return this.chests.set(verifiedTag, new PlayerChests(_rawData)).get(verifiedTag);
    }

    /**
     * Get list of top users by location or global by default.
     * @async
     * @since 3.0.0
     * @param {string} location The location to get top users of.
     * @param {APIRequestOptions} [options={}] Optional information for fetching the player data.
     * @return {Promise<Player[]>}
     * <info> This is not working as indended atm </info>
     */
    async getTopUsers(location, options) {
        if (location && typeof location !== 'string') throw new Error('Location value must be a string!');
        const _rawData = await this.client.Api.getTopUsers(options);
        return _rawData.map(_single => new Player(_single));
    }

    /**
     * Get list of popular users requested mostly from the API.
     * @async
     * @since 3.0.0
     * @param {APIRequestOptions} [options={}] Optional information for fetching the player data.
     * @return {Promise<Player[]>}
     */
    async getPopularUsers(options) {
        const _rawData = await this.client.Api.getPopularUsers(options);
        return _rawData.map(_single => new Player(_single));
    }

}

module.exports = UserStore;

const Store = require('./Store');
const Util = require('../util/Util');
const Clan = require('../structures/Clan');
const Collection = require('../util/Collection');

/**
 * Stores all the clan data obtained from the API.
 * @extends {Store}
 */
class ClanStore extends Store {

    constructor(client) {
        super(client);

        /**
         * The collection of cache of clan battles fetched from the API.
         * @since 3.0.0
         * @type {Collection}
         */
        this.battles = new Collection();

        /**
         * The collection of cache of clan war fetched from the API.
         * @since 3.0.0
         * @type {Collection}
         */
        this.war = new Collection();

        /**
         * The collection of cache of clan warLog fetched from the API.
         * @since 3.0.0
         * @type {Collection}
         */
        this.warLog = new Collection();

        /**
         * The collection of cache of clan history fetched from the API.
         * @since 3.0.0
         * @type {Collection}
         */
        this.history = new Collection();

        /**
         * The collection of cache of clan weekly history fetched from the API.
         */
        this.weeklyHistory = new Collection();
    }

    /**
     * Get basic information about a clan.
     * @async
     * @since 3.0.0
     * @param {string} tag The clan's tag to get information about.
     * @param {APIRequestOptions} [options={}] Optional information for fetching the player data.
     * @returns {Promise<Clan>}
     */
    async getData(tag, options) {
        const verifiedTag = Util.verifyTag(tag);

        const existing = this.get(verifiedTag);
        if (existing && Date.now() < existing._cacheTime) return existing;

        const _rawData = await this.client.Api.getClanData(verifiedTag, options);

        // Checking if the cahce size is less than the size user requested in the client options.
        if (this.cacheSize === 0) return new Clan(_rawData);
        if (this.size >= this.cacheSize && this.cacheSize > 0) this.delete(this.firstKey());
        return this.set(verifiedTag, new Clan(_rawData)).get(verifiedTag);
    }

    /**
     * Get recent battles of the clan.
     * @async
     * @since 3.0.0
     * @param {string} tag The clan's tag to get information about.
     * @param {APIRequestOptions} [options={}] Optional information for fetching the player data.
     * @returns {Promise<Object>}
     */
    async getBattles(tag, options) {
        const verifiedTag = Util.verifyTag(tag);

        const existing = this.battles.get(verifiedTag);
        if (existing && Date.now() < existing._cacheTime) return existing;

        const _rawData = await this.client.Api.getClanBattles(verifiedTag, options);

        // Checking if the cahce size is less than the size user requested in the client options.
        if (this.cacheSize === 0) return _rawData;
        if (this.battles.size >= this.cacheSize && this.cacheSize > 0) this.battles.delete(this.battles.firstKey());
        return this.battles.set(verifiedTag, _rawData).get(verifiedTag);
    }

    /**
     * Get current war data of the clan.
     * @async
     * @since 3.0.0
     * @param {string} tag The clan's tag to get information about.
     * @param {APIRequestOptions} [options={}] Optional information for fetching the player data.
     * @returns {Promise<Object>}
     */
    async getWarData(tag, options) {
        const verifiedTag = Util.verifyTag(tag);

        const existing = this.war.get(verifiedTag);
        if (existing && Date.now() < existing._cacheTime) return existing;

        const _rawData = await this.client.Api.getClanWar(verifiedTag, options);

        // Checking if the cahce size is less than the size user requested in the client options.
        if (this.cacheSize === 0) return _rawData;
        if (this.war.size >= this.cacheSize && this.cacheSize > 0) this.war.delete(this.war.firstKey());
        return this.war.set(verifiedTag, _rawData).get(verifiedTag);
    }

    /**
     * Get previous war logs of the clan.
     * @async
     * @since 3.0.0
     * @param {string} tag The clan's tag to get information about.
     * @param {APIRequestOptions} [options={}] Optional information for fetching the player data.
     * @returns {Promise<Object>}
     */
    async getWarLogs(tag, options) {
        const verifiedTag = Util.verifyTag(tag);

        const existing = this.warLog.get(verifiedTag);
        if (existing && Date.now() < existing._cacheTime) return existing;

        const _rawData = await this.client.Api.getClanWarLog(verifiedTag, options);

        // Checking if the cahce size is less than the size user requested in the client options.
        if (this.cacheSize === 0) return _rawData;
        if (this.warLog.size >= this.cacheSize && this.cacheSize > 0) this.warLog.delete(this.warLog.firstKey());
        return this.warLog.set(verifiedTag, _rawData).get(verifiedTag);
    }

    /**
     * Get the history of a clan.
     * @async
     * @since 3.0.0
     * @param {string} tag The clan's tag to get information about.
     * @param {APIRequestOptions} [options={}] Optional information for fetching the player data.
     * @returns {Promise<Object>}
     */
    async getHistory(tag, options) {
        const verifiedTag = Util.verifyTag(tag);

        const existing = this.history.get(verifiedTag);
        if (existing && Date.now() < existing._cacheTime) return existing;

        const _rawData = await this.client.Api.getClanHistory(verifiedTag, options);

        // Checking if the cahce size is less than the size user requested in the client options.
        if (this.cacheSize === 0) return _rawData;
        if (this.history.size >= this.cacheSize && this.cacheSize > 0) this.history.delete(this.history.firstKey());
        return this.history.set(verifiedTag, _rawData).get(verifiedTag);
    }

    /**
     * Get the weekly history of a clan.
     * @async
     * @since 3.0.0
     * @param {string} tag The clan's tag to get information about.
     * @param {APIRequestOptions} [options={}] Optional information for fetching the player data.
     * @returns {Promise<Object>}
     */
    async getWeeklyHistory(tag, options) {
        const verifiedTag = Util.verifyTag(tag);

        const existing = this.weeklyHistory.get(verifiedTag);
        if (existing && Date.now() < existing._cacheTime) return existing;

        const _rawData = await this.client.Api.getClanWeeklyHistory(verifiedTag, options);

        // Checking if the cahce size is less than the size user requested in the client options.
        if (this.cacheSize === 0) return _rawData;
        if (this.weeklyHistory.size >= this.cacheSize && this.cacheSize > 0) this.weeklyHistory.delete(this.weeklyHistory.firstKey());
        return this.weeklyHistory.set(verifiedTag, _rawData).get(verifiedTag);
    }

    /**
     * Get the tracking status of a clan.
     * @async
     * @since 3.0.0
     * @param {string} tag The clan's tag to get information about.
     * @param {APIRequestOptions} [options={}] Optional information for fetching the player data.
     * @returns {Promise<Object>}
     */
    async getTracking(tag, options) {
        const verifiedTag = Util.verifyTag(tag);

        return this.client.Api.getClanTracking(verifiedTag, options);
    }

    /**
     * Get some top clans information.
     * @async
     * @since 3.0.0
     * @param {APIRequestOptions} [options={}] Optional information for fetching the player data.
     * @returns {Promise<Clan[]>}
     * <info> This is not working as indended atm </info>
     */
    async getTopClans(options) {
        const _rawData = await this.client.Api.getTopClans(options);
        return _rawData.map(_single => new Clan(_single));
    }

    /**
     * Get some top clans which are frequently requested from the API.
     * @async
     * @since 3.0.0
     * @param {APIRequestOptions} [options={}] Optional information for fetching the player data.
     * @returns {Promise<Clan[]>}
     */
    async getPopularClans(options) {
        const _rawData = await this.client.Api.getPopularClans(options);
        return _rawData.map(_single => new Clan(_single));
    }

}

module.exports = ClanStore;

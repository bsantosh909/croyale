const UserStore = require('./stores/UserStore');
const ClanStore = require('./stores/ClanStore');
const TournamentStore = require('./stores/TournamentStore');
const Api = require('./util/Api');
const Util = require('./util/Util');

/**
 * The CRoyale client to perform all the tasks of getting and providing the information.
 */
class Client {

    /**
     * @typedef {Object} ClientOptions
     * @property {number} cacheSize The amount of data to be stored in every cache.
     * @memberOf Client
     */

    /**
	 * Initialize a new Client.
	 * @param {string} token The Royale API token.
     * @param {ClientOptions} options The configuration options for the client.
	 */
    constructor(token, options = { cacheSize: 25 }) {
        if (!token) throw new Error('Token is required to interact with the API. If you dont have one, get one from https://RoyaleAPI.com !');

        /**
		 * The secret token of the API.
		 * @since 3.0.0
		 * @type {string}
		 * @private
		 */
        this._token = token;

        /**
         * The collection of User cache from the API.
         * @since 3.0.0
         * @type {UserStore}
         */
        this.Users = new UserStore(this);

        /**
         * The collection of Clan cache from the API.
         * @since 3.0.0
         * @type {ClanStore}
         */
        this.Clans = new ClanStore(this);

        /**
         * The collection of Tournament cache from the API.
         * @since 3.0.0
         * @type {TournamentStore}
         */
        this.Tournaments = new TournamentStore(this);

        /**
         * The API class which makes all the required calls to the API.
         * It also handles the Rate limiting stuffs.
         * @since 3.0.0
         * @type {API}
         * @private
         */
        this.Api = new Api(this);

        /**
         * The confiuration options for the client to handle some stuffs.
         * @since 3.0.0
         * @type {ClientOptions}
         */
        this.options = options;
    }

    /**
     * Verify if a tag is valid Clash Royale tag or not.
     * @since 3.0.0
     * @param {string} _tag The raw tag to verify.
     * @returns {string}
     */
    verifyTag(_tag) {
        return Util.verifyTag(_tag);
    }

    /**
     * @typedef {Object} RateLimits
     * @property {number} remaining The amount of calls to the API remaining.
     * @property {number} resetAt The time at which the old rate limit resets.
     */

    /**
     * Get the information about rate limits for your key.
     * @readonly
     * @since 3.0.0
     * @returns {RateLimits}
     */
    get rateLimits() {
        return {
            remaining: this.Api._rateLimitRemaining,
            resetAt: this.Api._rateLimitReset
        };
    }

}

module.exports = Client;

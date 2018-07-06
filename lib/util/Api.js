const { get } = require('snekfetch');
const { RateLimiter } = require('./RateLimiter');

/**
  * @typedef {Object} APIRequestOptions
  * @property {string[]} keys The only keys to get from the API request.
  * @property {string[]} exclude The keys to exclude from the API result.
  */

/**
 * The API class which makes all the calls to the API with proper rate limit handling.
 * @private
 */
class API {

    constructor(client) {
        Object.defineProperty(this, 'client', { value: client });

        /**
		 * The base URL of the API to be called.
		 * @since 3.0.0
		 * @type {URL}
		 */
        this._baseURL = 'http://api.royaleapi.com/';

        this._rateLimiter = new RateLimiter(5, 1000);
    }

    /**
     * Request the API endpoint with necessary information.
     * @param {string} endpoint The endpoint to get.
     * @param {APIRequestOptions} options Request options
     * @returns {Promise<Object>}
     */
    _get(endpoint, options = {}) {
        console.log('Requesting data from the API.');

        this._rateLimiter.mkRequest();

        // Checking if the input for options are correct or not.
        if (options.keys && options.exclude) throw new Error('You can only request with either Keys or Exclude.');
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
            })
            .catch(err => { throw err.body; });
    }

    getUserProfile(tag, options) {
        return this._get(`player/${tag}`, options);
    }

    getUserBattles(tag, options) {
        return this._get(`player/${tag}/battles`, options);
    }

    getUserChests(tag, options) {
        return this._get(`player/${tag}/chests`, options);
    }

    getTopUsers(loc, options) {
        return this._get(`top/players/${loc}`, options);
    }

    getPopularUsers(options) {
        return this._get('popular/players', options);
    }

    getClanData(tag, options) {
        return this._get(`clan/${tag}`, options);
    }

    getClanBattles(tag, options) {
        return this._get(`clan/${tag}/battles`, options);
    }

    getClanWar(tag, options) {
        return this._get(`clan/${tag}/war`, options);
    }

    getClanWarLog(tag, options) {
        return this._get(`clan/${tag}/warlog`, options);
    }

    getClanHistory(tag, options) {
        return this._get(`clan/${tag}/history`, options);
    }

    getClanWeeklyHistory(tag, options) {
        return this.get(`clan/${tag}/history/weekly`, options);
    }

    getClanTracking(tag, options) {
        return this._get(`clan/${tag}/tracking`, options);
    }

    getTopClans(loc, options) {
        return this._get(`top/clans/${loc}`, options);
    }

    getPopularClans(options) {
        return this._get('popular/clans', options);
    }

    getOpenTournaments(options) {
        return this._get('tournaments/open', options);
    }

    getKnownTournaments(options) {
        return this._get('tournaments/known', options);
    }

    getTournamentInfo(tag, options) {
        return this._get(`tournaments/${tag}`, options);
    }

    getPopularTournament(options) {
        return this._get('popular/tournaments', options);
    }

    getPopularDecks(options) {
        return this._get('popular/decks', options);
    }

}

module.exports = API;

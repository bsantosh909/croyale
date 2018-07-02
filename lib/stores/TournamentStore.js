const Store = require('./Store');

/**
 * @typedef {Object} APIRequestOptions
 * @property {string[]} keys The only keys to get from the API request.
 * @property {string[]} exclude The keys to exclude from the API result.
 */

/**
 * Stores all the tournament data obtained from the API.
 * @extends {Store}
 */
class TournamentStore extends Store {

    /**
	 * Get list of open tournaments
	 * @async
	 * @since 3.0.0
	 * @param {APIRequestOptions} options Request options
	 * @returns {Promise<*>}
	 */
    getOpenList(options) {
        return this.client.Api.getOpenTournaments(options);
    }

    /**
	 * Get list of known tournaments
	 * @async
	 * @since 3.0.0
	 * @param {APIRequestOptions} options Request options
	 * @returns {Promise<*>}
	 */
    getKnownList(options) {
        return this.client.Api.getKnownTournaments(options);
    }

    /**
	 * Get information about a tournament
	 * @async
	 * @since 3.0.0
	 * @param {string} tag The tournament tag
	 * @param {APIRequestOptions} options Request options
	 * @returns {Promise<*>}
	 */
    async getInfo(tag, options) {
        if (!tag) throw new Error(`You must provide the tournament tag to get information about.`);
        return await this.client.Api.getTournamentInfo(options);
    }

    /**
	 * Get list of popular tournaments
	 * @async
	 * @since 3.0.0
	 * @param {APIRequestOptions} options Request options
	 * @returns {Promise<*>}
	 */
    getPopularList(options) {
        return this.client.Api.getPopularTournament(options);
    }

}

module.exports = TournamentStore;

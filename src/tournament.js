const { get } = require('snekfetch');

/**
 * Tournament class to get open tournament at the current time.
 */

class Tournament {

	/**
     * @typedef {Object} Tournament
     * @property {string} [name] Name of the tournament.
     * @property {string} [tag] Tag of the tournament.
     * @property {string} [description] Description of the tournament.
     * @property {number} [maxPlapers] Maximum players that can join this tournament.
     * @property {number} [players] Current number of players in the tournament.
     * @property {boolean} [full] Whether the tournament is full or not.
     * @property {boolean} [locked] Whether the tournament is locked or not.
     */

	/**
     * Get a list of open tournaments
     * @since 2.0.0
     * @returns {Promise<Array<Tournament>>}
     */
	async getList() {
		const { body } = await get('http://statsroyale.com/tournaments?appjson=1');
		if (body.success !== true) throw new TypeError('Some error occured while trying to get the list of open Tournaments.');
		const result = body.tournaments.map(tourney => ({
			name: tourney.title,
			tag: tourney.hashtag,
			description: tourney.description,
			maxPlayers: tourney.maxPlayers,
			players: tourney.totalPlayers,
			full: tourney.full,
			locked: tourney.locked
		}));
		return result;
	}

}

module.exports = Tournament;

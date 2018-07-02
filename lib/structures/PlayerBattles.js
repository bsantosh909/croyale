const Base = require('./Base');

/**
 * @typedef {Object} BattleMode
 * @property {string} name The battle mode name
 * @property {string} deck The type of deck used
 * @property {string} cardLevels Level of cards
 * @property {number} overtimeSeconds Over time of the game in seconds
 * @property {string} players ugh, whats this ??
 * @property {boolean} sameDeck whether players have same deck or not.
 */

/**
 * @typedef {Object} Battle
 * @property {string} type The battle type
 * @property {string|null} challengeType The challenge type
 * @property {BattleMode} mode The battle mode
 * @property {number|null} winCountBefore Win counts before this game
 * @property {number} utcTime The time this game started
 * @property {string} deckType Type of the deck
 * @property {number} teamSize Size of the team
 * @property {number} winner Winner of the battle
 * @property {number} teamCrowns The crown team scored
 * @property {number} opponentCrowns The crown opponent scored
 * @property {Object[]} team The players in the team
 * @property {Object[]} opponent The players in opponent team
 * @property {Object} arena The arena in which this battle was held
 */

/**
 * The player's battle data
 * @since 3.0.0
 * @extends {Base}
 */
class PlayerBattles extends Base {

    constructor(data) {
        super();

        /**
         * The battles of this player
         * @type {Battle[]}
         * @since 3.0.0
         */
        this.battles = data;
    }

}

module.exports = PlayerBattles;

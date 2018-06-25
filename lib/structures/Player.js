const Base = require('./Base');
const Card = require('./Card');

/**
 * The player data.
 * @since 3.0.0
 * @extends {Base}
 */
class Player extends Base {

    constructor(data) {
        super();

        this.patch(data);
    }

    patch(data) {
        if (data.tag) {
            /**
			 * This player's tag.
			 * @since 3.0.0
			 * @type {string}
			 */
            this.tag = data.tag;
        }

        if (data.name) {
            /**
			 * This player's name
			 * @since 3.0.0
			 * @type {string}
			 */
            this.name = data.name;
        }

        if (data.trophies) {
            /**
			 * This player's trophies
			 * @since 3.0.0
			 * @type {number}
			 */
            this.trophies = data.trophies;
        }

        if (data.rank) {
            /**
			 * This player's rank
			 * @since 3.0.0
			 * @type {number|null}
			 */
            this.rank = data.rank;
        }

        if (data.clan) {
            /**
			 * @typedef {Object} PlayerClanData
			 * @property {string} tag The player's clan tag.
			 * @property {string} name The player's clan name.
			 * @property {string} role The player's role in the clan.
			 * @property {number} donations The player's donation in the clan.
			 * @property {URL} badge The player's clan URL.
			 */

            /**
			  * This player's clan.
			  * @since 3.0.0
			  * @type {PlayerClanData}
			  */
            this.clan = {
                tag: data.clan.tag,
                name: data.clan.name,
                role: data.clan.role,
                donations: data.clan.donations,
                badge: data.clan.badge.image
            };
        }

        if (data.arena) {
            /**
			 * @typedef {Object} PlayerArena
			 * @property {string} name The player's arena name.
			 * @property {string} arena The player's current arena.
			 */

            /**
			 * This player's arena.
			 * @since 3.0.0
			 * @type {PlayerArena}
			 */
            this.arena = {
                name: data.arena.name,
                arena: data.arena.arena
            };
        }

        if (data.stats) {
            /**
			 * @typedef {Object} PlayerStats
			 * @property {number} clanCardsCollected Amount of clan cards this player has collected.
			 * @property {number} tournamentCardsWon Amount of tournament cards this player has won.
			 * @property {number} maxTrophies Max trophies this player has ever reached.
			 * @property {number} threeCrownWins Three crown wins of this player.
			 * @property {number} cardsFound Total cards found by this user.
			 * @property {Card} favoriteCard Favorite card of this uers.
			 * @property {number} totalDonations Total donations of this user.
			 * @property {number} challengeMaxWins Max wins this player has achieved in a challenge.
			 * @property {number} level Current level of this user.
			 */

            /**
			 * This player's stats
			 * @since 3.0.0
			 * @type {PlayerStats}
			 */
            this.stats = {
                clanCardsCollected: data.stats.clanCardsCollected,
                tournamentCardsWon: data.stats.tournamentCardsWon,
                maxTrophies: data.stats.maxTrophies,
                threeCrownWins: data.stats.threeCrownWins,
                cardsFound: data.stats.cardsFound,
                favoriteCard: new Card(data.stats.favoriteCard),
                totalDonations: data.stats.totalDonations,
                challengeMaxWins: data.stats.challengeMaxWins,
                challengeCardsWon: data.stats.challengeCardsWon,
                level: data.stats.level
            };
        }

        if (data.games) {
            /**
			 * @typedef {Object} PlayerGames
			 * @property {number} total Total games this player has played.
			 * @property {number} tournamentGames Total tournaments this player has played.
			 * @property {number} wins Total wins this player has achieved.
			 * @property {number} warDayWins Total wins this player has achieved in clan war day.
			 * @property {number} winsPercent Win percent of this player.
			 * @property {number} losses Total losses this player has faced.
			 * @property {number} lossesPercent Loss percent of this player.
			 * @property {number} draws Total draws this player has faced.
			 * @property {number} drawsPercent Draw percent of this player.
			 */

            /**
			 * This player's games
			 * @since 3.0.0
			 * @type {PlayerGames}
			 */
            this.games = data.games;
        }

        if (data.leagueStatistics) {
            /**
			 * @typedef {Object} CurrentLeagueSeason
			 * @property {number} trophies Current tophy count of this player in this season.
			 * @property {number} bestTrophies Best trophy count this player has achieved in the current season.
			 * @memberOf Player
			 */

            /**
			 * @typedef {Object} PreviousLeagueSeason
			 * @property {string} id Season ID.
			 * @property {number} trophies Current tophy count of this player in this season.
			 * @property {number} bestTrophies Best trophy count this player has achieved in the current season.
			 * @memberOf Player
			 */

            /**
			 * @typedef {Object} BestLeagueSeason
			 * @property {string} id Season ID.
			 * @property {number} trophies Player's trophies in the season.
			 * @memberOf Player
			 */

            /**
			 * @typedef {Object} PlayerLeagueSeasons
			 * @property {CurrentLeagueSeason} currentSeason Player's current season.
			 * @property {PreviousLeagueSeason} previousSeason Player's previous season.
			 * @property {BestLeagueSeason} bestSeason Player's best season.
			 */

            /**
			 * This player's leageue statistics
			 * @since 3.0.0
			 * @type {PlayerLeagueSeasons}
			 */
            this.leagueStatistics = data.leagueStatistics;
        }

        if (data.deckLink) {
            /**
			 * This player's deck link
			 * @since 3.0.0
			 * @type {URL}
			 */
            this.deckLink = data.deckLink;
        }

        if (data.currentDeck) {
            /**
			 * This player's current deck
			 * @since 3.0.0
			 * @type {Card[]}
			 */
            this.currentDeck = data.currentDeck;
        }

        if (data.cards) {
            /**
			 * This player's cards.
			 * @since 3.0.0
			 * @type {Card[]}
			 */
            this.cards = data.cards;
        }

        if (data.achievements) {
            /**
			 * This player's achievements
			 * @since 3.0.0
			 * @type {Object[]}
			 */
            this.achievements = data.achievements;
        }
    }

}

module.exports = Player;

const Card = require('./card');

/**
 * The Clash Royale Player
 */
class Player {

    constructor(rawPlayer) {
        this._patch(rawPlayer);
    }

    _patch(data) {
        if (data.name) {
            /**
             * This player's name
             * @type {string}
             */
            this.name = data.name;
        }

        if (data.tag) {
            /**
             * This player's tag
             * @type {string}
             */
            this.tag = data.tag;
        }

        if (data.trophies) {
            /**
             * This player's trophies
             * @type {number}
             */
            this.trophies = data.trophies;
        }

        if (data.rank) {
            /**
             * This player's rank
             * @type {number}
             */
            this.rank = data.rank;
        }

        if (data.clan) {
            /**
             * This player's clan Name
             * @type {string}
             */
            this.clanName = data.clan.name;

            /**
             * This player's clan tag
             * @type {tag}
             */
            this.clanTag = data.clan.tag;

            /**
             * This player's clan role
             * @type {string}
             */
            this.clanRole = data.clan.role;

            /**
             * This player's clan badge
             * @type {URL}
             */
            this.clanBadge = data.clan.badge.image;
        }

        if (data.stats) {
            /**
            * This player's tournament cards won
            * @type {number}
            */
            this.tournamentCardsWon = data.stats.tournamentCardsWon;

            /**
            * This player's max trophies
            * @type {number}
            */
            this.maxTrophies = data.stats.maxTrophies;

            /**
            * This player's three crown wins
            * @type {number}
            */
            this.threeCrownWins = data.stats.threeCrownWins;

            /**
            * This player's cards found
            * @type {number}
            */
            this.cardsFound = data.stats.cardsFound;

            /**
            * This player's favourite card
            * @type {Card}
            */
            this.favouriteCard = new Card(data.stats.favoriteCard);

            /**
            * This player's total donation
            * @type {number}
            */
            this.totalDonations = data.stats.totalDonations;

            /**
            * This player's challenge Max Wins
            * @type {number}
            */
            this.challengeMaxWins = data.stats.challengeMaxWins;

            /**
            * This player's challenge Cards Won
            * @type {number}
            */
            this.challengeCardsWon = data.stats.challengeCardsWon;

            /**
            * This player's level
            * @type {number}
            */
            this.level = data.stats.level;
        }

        if (data.games) {
            /**
             * This player's total games played
             * @type {number}
             */
            this.totalGames = data.games.total;

            /**
             * This player's tournament Games
             * @type {number}
             */
            this.tournamentGames = data.games.tournamentGames;

            /**
             * This player's game wins
             * @type {number}
             */
            this.wins = data.games.wins;

            /**
             * This player's wins Percent
             * @type {number}
             */
            this.winsPercent = data.games.winsPercent;

            /**
             * This player's game losses
             * @type {number}
             */
            this.losses = data.games.losses;

            /**
             * This player's losses Percent
             * @type {number}
             */
            this.lossesPercent = data.games.lossesPercent;

            /**
             * This player's game draws
             * @type {number}
             */
            this.draws = data.games.draws;

            /**
             * This player's draws Percent
             * @type {number}
             */
            this.drawsPercent = data.games.drawsPercent;
        }

        if (data.chestCycle) {
            /**
             * This player's upcoming chests
             * @type {Array<string>}
             */
            this.upcomingChests = data.chestCycle.upcoming;

            /**
             * This player's special chests
             * @type {object}
             * @property {number} [superMagical] after how many chests is superMagical chest coming.
             * @property {number} [magical] after how many chests is magical chest coming.
             * @property {number} [legendary] after how many chests is legendary chest coming.
             * @property {number} [epic] after how many chests is epic chest coming.
             * @property {number} [giant] after how many chests is giant chest coming.
             */
            this.specialChests = {
                superMagical: data.chestCycle.superMagical,
                magical: data.chestCycle.magical,
                legendary: data.chestCycle.legendary,
                epic: data.chestCycle.epic,
                giant: data.chestCycle.giant
            };
        }

        if (data.leagueStatistics) {
            /**
             * This player's league statistics
             * @type {object}
             */
            this.leagueStatistics = data.leagueStatistics;
        }

        if (data.deckLink) {
            /**
             * This player's current deck link
             * @type {URL}
             */
            this.deckLink = data.deckLink;
        }

        if (data.currentDeck) {
            /**
             * This player's current deck
             * @type {Array<object>}
             */
            this.currentDeck = data.currentDeck.map(card => new Card(card));
        }

        if (data.cards) {
            /**
             * This player's all card
             * @type {Array<Card>}
             */
            this.cards = data.cards.map(card => new Card(card));
        }

        if (data.battles) {
            /**
             * This player's last few battls
             * @type {object}
             */
            this.battles = data.battles;
        }
    }

}

module.exports = Player;

const Base = require('./Base');

class Player extends Base {
	
	constructor(data) {
		super();
		
		this.patch(data);
	}
	
	patch(data) {
		if (data.tag) {
			this.tag = data.tag;
		}
		
		if (data.name) {
			this.name = data.name;
		}
		
		if (data.trophies) {
			this.trophies = data.trophies;
		}
		
		if (data.rank) {
			this.rank = data.rank;
		}
		
		if (data.clan) {
			this.clan = {
				tag: data.clan.tag,
				name: data.clan.name,
				role: data.clan.role,
				donations: data.clan.donations,
				badge: data.clan.badge.image
			}
		}
		
		if (data.arena) {
			this.arena = {
				name: data.arena.name,
				arena: data.arena.arena
			}
		}
		
		if (data.stats) {
			this.stats = data.stats;
		}
		
		if (data.games) {
			this.games = data.games;
		}
		
		if (data.leagueStatistics) {
			this.leagueStatistics = data.leagueStatistics;
		}
		
		if (data.deckLink) {
			this.deckLink = data.deckLink;
		}
		
		if (data.currentDeck) {
			this.currentDeck = data.currentDeck;
		}
		
		if (data.cards) {
			this.cards = data.cards;
		}
		
		if (data.achievements) {
			this.achievements = data.achievements;
		}
	}
}

module.exports = Player;

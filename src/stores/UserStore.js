const Store = require('./Store');
const Util = require('../util/Util');
const Player = require('../structures/Player');
const PlayerBattles = require('../structures/PlayerBattles');
const PlayerChests = require('../structures/PlayerChests');

class UserStore extends Store {
	
	constructor(client) {
		super(client);
		
		this.battles = new Map();
		
		this.chests = new Map();
	}
	
	async getProfile(tag, options) {
		const verifiedTag = Util.verifyTag(tag);
		
		const existing = this.get(verifiedTag);
		if (existing && Date.now() < existing._cacheTime) return existing;

		const _rawData = await this.client.Api.getUserProfile(verifiedTag, options);		
		return this.set(verifiedTag, new Player(_rawData)).get(verifiedTag);
	}
	
	async getBattles(tag) {
		const verifiedTag = Util.verifyTag(tag);
		
		const existing = this.battles.get(verifiedTag);
		if (existing && Date.now() < existing._cacheTime) return existing;
		
		const _rawData = await this.client.Api.getUserBattles(verifiedTag);
		return this.battles.set(verifiedTag, new PlayerBattles(_rawData)).get(verifiedTag);
	}
	
	async getChests(tag) {
		const verifiedTag = Util.verifyTag(tag);
		
		const existing = this.chests.get(verifiedTag);
		if (existing && Date.now() < existing._cacheTime) return existing;
		
		const _rawData = await this.client.Api.getUserChests(verifiedTag);
		return this.chests.set(verifiedTag, new PlayerChests(_rawData)).get(verifiedTag);
	}
	
	async getTopUsers(tag) {
		const verifiedTag = Util.verifiedTag(tag);

		const _rawData = await this.client.Api.getTopUsers(verifiedTag);
		return _rawData.map(_single => new Player(_single));
	}
	
	async getPopularUsers() {
		const verifiedTag = Util.verifiedTag(tag);
		
		const _rawData = await this.client.Api.getPopularUsers(verifiedTag);
		return _rawData.map(_single => new Player(_single));
	}
}

module.exports = UserStore;
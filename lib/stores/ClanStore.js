const Store = require('./Store');
const Util = require('../util/Util');
const Clan = require('../structures/Clan');

class ClanStore extends Store {

	constructor(client) {
		super(client);
		
		this.battles = new Map();
		
		this.war = new Map();
		
		this.warLog = new Map();
		
		this.history = new Map();
		
		this.weeklyHistory = new Map();		
	}
	
	async getData(tag, options) {
		const verifiedTag = Util.verifyTag(tag);
		
		const existing = this.get(verifiedTag);
		if (existing && Date.now() < existing._cacheTime) return existing;

		const _rawData = await this.client.Api.getClanData(verifiedTag, options);		
		return this.set(verifiedTag, new Clan(_rawData)).get(verifiedTag);
	}
	
	async getBattles(tag) {
		const verifiedTag = Util.verifyTag(tag);
		
		const existing = this.battles.get(verifiedTag);
		if (existing && Date.now() < existing._cacheTime) return existing;

		const _rawData = await this.client.Api.getClanBattles(verifiedTag);		
		return this.battles.set(verifiedTag, _rawData).get(verifiedTag);
	}
	
	async getWarData(tag) {
		const verifiedTag = Util.verifyTag(tag);
		
		const existing = this.war.get(verifiedTag);
		if (existing && Date.now() < existing._cacheTime) return existing;

		const _rawData = await this.client.Api.getClanWar(verifiedTag);		
		return this.war.set(verifiedTag, _rawData).get(verifiedTag);
	}
	
	async getWarLogs(tag) {
		const verifiedTag = Util.verifyTag(tag);
		
		const existing = this.warLog.get(verifiedTag);
		if (existing && Date.now() < existing._cacheTime) return existing;

		const _rawData = await this.client.Api.getClanWarLog(verifiedTag);		
		return this.warLog.set(verifiedTag, _rawData).get(verifiedTag);
	}
	
	async getWarHistory(tag) {
		const verifiedTag = Util.verifyTag(tag);
		
		const existing = this.history.get(verifiedTag);
		if (existing && Date.now() < existing._cacheTime) return existing;

		const _rawData = await this.client.Api.getClanHistory(verifiedTag);		
		return this.history.set(verifiedTag, _rawData).get(verifiedTag);
	}
	
	async getWeeklyHistory(tag) {
		const verifiedTag = Util.verifyTag(tag);
		
		const existing = this.weeklyHistory.get(verifiedTag);
		if (existing && Date.now() < existing._cacheTime) return existing;

		const _rawData = await this.client.Api.getClanWeeklyHistory(verifiedTag);		
		return this.weeklyHistory.set(verifiedTag, _rawData).get(verifiedTag);
	}
	
	async getTracking(tag) {
		const verifiedTag = Util.verifyTag(tag);

		return await this.client.Api.getClanTracking(verifiedTag);	
	}
	
	async getTopClans(tag) {
		const verifiedTag = Util.verifiedTag(tag);

		const _rawData = await this.client.Api.getTopClans(verifiedTag);
		return _rawData.map(_single => new Clan(_single));
	}
	
	async getPopularClans() {
		const verifiedTag = Util.verifiedTag(tag);
		
		const _rawData = await this.client.Api.getPopularClans(verifiedTag);
		return _rawData.map(_single => new Clan(_single));
	}

}

module.exports = ClanStore;
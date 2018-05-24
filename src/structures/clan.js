const ClanMember = require('./clanMember.js');

/**
 * The Clash Royale clan
 */
class Clan {

    constructor(rawClan) {
        this._patch(rawClan);
    }

    _patch(data) {
        if (data.tag) {
            /**
			 * This clan's tag
			 * @type {string}
			 */
            this.tag = data.tag;
        }

        if (data.name) {
            /**
			 * This clan's name
			 * @type {string}
			 */
            this.name = data.name;
        }

        if (data.description) {
            /**
			 * This clan's description
			 * @type {string}
			 */
            this.description = data.description;
        }

        if (data.type) {
            /**
			 * This clan's type
			 * @type {string}
			 */
            this.type = data.type;
        }

        if (data.score) {
            /**
			 * This clan's score
			 * @type {number}
			 */
            this.score = data.score;
        }

        if (data.memberCount) {
            /**
			 * This clan's member count.
			 * @type {number}
			 */
            this.memberCount = data.memberCount;
        }

        if (data.requiredScore) {
            /**
			 * This clan's required score for a new member to join.
			 * @type {number}
			 */
            this.requiredScore = data.requiredScore;
        }

        if (data.donations) {
            /**
			 * This clan's weekly donations.
			 * @type {number}
			 */
            this.donations = data.donations;
        }

        if (data.badge) {
            /**
			 * This clan's badge.
			 * @type {URL}
			 */
            this.badge = data.badge.image;
        }

        if (data.location) {
            /**
			 * @typedef {Object} location
			 * @property {string} [name] The name of the location.
			 * @property {boolean} [isCountry] Whether the location is country or not.
			 * @property {string} [code] The code of the location.
			 */

            /**
			 * This clan's location.
			 * @type {location}
			 */
            this.location = data.location;
        }

        if (data.members) {
            /**
			 * This clan's leader.
			 * @type {ClanMember}
			 */
            this.leader = new ClanMember(data.members.filter(mem => mem.role.toLowerCase() === 'leader')[0]);

            /**
			 * This is the list of all the clan's members.
			 * @type {Array<ClanMember>}
			 */
            this.members = data.members.map(mem => new ClanMember(mem));
        }

        if (data.warState) {
            /**
			 * This is the clan's current war status.
			 * @type {Object}
			 */
            this.warState = data.warState;
        }

        if (data.warLog) {
            /**
			 * This is the clan's entire war history.
			 * @type {Array}
			 */
            this.warLog = data.warLog;
        }
    }

}

module.exports = Clan;

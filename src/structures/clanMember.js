/**
 * The Clash Royale Clan Member.
 */
class ClanMember {

    constructor(member) {
        /**
         * This member's name
         * @type {string}
         */
        this.name = member.name;

        /**
         * This member's tag
         * @type {string}
         */
        this.tag = member.tag;

        /**
         * This member's rank
         * @type {number}
         */
        this.rank = member.rank;

        /**
         * This member's role
         * @type {string}
         */
        this.role = member.role;

        /**
         * This member's level
         * @type {number}
         */
        this.level = member.expLevel;

        /**
         * This member's trophies
         * @type {number}
         */
        this.trophies = member.trophies;

        /**
         * This member's clanChest crowns
         * @type {number}
         */
        this.clanChestCrowns = member.clanChestCrowns;

        /**
         * This member's donations
         * @type {number}
         */
        this.donations = member.donations;
    }

}

module.exports = ClanMember;

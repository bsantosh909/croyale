const Base = require('./Base');

/**
 * The clan's data
 * @since 3.0.0
 * @extends {Base}
 */
class Clan extends Base {

    constructor(data) {
        super();

        this.patch(data);
    }

    patch(data) { // eslint-disable-line
        if (data.tag) {
            /**
			 * This clans's tag
			 * @type {string}
			 * @since 3.0.0
			 */
            this.tag = data.tag;
        }

        if (data.name) {
            /**
			 * This clan's name
			 * @type {string}
			 * @since 3.0.0
			 */
            this.name = data.name;
        }

        if (data.description) {
            /**
			 * This clan's description
			 * @type {string}
			 * @since 3.0.0
			 */
            this.description = data.description;
        }

        if (data.type) {
            /**
			 * This clan's type
			 * @type {string}
			 * @since 3.0.0
			 */
            this.type = data.type;
        }

        if (data.score) {
            /**
			 * This clan's score
			 * @type {number}
			 * @since 3.0.0
			 */
            this.score = data.score;
        }

        if (data.memberCount) {
            /**
			 * This clan's member count
			 * @type {number}
			 * @since 3.0.0
			 */
            this.memberCount = data.memberCount;
        }

        if (data.requiredScore) {
            /**
			 * Required score for a player to join this clan
			 * @type {number}
			 * @since 3.0.0
			 */
            this.requiredScore = data.requiredScore;
        }

        if (data.donations) {
            /**
			 * This clan's donation count.
			 * @type {numbeR}
			 * @since 3.0.0
			 */
            this.donations = data.donations;
        }

        if (data.clanChest) {
            this.clanChest = data.clanChest;
        }

        if (data.badge) {
            /**
			 * This clan's badge
			 * @type {URL}
			 * @since 3.0.0
			 */
            this.badge = data.badge.image;
        }

        if (data.location) {
            /**
			 * This clan's location
			 * @type {*}
			 * @since 3.0.0
			 */
            this.location = data.location;
        }

        if (data.tracking) {
            /**
			 * This clan's tracking information
			 * @type {*}
			 * @since 3.0.0
			 */
            this.tracking = data.tracking;
        }

        if (data.members) {
            /**
			 * This clan's members
			 * @type {*[]}
			 * @since 3.0.0
			 */
            this.members = data.members;
        }
    }

}

module.exports = Clan;

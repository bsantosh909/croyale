const Base = require('./Base');

/**
 * The player's chest data.
 * @since 3.0.0
 * @extends {Base}
 */
class PlayerChests extends Base {

    constructor(data) {
        super();

        this.patch(data);
    }

    patch(data) {
        /**
         * This player's upcoming chests.
         * @since 3.0.0
         * @type {string[]}
         */
        this.upcoming = data.upcoming;

        /**
         * This player's super magical chest position.
         * @since 3.0.0
         * @type {number}
         */
        this.superMagical = data.superMagical;

        /**
         * This player's magical chest position.
         * @since 3.0.0
         * @type {number}
         */
        this.magical = data.magical;

        /**
         * This player's legendary chest position.
         * @since 3.0.0
         * @type {number}
         */
        this.legendary = data.legendary;

        /**
         * This player's epic chest position.
         * @since 3.0.0
         * @type {number}
         */
        this.epic = data.epic;

        /**
         * This player's giant chest position.
         * @since 3.0.0
         * @type {number}
         */
        this.giant = data.giant;
    }

}

module.exports = PlayerChests;

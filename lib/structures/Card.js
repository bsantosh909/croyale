const Base = require('./Base');

/**
 * The card data.
 * @since 3.0.0
 * @extends {Base}
 */
class Card extends Base {

    constructor(data) {
        super();

        this.patch(data);
    }

    patch(data) {
        /**
		 * This card's name
		 * @since 3.0.0
		 * @type {number}
		 */
        this.name = data.name;

        /**
		 * This card's ID
		 * @since 3.0.0
		 * @type {string}
		 */
        this.id = data.id;

        /**
		 * This card's max level.
		 * @since 3.0.0
		 * @type {number}
		 */
        this.maxLevel = data.maxLevel;

        /**
		 * This card's icon URL
		 * @since 3.0.0
		 * @type {URL}
		 */
        this.icon = data.icon;

        /**
		 * This card's elixir cost
		 * @since 3.0.0
		 * @type {number}
		 */
        this.elixir = data.elixir;

        /**
		 * This card's type
		 * @since 3.0.0
		 * @type {string}
		 */
        this.type = data.type;

        /**
		 * This card's ratiry
		 * @since 3.0.0
		 * @type {string}
		 */
        this.rarity = data.rarity;

        /**
		 * The arena at which this card unlocks
		 * @since 3.0.0
		 * @type {number}
		 */
        this.arena = data.arena;

        /**
		 * This card's description
		 * @since 3.0.0
		 * @type {number}
		 */
        this.description = data.description;

        if (data.level) {
            /**
			 * This card's current level
			 * <info> Can be unavailable </info>
			 * @since 3.0.0
			 * @type {number}
			 */
            this.level = data.level;
        }

        if (data.count) {
            /**
			 * This card's count
			 * <info> Can be unavailable </info>
			 * @since 3.0.0
			 * @type {number}
			 */
            this.count = data.count;
        }

        if (data.requiredForUpgrade) {
            /**
			 * The total amount required for the card to upgrade.
			 * <info> Can be unavailable </info>
			 * @since 3.0.0
			 * @type {number}
			 */
            this.requiredForUpgrade = data.requiredForUpgrade;
        }

        if (data.leftToUpgrade) {
            /**
			 * Amount left for the card to upgrade.
			 * <info> Can be unavailable </info>
			 * @since 3.0.0
			 * @type {number}
			 */
            this.leftToUpgrade = data.leftToUpgrade;
        }
    }

}

module.exports = Card;

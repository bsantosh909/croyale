/**
 * A Clash Royale card.
 */
class Card {

    constructor(cardRaw) {
        /**
         * This card's name
         * @type {string}
         */
        this.name = cardRaw.name;

        /**
         * This card's icon ULR
         * @type {URL}
         */
        this.icon = cardRaw.icon;

        /**
         * This card's key
         * @type {string}
         */
        this.key = cardRaw.key;

        /**
         * This card's rarity
         * @type {string}
         */
        this.rarity = cardRaw.rarity;

        /**
         * This card's description
         * @type {string}
         */
        this.description = cardRaw.description;

        /**
         * This card's id
         * @type {number}
         */
        this.id = cardRaw.id;

        if (cardRaw.level) {
            /**
             * This card's level
             * @type {number}
             */
            this.level = cardRaw.level;
        }

        if (cardRaw.count) {
            /**
             * This card's quantity
             * @type {number}
             */
            this.count = cardRaw.count;
        }

        if (cardRaw.leftToUpgrade) {
            /**
             * This card's quantity left to upgrade to next level
             * @type {number}
             */
            this.leftToUpgrade = cardRaw.leftToUpgrade;
        }
    }

}

module.exports = Card;

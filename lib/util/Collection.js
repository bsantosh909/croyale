/**
 * A map with additional utility methods. Used over arrays for significantly improved performances.
 * @extends {Map}
 * @private
 */
class Collection extends Map {

    /**
     * Obtains the first value in the collection.
     * @returns {*}
     * @private
     */
    first() {
        return this.values().next().value;
    }

    /**
     * Obtains the firs key in the collection.
     * @returns {*}
     * @private
     */
    firstKey() {
        return this.keys().next().value;
    }

    /**
     * Obtains the last value in the collection.
     * @returns {*}
     * @private
     */
    last() {
        const arr = [...this.values()];
        return arr[arr.length - 1];
    }

    /**
     * Obtains the last key in the collection.
     * @returns {*}
     * @private
     */
    lastKey() {
        const arr = [...this.keys()];
        return arr[arr.length - 1];
    }

}

module.exports = Collection;

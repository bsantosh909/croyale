/**
 * A map with additional utility methods. Used over arrays for significantly improved performances.
 * @extends {Map}
 */
class Collection extends Map {

    /**
     * Obtains the first value in the collection.
     * @returns {*}
     */
    first() {
        return this.values().next().value;
    }

    /**
     * Obtains the firs key in the collection.
     * @returns {*}
     */
    firstKey() {
        return this.keys().next().value;
    }

    /**
     * Obtains the last value in the collection.
     * @returns {*}
     */
    last() {
        const arr = [...this.values()];
        return arr[arr.length - 1];
    }

    /**
     * Obtains the last key in the collection.
     * @returns {*}
     */
    lastKey() {
        const arr = [...this.keys()];
        return arr[arr.length - 1];
    }

    /**
     * Obtains random entry from the collection.
     * @returns {*}
     */
    random() {
        const arr = [...this.values()];
        return arr[Math.floor(Math.random() * arr.length)];
    }

}

module.exports = Collection;

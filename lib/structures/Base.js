/**
 * The base class for all the structures.
 * @since 3.0.0
 * @private
 */
class BaseStructure {

    constructor() {
        /**
		 * The time until which the cache is valid.
		 * @since 3.0.0
		 * @type {number}
		 */
        this._cacheTime = Date.now() + 300000;
    }

}

module.exports = BaseStructure;

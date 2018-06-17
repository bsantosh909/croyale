const Collection = require('../util/Collection');

/**
 * The common base for all stores.
 * @see UserStore
 * @extends {Collection}
 * @private
 */
class Store extends Collection {

    constructor(client) {
        super();

        /**
		 * The client this store was created with.
		 * @since 3.0.0
		 * @name Store#client
		 * @type {Client}
		 * @readonly
		 */
        Object.defineProperty(this, 'client', { value: client });
    }

    /**
	 * The cache size for the caches.
	 * @since 3.0.0
	 * @type {number}
	 */
    get cacheSize() {
        return this.client.options.cacheSize;
    }

}

module.exports = Store;

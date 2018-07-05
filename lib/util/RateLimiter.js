class RateLimiter {

    constructor(limit = 5, window = 1000) {
        this.limit = limit;
        this.window = window;
        this.requests = [];
    }

    mkRequest() {
        const now = Date.now();
        const windowStart = now - this.window;
        this.requests = this.requests.filter(timestamp => timestamp > windowStart);

        if (this.requests.length > this.limit) {
            throw new Error(`Rate limit exceeded. Do not make more than ${this.limit} requests every ${this.window / 1000} seconds.`);
        }

        this.requests.push(now);
    }

}

module.exports = { RateLimiter };

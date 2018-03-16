/**
 * A clash royale tournament
 */
class Tournament {

    constructor(rawTournament) {
        /**
         * This tournament's tag
         * @type {string}
         */
        this.tag = rawTournament.tag;

        /**
         * This tournament's type
         * @type {string}
         */
        this.type = rawTournament.type;

        /**
         * This tournament's status
         * @type {string}
         */
        this.status = rawTournament.status;

        /**
         * This tournament's name
         * @type {string}
         */
        this.name = rawTournament.name;

        /**
         * This tournament's capacity
         * @type {number}
         */
        this.capacity = rawTournament.capacity;

        /**
         * This tournament's max capacity
         * @type {number}
         */
        this.maxCapacity = rawTournament.maxCapacity;

        /**
         * This tournament's preparation duration
         * @type {number}
         */
        this.preparationDuration = rawTournament.preparationDuration;

        /**
         * This tournament's duration
         * @type {number}
         */
        this.duration = rawTournament.duration;

        /**
         * This tournament's create time
         * @type {number}
         */
        this.createTime = rawTournament.createTime;

        /**
         * This tournament's start time
         * @type {number}
         */
        this.startTime = rawTournament.startTime;

        /**
         * This tournament's end time
         * @type {number}
         */
        this.endTime = rawTournament.endTime;

        if (rawTournament.playerCount) {
            /**
             * This tournament's player count
             * @type {number}
             */
            this.playerCount = rawTournament.playerCount;
        }

        if (rawTournament.creator) {
            /**
             * This tournament's creator's name
             * @type {string}
             */
            this.creatorName = rawTournament.creator.name;

            /**
             * This tournament's creator's tag
             * @type {string}
             */
            this.creatorTag = rawTournament.creator.tag;
        }

        if (rawTournament.members) {
            /**
             * This tournament's members
             * @type {object}
             */
            this.members = rawTournament.members;
        }
    }

}

module.exports = Tournament;

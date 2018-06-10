const Base = require('./Base');

class PlayerBattles extends Base {
	
	constructor(data) {
		super();
		
		this.battles = data;
	}
}

module.exports = PlayerBattles;

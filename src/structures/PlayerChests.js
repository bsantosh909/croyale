const Base = require('./Base');

class PlayerChests extends Base {
	
	constructor(data) {
		super();
		
		this.patch(data)
	}
	
	patch(data) {
		this.upcoming = data.upcoming;
		
		this.superMagical = data.superMagical;
		
		this.magical = data.magical;
		
		this.legendary = data.legendary;
		
		this.epic = data.epic;
		
		this.giant = data.giant;
	}
}

module.exports = PlayerChests;

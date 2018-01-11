const Royale = require('../index').Client;

const client = new Royale('My Token');

client.getPlayer('CVLQ2GV8', { exclude: ['battles', 'cards'] })
	.then(player => {
		console.log(player);
	});

const { Client } = require('../index');
const { key } = require('./key');

const client = new Client(key);

client.getPlayer('8QU0PCQ')
    .then(player => {
        console.log(player.tag);
        // logs CVLQ2GV8
        // ^ only if a valid key is provided in the client constructor!
    })
    .catch(err => console.log(err.message));

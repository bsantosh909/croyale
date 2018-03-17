const { Client, version } = require('../index');

const client = new Client('SECRET TOKEN HERE');

console.log(version);
// logs 2.2.1 as of now.

client.getPlayer('CVLQ2GV8')
    .then(player => {
        console.log(player.tag);
    })
    .catch(err => console.log(err));
// logs CVLQ2GV8

const { Client, version } = require('../index');

const client = new Client('161fe46296a6457d8f967ddd5def17dbd91f0a67143b43caa8d6a6e04048ff67');

console.log(version);
// logs 2.2.0 as of now.

client.getPlayer('CVLQ2GV8')
    .then(player => {
        console.log(player.tag);
    })
    .catch(err => console.log(err));
// logs CVLQ2GV8

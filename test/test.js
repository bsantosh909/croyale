const royale = require('../index').Client

const client = new royale(process.env.TOKEN);

client.getPlayer('CVLQ2GV8', {
    exclude: ['battles', 'cards']
}).then(player => {
    console.log(player);
})
const { Client } = require('../index');
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsImlkZW4iOiIxMDUwNzYzNTkxODg5Nzk3MTIiLCJtZCI6e30sImlhdCI6MTUyNTgyNzc5MH0.q5p1LrE7zrqtZaccXibDSx5bhnq-9S4DoM4vv0Atzd8';

const client = new Client(key);

client.getPlayer('CVLQ2GV8', {
    keys: ['name']
})
    .then(player => {
        console.log(`The Player's name is ${player.name}`);
    })
    .catch(error => console.log(error.message));

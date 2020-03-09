# ![Logo](https://cdn.discordapp.com/attachments/400874862073217027/460950350728396800/940349250_edc3d38a-e1ce-48e6-a738-10dc3339e79f.png)
_An easy to use Asynchronous wrapper to interact with [RoyaleAPI.com](https://docs.royaleapi.com)_

---

:warning: **IMPORTANT** :warning:

RoyaleAPI.com has been shutdown by its developers. Time to use the official clash royale API.

## Features
* Object Oriented
* User friendly
* Maximum coverage of the API
* Cache, Rate-limit and error handling
* Utility functions

## Installation
_node.js 8.0.0 or newer is required_

**Stable:** `npm install croyale`

**Master:** `npm install TheLearneer/croyale`
> master branch might contian some bugs, so if you are interested in bug free code then install stable, but if you are want to have the latest of the wrapper then install master branch.

## Example Usage
```javascript
const { Client } = require('croyale');
const client = new Client('super secret token');

client.Users.getProfile('CVLQ2GV8', { keys: ['tag', 'name'] })
	.then(player => {
		console.log(`Name of the player with tag ${player.tag} is ${player.name}`);
	})
	.catch(console.error);
```

## Credits
- The major credit for the existence of this wrapper goes to the developers of the api; SML and Selfish.
- In the meantime I would like to thank every individual person who have directly or indirectly helped me.

## Links
* [Documentation](https://thelearneer.github.io/croyale/)
* [CRoyale Discord server](https://discord.gg/6KvdGB3)
* [RoyaleAPI Discord server](http://discord.me/cr_api)
* [GitHub](https://github.com/TheLearneer/croyale)
* [NPM](https://www.npmjs.com/package/croyale)

## Contributing
Before creating an issue, please ensure that it hasn't already been reported/suggested, and double-check the
[documentation](https://thelearneer.github.io/croyale/).  
Make sure the changes you made aren't breaking things and are working fine if you'd like to submit a PR.

## Help
If you don't understand something in the documentation, you are experiencing problems, or you just need a gentle nudge in the right direction, please don't hesitate to join our official [Croyale Server](https://discord.gg/6KvdGB3).

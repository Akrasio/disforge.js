## Installation
```bash
npm i disforge.js
```

## how to use

```js
const Discord = require("discord.js");
const client = new Discord.Client(); 
const Disforge = require('disforge.js');
const api = new Disforge.Client("Your-Disforge-API-Key-Here");

// Posting manually...
api.postStats(client).then(result => {
    console.log(result)
});

// Posting every hour automatically :sunglasso:
api.autoPost(client).then(result => {
    console.log(result)
});

client.login("YourDiscordBotTokenIsHere");

// You can replace "servers_total_members" with one of the strings below for a specific option OR not provide a value to return an object of all data.
/*
"servers_total_members", "servers", "servers_total_members", "bots", "bots_total_servers", "bots_awaiting_approval", "registered_users", "last_updated"
*/
api.stats("servers_total_members").then(result => {
    console.log(result)
});
```

-> [disforge.com](https://disforge.com)

-> [disforge.js](https://npmjs.org/disforge.js)

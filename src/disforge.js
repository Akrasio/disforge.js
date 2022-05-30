const { endpoints } = require("./end")
const fetch = require("wumpfetch");
class Client {
    constructor(token) {
        this.KEY = token;
    };

    /**
     * 
     * @param { Object } Bot The Discord.js Client
     * @returns 
     */
    async postStats(bot) {
        let servercount;
        if (!this.KEY) throw new TypeError('API token not provided');
        if (typeof bot.user.id !== 'string') throw new TypeError('Bot ID must be a string');
        if (Number(bot.shard.count >= 2) && (Number(bot.shard.ids[0]) + 1) == Number(bot.shard.count)) {
            const promises = [
                bot.shard.fetchClientValues('guilds.cache.size')
            ];
            await Promise.all(promises)
                .then(results => {
                    const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
                    return servercount = Number(totalGuilds);
                })
                .catch(console.error);
        } else if (Number(bot.shard.count == 1)) servercount = Number(bot.guilds.cache.size);
        if (typeof servercount !== 'number') throw new TypeError('Server count must be a valid number');
        return fetch(`${endpoints.botStats}${bot.user.id}`, {
            method: 'POST',
            headers: {
                'Authorization': this.KEY,
            },
            data: {
                'servers': servercount,
            }
        }).send()
            .then(res => res.json())
    }
    /**
     * 
     * @param Client The Discord.js Client
     * @returns 
     */
    async autoPost(bot) {
        let servercount;
        if (!this.KEY) throw new TypeError('API token not provided');
        if (typeof bot.user.id !== 'string') throw new TypeError('Bot ID must be a string');
        setInterval(async (bot) => {
            if (Number(bot.shard.count >= 2) && (Number(bot.shard.ids[0]) + 1) == Number(bot.shard.count)) {
                const promises = [
                    bot.shard.fetchClientValues('guilds.cache.size')
                ];
                await Promise.all(promises)
                    .then(results => {
                        const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
                        return servercount = Number(totalGuilds);
                    })
                    .catch(console.error);
            } else if (Number(bot.shard.count == 1)) servercount = bot.guilds.cache.size;
            if (typeof servercount !== 'number') throw new TypeError('Server count must be a valid number');
            fetch(`${endpoints.botStats}${bot.user.id}`, {
                method: 'POST',
                headers: {
                    'Authorization': this.KEY,
                },
                data: {
                    'servers': servercount,
                }
            }).send()
                .then(res => res.json())
            return console.log("Attempted to post server count.")
        }, 3600000);
        if (Number(bot.shard.count >= 2) && (Number(bot.shard.ids[0]) + 1) == Number(bot.shard.count)) {
            return "Starting Autopost every hour (within an hour)";
        }
    }
    /**
     * @param string "servers_total_members", "servers", "servers_total_members", "bots", "bots_total_servers", "bots_awaiting_approval", "registered_users", "last_updated"
     * @returns Object | String | Number 
     */
    async stats(data) {
        return fetch(`${endpoints.stats}`, {
            method: 'GET'
        }).send()
            .then(res => res.json()).then(json => {
                return (json[0][data] || json[0])
            })
    }
}
module.exports = Client;
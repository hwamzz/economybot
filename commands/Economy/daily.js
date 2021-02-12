const { Client, Message, MessageEmbed } = require('discord.js');
const bal = require('./bal');

module.exports = {
    name: 'daily',
    usage: `e!daily`,
    aliases: `d`,
    description: `Claim coins every 24 hours!`,
    cooldown: 1000 * 60 * 60 * 24,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const coins = Math.floor(Math.random() * 2000) + 1;

        client.add(message.author.id, coins);
        message.channel.send(`You received **${coins}** coins today! Make sure to claim your daily tomorrow!`);
    }
}
const { Client, Message, MessageEmbed } = require('discord.js');
const bal = require('./bal');

module.exports = {
    name: 'weekly',
    usage: `e!weekly`,
    description: `Claim coins every week!`,
    cooldown: 1000 * 60 * 60 * 24 * 7,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const coins = Math.floor(Math.random() * 10000) + 1;
        const weeklyEmbed = new MessageEmbed()
        .setColor('#fff777')
        .setTitle('Weekly Coins!')
        .setDescription(`You received **${coins}** coins! Make sure to claim your coins every week!`)

        client.add(message.author.id, coins);
        message.channel.send(weeklyEmbed);
    }
}
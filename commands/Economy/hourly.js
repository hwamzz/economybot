const { Client, Message, MessageEmbed } = require('discord.js');
const bal = require('./bal');

module.exports = {
    name: 'hourly',
    usage: `e!hourly`,
    description: `Claim coins every hour!`,
    cooldown: 1000 * 60 * 60,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const coins = Math.floor(Math.random() * 200) + 1;
        const hourlyEmbed = new MessageEmbed()
        .setColor('#fff777')
        .setTitle('Hourly Coins!')
        .setDescription(`You received **${coins}** coins! Make sure to claim your coins every hour!`)

        client.add(message.author.id, coins);
        message.channel.send(hourlyEmbed);
    }
}
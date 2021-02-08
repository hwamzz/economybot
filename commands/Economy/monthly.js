const { Client, Message, MessageEmbed } = require('discord.js');
const bal = require('./bal');

module.exports = {
    name: 'monthly',
    usage: `e!monthly`,
    description: `Claim coins every month!`,
    cooldown: 1000 * 60 * 60 * 24 * 30,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const coins = Math.floor(Math.random() * 25000) + 1;
        const monthlyEmbed = new MessageEmbed()
        .setColor('#fff777')
        .setTitle('Monthly Coins!')
        .setDescription(`You received **${coins}** coins! Make sure to claim your coins every month!`)

        client.add(message.author.id, coins);
        message.channel.send(monthlyEmbed);
    }
}
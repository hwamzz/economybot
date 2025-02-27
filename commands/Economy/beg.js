const { Client, Message, MessageEmbed, Channel } = require('discord.js');

module.exports = {
    name: 'beg',
    usage: `e!beg`,
    description: `Beg for coins!`,
    cooldown: 1000 * 60 * 5,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const begs = ['Jeff Bezos', 'Elon Musk', 'Kermit']

        const begIndex = Math.floor(Math.random() * begs.length);
        const coins = Math.floor(Math.random() * 100) + 1;

        const member = message.mentions.members.first() || message.member;
        const bal = await client.purse(member.id);

        client.add(message.author.id, coins);
        message.channel.send(`**${begs[begIndex]}** gave you **${coins}** coins!`);
    }
}
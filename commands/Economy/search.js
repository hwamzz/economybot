const { Client, Message, MessageEmbed, Channel } = require('discord.js');

module.exports = {
    name: 'search',
    usage: `e!search`,
    description: `Search for coins!`,
    cooldown: 1000 * 60 * 5,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const search = ['bin', 'car', 'bed', 'fridge', 'shop', 'sewer', 'kettle', 'house']

        const searchIndex = Math.floor(Math.random() * search.length);
        const coins = Math.floor(Math.random() * 200) + 1;

        const member = message.mentions.members.first() || message.member;
        const bal = await client.purse(member.id);
        
        client.add(message.author.id, coins);
        message.channel.send(`Searching in the **${search[searchIndex]}** gave you **${coins}** coins!`);
    }
}
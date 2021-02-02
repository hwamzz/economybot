const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'bal',
    usage: `e!bal`,
    aliases: `b`,
    description: `Check your purse and bank balance!`,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const member = message.mentions.members.first() || message.member;

        const purse = await client.purse(member.id);
        var bank = await client.bank(member.id);

        if (bank === 'undefined') bank += 1000;

        const balanceEmbed = new MessageEmbed()
        .setColor('#fff777')
        .setTitle(`Balance info`)
        .setDescription(`You have ${purse} coins in your purse! \n You have ${bank} coins in your bank!`)

        message.channel.send(balanceEmbed);
    }
}
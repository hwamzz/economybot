const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'deposit',
    usage: 'e!deposit <amount>',
    description: `Deposit coins from your purse into your bank!`,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const member = message.member;
        if (!args[0]) return message.channel.send('Please include an amount to deposit')
        if (isNaN(args[0])) return message.channel.send('Amount to deposit must be a number!');
        const depositAmount = parseInt(args[0]);
        if(await client.purse(message.author.id) < depositAmount) return message.channel.send(`You don't have enough coins to make this deposit!`);

        client.rmv(member.id, parseInt(args[0]));
        client.addBank(member.id, parseInt(args[0]));

        message.channel.send(`**${depositAmount}** coins successfully deposited to your bank!`)
    }
}
const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'rps',
    usage: `e!rps <choice> <bet>`,
    description: `Play rock paper scissors against the bot!`,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const rps = ['r', 'p', 's']
        if (!args[0]) return message.channel.send('Please specify rock paper or scissors!')
        if(!args[1]) return message.channel.send('Please specifiy an amount to bet!')
        if(isNaN(args[1])) return message.channel.send('Bet must be a number!')

        const amountToBet = parseInt(args[1]);
        const choice = args[0].toLowerCase();

        if(!rps.includes(choice)) return message.channel.send('Please type r, p or s!')

        if(await client.purse(message.author.id) < amountToBet) return message.channel.send(`You don't have enough coins to make this bet!`)

        
    }

}
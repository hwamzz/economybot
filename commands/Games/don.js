const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'doubleornothing',
    aliases: ['don'],
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        if(!args[0]) return message.channel.send('Please specifiy an amount to bet!')

        if(isNaN(args[0])) return message.channel.send('Bet must be a number!')

        const amountToBet = parseInt(args[0]);

        if(await client.bal(message.author.id) < amountToBet) return message.channel.send(`You don't have enough coins to make this bet!`)

        function random() {
            const num = Math.floor(Math.random() * 2);
            return num === 1;
        }
        const winAmount = amountToBet * 2;

        const winEmbed = new MessageEmbed()
        .setColor('#00FF00')
        .setTitle('You won your bet!')
        .addFields(
           { name: 'You won: ', value: winAmount },
        )

        const lossEmbed = new MessageEmbed()
        .setColor('#FF0000')
        .setTitle('You lost your bet!')
        .addFields(
           { name: 'You lost: ', value: winAmount },
        )


        if(random() === true ) {
            message.channel.send(winEmbed)
            client.add(message.author.id, winAmount)
        } else {
            message.channel.send(lossEmbed)
            client.rmv(message.author.id, amountToBet)
        }
    }
}
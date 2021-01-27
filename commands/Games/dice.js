const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'dice',
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        if (!args[0]) return message.channel.send('Please specifiy an amount to bet!')

        if(isNaN(args[0])) return message.channel.send('Your bet must be a number!')

        const amountToBet = parseInt(args[0]);
        if(await client.bal(message.author.id) < amountToBet) return message.channel.send(`You don't have enough coins to make this bet!`)

        const name = message.author.username;
        const bet = args[0]
        const dice = ['1', '2', '3', '4', '5', '6']
        const multis = [2, 3, 4, 5, 6, 7, 8, 9, 10]
        const botRoll = Math.floor(Math.random() * dice.length);
        const playerRoll = Math.floor(Math.random() * dice.length);
        var multiplier = Math.floor(Math.random() * multis.length);
        if (multiplier === 0) multiplier += 2;
        const draw = bet / 2
        const winnings = bet * multiplier;

        const winEmbed = new MessageEmbed()
        .setColor('#00FF00')
        .setTitle('You won your bet!')
        .addFields(
           { name: 'You won: ', value: winnings },
           { name: name + ' Rolled: ', value: playerRoll, inline: true },
           { name: 'Economy Bot Rolled:', value: botRoll, inline: true }
        )
        .setFooter('Multiplier: ' + multiplier + ' x')

        const lossEmbed = new MessageEmbed()
        .setColor('#FF0000')
        .setTitle('You lost your bet!')
        .addFields(
           { name: 'You lost: ', value: bet },
           { name: name + ' Rolled: ', value: playerRoll, inline: true },
           { name: 'Economy Bot Rolled:', value: botRoll, inline: true }
        )

        const drawEmbed = new MessageEmbed()
        .setColor('#fff777')
        .setTitle('You rolled the same number!')
        .addFields(
            { name: 'You drew and lost: ', value: draw },
            { name: name + ' Rolled: ', value: playerRoll, inline: true },
            { name: 'Economy Bot Rolled:', value: botRoll, inline: true }
        )


        if (botRoll < playerRoll) {
            message.channel.send(winEmbed)
            client.add(message.author.id, winnings);
        } else if (botRoll > playerRoll) {
            message.channel.send(lossEmbed)
            client.rmv(message.author.id, bet)
        } else {
            message.channel.send(drawEmbed)
            client.rmv(message.author.id, draw)
        }
    }
}
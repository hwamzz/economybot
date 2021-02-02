const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'blackjack',
    usage: 'e!blackjack <bet>',
    aliases: 'bj',
    description: `Play blackjack against the dealer, don't go bust!`,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        if(!args[0]) return message.channel.send('Please specifiy an amount to bet!')

        if(isNaN(args[0])) return message.channel.send('Bet must be a number!')
        const bet = args[0];

        if(await client.bal(message.author.id) < bet) return message.channel.send(`You don't have enough coins to make this bet!`)

        const playerCards = [];

        // Draw 2 cards for player and show both, draw 1 card for dealer and show
        // display cards in embed made below
        // send embed
        // add reactions to message
        // if 1 reaction is clicked by user, draw another card
        // if the other is clicked, don't draw a card and draw the dealers' 2nd card
        // if dealer total is below 17, keep giving cards
        // if dealer is value above 21, double players' money
        // if player value is above 21, remove their bet
        
        const emojiID = '805124794289750077';
        const reactionEmoji = message.guild.emojis.cache.find(emoji => emoji.name === 'aS');
        const dealEmbed = new MessageEmbed()
        .setColor('#00FF00')
        .setTitle(`${message.member.displayName}'s blackjack game!`)
        .addFields(
            { name: 'React with ✅ to hit or ❌ to stand!', value: "\u200b" },
            { name: emojiID, value: 'testing' }
        )
        const sentMessage = await message.channel.send(dealEmbed)
        //console.log(reactionEmoji)
        await sentMessage.react("✅")
        await sentMessage.react("❌")
        
        message.awaitReactions((reaction, member) => member.id == message.author.id && (reaction.emoji.name == '✅' || reaction.emoji.name == '❌'),
        { max: 1, time: 45000 }).then(collected => {
            if (collected.first().emoji.name == '✅') {
                sentMessage.edit('Hit')
            } else {
                sentMessage.edit('Stand')
            }
        }).catch(() => {
            message.channel.send('No response within 45 seconds, game invalidated!')
        })
    }
}
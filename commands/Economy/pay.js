module.exports = {
    name: 'pay',
    usage: 'e!pay <@user> <amount>',
    description: 'Pay a user some of your coins!',
    run: async(client, message, args) => {
        const currentAmount = await client.purse(message.author.id)
        const transferAmount = args[1]
        const transferTarget = message.mentions.members.first() || args[0]

        if(!args[0] || !args[1]) return message.channel.send('Please include a user to send coins to and an amount to transfer (e!pay <@user> <amount>)')
        if(isNaN(transferAmount)) return message.channel.send('The transfer amount must be a number!')
        if(transferAmount > currentAmount) return message.channel.send(`You don't have enough coins to complete this transaction!`)

        await client.add(message.author.id, -transferAmount)
        await client.add(transferTarget.id, transferAmount)

        return message.channel.send(`Successfully transferred **${transferAmount}** coins. You have **${currentAmount}** coins remaining in your purse!`)
    }
}
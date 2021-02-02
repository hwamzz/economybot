const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'purge',
    usage: 'e!purge <amount>',
    description: 'Remove up to 99 messages at a time',
    run: async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('You do not have permission to use this command!')
        if(!args[0]) return message.channel.send('Please include amount of messages to purge!')
        if(isNaN(args[0])) return message.channel.send('Amount of messages to purge must be a number')
        if(parseInt(args[0]) > 99) return message.channel.send('The max amount of messages cannot exceed 99!')

            await message.channel.bulkDelete(parseInt(args[0]) + 1)
                .catch(err => console.log(err))
            message.channel.send(`Deleted ${args[0]} messages!`).then(m => m.delete({ timeout: 5000 }))
    }
}
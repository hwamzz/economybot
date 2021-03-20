const { Client, Message } = require('discord.js') 

module.exports = {
    name: 'nuke',
    usage: 'e!nuke',
    description: 'Delete a channel and remake it exactly how it was!',
    run: async(client, message, args) => {
        if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('No permission!')
        if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send('I do not have manage channels permission!')

        message.channel.clone().then((ch) => {
            ch.setParent(message.channel.parentID);
            ch.setPosition(message.channel.position);
            message.channel.delete();

            ch.send('This channel has been nuked!')
        })
    }
}
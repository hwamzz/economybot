const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'add',
    usage: 'e!add <coins> <@user>',
    aliases: 'a',
    description: `Add coins to a users' balance (ADMIN-ONLY command)`,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        if (!args[0]) return message.channel.send('Please include an amount to add!')
        if (!args[1]) return message.channel.send('Please mention the user you want to add balance to!')

        const member = message.mentions.members.first();
        if (!message.member.hasPermission(['ADMINISTRATOR'])) return message.channel.send('No permission to add balance!')
        client.add(member.id, parseInt(args[0]));

        message.channel.send('Added balance')
    }
}
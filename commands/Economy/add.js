const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'add',
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        if (!member.hasPermission['ADMINISTRATOR']) return message.channel.send('No permission to add balance!')

        const member = message.mentions.members.first() || message.member;

        client.add(member.id, parseInt(args[0]));

        message.channel.send('Added balance')
    }
}
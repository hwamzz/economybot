const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'remove',
    usage: `e!remove <@user> <coins>`,
    aliases: `r`,
    description: `Remove coins from a user (ADMIN-ONLY command)`,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const member = message.mentions.members.first() || message.member;
        if (!member.hasPermission(['ADMINISTRATOR'])) return message.channel.send('No permission to add balance!')
        client.rmv(member.id, parseInt(args[0]));

        message.channel.send('Removed balance')
    }
}
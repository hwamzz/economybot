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
        if (!args[0]) return message.channel.send('Please include an amount to remove!')
        if (isNaN(args[0])) return message.channel.send('Amount to remove must be a number!')
        if (!args[1]) return message.channel.send('Please mention a user!')

        const member = message.mentions.members.first() || message.member;
        if (!member.hasPermission(['ADMINISTRATOR'])) return message.channel.send('No permission to add balance!')
        const coins = parseInt(args[0])
        client.rmv(member.id, coins);

        message.channel.send(`Removed **${coins}** coins from **${member}**!`)
    }
}
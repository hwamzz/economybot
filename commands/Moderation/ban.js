const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ban',
    usage: 'e!ban <@user> [reason]',
    description: 'Ban a user from your server!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!args[0]) return message.channel.send('Please mention a user to ban!')
        if (!message.member.hasPermission(['BAN_MEMBERS'])) return message.channel.send('You do not have permission to ban users!')
        if (!message.guild.me.hasPermission(['BAN_MEMBERS'])) return message.channel.send('I do not have permission to ban users!')
        const target = message.mentions.members.first();
        const reason = args[1]

        const noEmbed = new MessageEmbed()
            .setColor('#FFF000')
            .setTitle('User banned')
            .setDescription(`${target.user.tag} successfully banned by ${message.author}!`)

        const reasonEmbed = new MessageEmbed()
            .setColor('#FFF000')
            .setTitle('User banned')
            .setDescription(`${target.user.tag} successfully banned by ${message.author} for ${reason}`)
        

        if (!reason) {
            await target.ban({ reason: 'Reason not provided!' })
            message.channel.send(noEmbed) 
        } else {
            await target.ban({ reason: args.slice(1).join(" ") })
            message.channel.send(reasonEmbed)
        }
    }
}

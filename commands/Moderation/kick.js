const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'kick',
    usage: 'e!kick <@user> [reason]',
    description: 'Kick a user from your server!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        if (!args[0]) return message.channel.send('Please mention a user to kick!')
        if (!message.member.hasPermission(['KICK_MEMBERS'])) return message.channel.send('You do not have permission to kick users!')
        if (!message.guild.me.hasPermission(['KICK_MEMBERS'])) return message.channel.send('I do not have permission to kick users!')
        const target = message.mentions.members.first();
        const reason = args[1]

        const noEmbed = new MessageEmbed()
            .setColor('#FFF000')
            .setTitle('User kicked')
            .setDescription(`${target.user.tag} successfully kicked by ${message.author}!`)

        const reasonEmbed = new MessageEmbed()
            .setColor('#FFF000')
            .setTitle('User kicked')
            .setDescription(`${target.user.tag} successfully kicked by ${message.author} for ${reason}`)
        

        if (!reason) {
            await target.kick({ reason: 'Reason not provided!' })
            message.channel.send(noEmbed) 
        } else {
            await target.kick({ reason: args.slice(1).join(" ") })
            message.channel.send(reasonEmbed)
        }
    }
}
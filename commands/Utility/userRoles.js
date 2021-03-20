const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'userroles',
    usage: 'e!userroles @<user>',
    description: 'Display all roles of a user!',
    run: async(client, message, args) => {
        const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

        if (!member) return message.reply('Please specify a member!');

        const memberRoles = member.roles.cache
          .filter((roles) => roles.id !== message.guild.id)
          .map((role) => role.toString());

        message.channel.send(
            new MessageEmbed()
              .setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
              .setDescription(`${member}'s roles => ${memberRoles}`)
              .setColor('RANDOM')
        )
    }
}
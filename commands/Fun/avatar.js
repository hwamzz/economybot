const { Client, Message, MessageAttachment, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'avatar',
    usage: 'e!avatar [@user]',
    description: 'Displays avatar of mentioned user or yourself!',
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const user = message.mentions.users.first() || message.author;
        const avatar = user.displayAvatarURL({ format: 'png', dynamic: true });
        const embed = new MessageEmbed()
            .setAuthor(user.tag)
            .setColor('Black')
            .setImage(avatar)
            .setTimestamp()
        message.channel.send(embed)
    }
}
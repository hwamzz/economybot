const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'invite',
    usage: 'e!invite',
    description: 'Get the invite link for the bot!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const invite = new MessageEmbed()
            .setColor('#7289da')
            .setTitle('Invite Link')
            .addFields(
                { name: '\u200b', value: "**Invite the bot [here](https://discord.com/api/oauth2/authorize?client_id=803701827031924738&permissions=8&scope=bot)**" }
            )
            .setFooter(`Requested by ${message.author.tag}`)

        message.channel.send(invite)
    }
}
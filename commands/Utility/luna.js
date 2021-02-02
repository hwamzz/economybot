const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'luna',
    usage: 'e!luna',
    description: 'idk dog',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const woof = new MessageEmbed()
            .setColor('#7289da')
            .setTitle('WOOF')
            .setImage('https://cdn.discordapp.com/attachments/797063321366167564/806105600110493736/125B55FC-0F39-47FA-BCBB-E52C421F7B39.jpeg')
            .setFooter(`Requested by ${message.author.tag}`)

        message.channel.send(woof)
    }
}
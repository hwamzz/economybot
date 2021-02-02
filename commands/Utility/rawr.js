const { Client, Message, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')

module.exports = {
    name: 'rawr',
    usage: 'e!rawr',
    description: 'Rawr',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json())


        const rawr = new MessageEmbed()
            .setColor('#7289da')
            .setTitle('RAWR')
            .setImage(file)
            .setFooter(`Requested by ${message.author.tag}`)

        message.channel.send(rawr)
    }
}
const { Client, Message, MessageEmbed } = require('discord.js');
const axios = require('axios');
module.exports = {
    name: 'docs',
    usage: 'e!docs <query>',
    description: 'Searches the discord JS documentation for your query!',
    /**
     * @param {Client} client
     * @param {Message} Message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const query = args.join(" ")
        if (!query) return message.reply('Please specify query!')
        const url = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(query)}`

        axios.get(url).then(({ data }) => {
            if (data) {
                message.channel.send({ embed: data })
            }
        })
    }
}
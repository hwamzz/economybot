/**const { Client, Message, MessageEmbed } = require('discord.js');
const prefixSchema = require('../../models/prefix')
const prefix = require('../../config.json').prefix
const {} = require('@reconlx/discord.js')

module.exports = {
    name: 'prefixreset',
    usage: 'e!prefixreset',
    description: 'Reset server prefix to the default one!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    /**run: async(client, message, args) => {
        await prefixSchema.findOneAndDelete({ Guild : message.guild.id })
        message.channel.send(`The prefix has been reset to ${prefix}`)
    }
}*/
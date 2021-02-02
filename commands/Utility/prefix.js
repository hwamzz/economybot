/**const { Client, Message, MessageEmbed } = require('discord.js');
const prefixSchema = require('../../models/prefix')

module.exports = {
    name: 'prefix',
    usage: 'e!prefix <prefix>',
    description: 'Change the prefix of your server!',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
/** run: async(client, message, args) => {
        const res = await args.join(" ")
        if(!res) return message.channel.send('Please specify a prefix to change to!')

        prefixSchema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if (err) throw err;
            if (data) {
                prefixSchema.findOneAndDelete({ Guild: message.guild.id })
                data = new prefixSchema({
                    Guild: message.guild.id,
                    Prefix: res
                })
                data.save()
                message.channel.send(`Your prefix has been updated to **${res}**!`)
            } else {
                data = new prefixSchema({
                    Guild: message.guild.id,
                    Prefix: res
                })
                data.save()
                message.channel.send(`Your prefix has been updated to **${res}**!`)
            }
        })
    }
}*/
const { Collection } = require('discord.js')
const client = require('../index.js')
const Timeout = new Collection();
const ms = require('ms');
const config = require('../config.json')
const prefix = config.prefix
//const prefixSchema = require('../models/prefix')

/**client.prefix = async function(message) {
    let custom;

    const data = await prefixSchema.findOne({ Guild: message.guild.id })
        .catch(err => console.log(err))
    
    if (data) {
        custom = data.Prefix;
    } else {
        custom = prefix;
    }
    return custom;
}*/


client.on('message', async message =>{
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0 ) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) {
        if(command.cooldown) {
            if(Timeout.has(`${command.name}${message.author.id}`)) return message.channel.send(`You are on a \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), {long : true})}\` cooldown.`)
            command.run(client, message, args)
            Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown)
            setTimeout(() => {
                Timeout.delete(`${command.name}${message.author.id}`)
            }, command.cooldown)
        } else command.run(client, message, args);
    }
});
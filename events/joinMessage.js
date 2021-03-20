const client = require('../index');
const { MessageEmbed } = require('discord.js')

client.on('guildCreate', (guild) => {
    let channelToSend;

    guild.channels.cache.forEach((channel) => {
        if (channel.type === "text" && !channelToSend && channel.permissionsFor(guild.me).has("SEND_MESSAGES")) channelToSend = channel;
    });

    if(!channelToSend) return;

    const welcome = new MessageEmbed()
        .setAuthor(guild.name, guild.iconURL({ dynamic: true }))
        .setTitle('Economy Bot has landed!')
        .setColor('BLUE')
        .setDescription(`Hello there, I'm Economy Bot and my prefix is e!, if you would like to view my commands list simply run e!help and if you need support feel free to join our support server with e!support where we will help you shortly!`)

    channelToSend.send(welcome)
})
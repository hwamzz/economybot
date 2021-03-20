const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'serverinfo',
    usage: 'e!serverinfo',
    description: 'Displays advanced information about a server!',
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const guild = message.guild;
        const embed = new MessageEmbed()
            .setTitle(message.guild.name)
            .setThumbnail(message.guild.iconURL())
            .setColor('RANDOM')
            .addField('General Info', 
            [
                `ID: ${guild.id}`,
                `Name: ${guild.name}`,
                `Owner: ${guild.owner}`
            ])
            .addField('Counts', 
            [
                `Roles: ${guild.roles.cache.size}`,
                `Total Channels: ${guild.channels.cache.size}`,
                `Members: ${guild.memberCount}`,
                `Emojis: ${guild.emojis.cache.size}`
            ])
            .addField('Additional Fields', 
            [
                `Created At: ${guild.createdAt}`,
                `Region: ${guild.region}`,
                `Nitro Tier: ${guild.premiumTier}`,
                `Nitro Boosts: ${guild.premiumSubscriptionCount}`

            ])

        message.channel.send(embed)
    }
}
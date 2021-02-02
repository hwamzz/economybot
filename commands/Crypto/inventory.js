const { Client, Message, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'inventory',
    usage: 'e!inventory',
    aliases: 'e!inv',
    description: 'View your cryptocurrency and other items!',
    run: async(client, message, args) => {
        const target = message.mentions.members.first() || message.author;
        const user = await members.findOne({ where: { _id: target.id } });
        const items = await user.getItems();

        const nothingEmbed = new MessageEmbed()
            .setColor('#00FF00')
            .setTitle(`${target.tag}'s inventory`)
            .setDescription('No items here, visit the shop or run e!buy to buy an item!')

        const inventoryEmbed = new MessageEmbed()
            .setColor('#2caf50')
            .setTitle(`${target.tag}'s inventory`)
            .addField(
                { name: `${target.tag} currently has`, value: `${items.map(i => `${i.amount} ${i.item.name}`).join(', ')}` });


        if (!items.length) return message.channel.send(nothingEmbed)
        return message.channel.send(inventoryEmbed)
    }
}
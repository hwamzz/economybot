const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'work',
    usage: `e!work`,
    aliases: `w`,
    description: `Work for a random amount of coins!`,
    cooldown: 1000 * 60 * 5,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const jobs = ['Developer', 'Builder', 'Waiter', 'Uber driver', 'Chef', 'Mechanic', 'Bedwars Player']

        const jobIndex = Math.floor(Math.random() * jobs.length);
        const coins = Math.floor(Math.random() * 250) + 1;

        const member = message.mentions.members.first() || message.member;
        client.add(message.author.id, coins);
        const bal = await client.purse(member.id);

        message.channel.send(`You worked as a **${jobs[jobIndex]}** and earned **${coins}** coins!`);
    }
}
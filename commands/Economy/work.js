const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'work',
    cooldown: 1000 * 60 * 5,
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async(client, message, args) => {
        const jobs = ['Developer', 'Builder', 'Waiter', 'Uber driver', 'Chef', 'Mechanic', 'Bedwars Player']

        const jobIndex = Math.floor(Math.random() * jobs.length);
        const coins = Math.floor(Math.random() * 200) + 1;

        const member = message.mentions.members.first() || message.member;
        client.add(message.author.id, coins);
        const bal = await client.bal(member.id);
        const workEmbed = new MessageEmbed()
            .setColor('#fff777')
            .setTitle('Worker!')
            .setDescription(`You worked as ${jobs[jobIndex]} and earned **${coins}** coins!`)
        message.channel.send(workEmbed);
    }
}
const { Client, Message, MessageEmbed, ReactionCollector } = require('discord.js');

module.exports = {
    name: 'consent-form',
    usage: 'e!consent-form',
    description: 'yes',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const embed = new MessageEmbed()
            .setColor('#7289da')
            .setTitle('Contract: Part 1')
            .setDescription('React with ✅ to agree or ❌ to disagree.')
            .addFields(
                { name: 'Section One: \n', value: 'The following are the terms of a binding contract between the dominant and the submissive. The fundamental purpose of this contract. Is to allow the submissive to explore her sensuality and her limits safely. The dominant and the submissive agree and acknowledge that all that occurs under the terms of this contract will be consensual, confidential and subject to the agreed limits and safety procedures set out in this contract. The submissive will agree to any sexual activity deemed fit and pleasurable by the dominant, accepting those activities, outlined in hard limits.' },
                { name: 'Section Two: \n', value: 'The submissive agrees to procure oral contraception from a physician of the dominant’s choosing. The submissive will not enter into sexual relations with anyone other than the dominant. The submissive will eat regularly, to maintain her health and well-being from a prescribed list of foods. The submissive will not drink to excess smoke or take recreational drugs. The submissive shall always conduct herself in a respectful manner to the dominant, and she’ll address him only as Sir, Mr. Grey, or such other title as a dominant may direct. The submissive may not touch the dominant without his expressed permission to do so.'},
                { name: 'Section Three: \n', value: 'The safe word yellow will be used to bring to the attention of the dominant that the submissive is close to her limit. When the safe word red is spoken the dominant’s actions will cease completely and immediately. Does the submissive agree to being restrained with hands bound in front? Does the submissive consent to being blindfolded? Does the submissive consent to being gagged? How much pain is the submissive willing to experience? ' }
            )
            .setFooter(`Requested by ${message.author.tag}`)

        const sent = await message.channel.send(embed)
        sent.react('✅')
        sent.react('❌')
    }
}
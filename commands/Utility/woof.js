const { Client, Message, MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const { toJSON } = require('../..');
const r2 = require('r2')

module.exports = {
    name: 'woof',
    usage: 'e!woof',
    description: 'Woof',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        const apiKey = 'c016b21c-3dce-4c3d-acf8-3199e10b9f74'
        const apiURL = 'https://api.thedogapi.com/'

        async function getImage(message) {
            try {
                var images = await loadImage(message.author.username)
                var image = images[0]
                var breed = image.breeds[0]

                message.channel.send( "***"+breed.name + "*** \r *"+breed.temperament+"*", { files: [ image.url ] } )


            } catch(err) {
                console.log(err)
            }
        }

        async function loadImage(sub_id) {
  var headers = {
      'X-API-KEY': apiKey,
  }
  var query_params = {
    'has_breeds':true, 
    'mime_types':'jpg,png', 
    'size':'small',   
    'sub_id': sub_id, 
    'limit' : 1       
  }
  let queryString = querystring.stringify(query_params);

  try {
    let _url = apiURL + `v1/images/search?${queryString}`;
    var response = await r2.get(_url , {headers} ).json
  } catch (e) {
      console.log(e)
  }
  return response;

}
    }
}

/**
 * const { file } = await fetch('https://dog.ceo/api/breeds/image/random').then(response => response.toJSON())

        const woof = new MessageEmbed()
            .setColor('#7289da')
            .setTitle('WOOF')
            .setImage(file)
            .setFooter(`Requested by ${message.author.tag}`)

        message.channel.send(woof)
 */
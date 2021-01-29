const { Collection, Client, Discord } = require('discord.js')
const fs = require('fs')
const client = new Client({
    disableEveryone: true
})
const money = require('./schemas/money')
const mongo = require('mongoose');
const cards = require('./schemas/cards')

mongo.connect("mongodb+srv://hwamzz:Hooded789@cluster0.ndh1e.mongodb.net/test", {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

const config = require('./config.json')
const prefix = config.prefix
const token = config.token
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
}); 

const Timeout = new Collection();
const ms = require('ms')
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

client.on('ready', () => {
    client.user.setActivity(`${prefix}help`)
    console.log(`${client.user.username} ✅`)
})

client.bal = (id) => new Promise(async ful => {
    const data = await money.findOne({ id });
    if(!data) return ful(0)
    ful(data.coins)
})

client.add = (id, coins) => {
    money.findOne({ id }, async(err, data) => {
        if(err) throw err;
        if(data) {
            data.coins += coins;
        } else {
            data = new money({ id, coins })
        }
        data.save();
    })
}
client.rmv = (id, coins) => {
    money.findOne({ id }, async(err, data) => {
        if(err) throw err;
        if(data) {
            data.coins -= coins;
        } else {
            data = new money({ id, coins: -coins  })
        }
        data.save();
    })
}

function seedCards() {
    const suits = ['HEARTS', 'DIAMONDS', 'CLUBS', 'SPADES']
    const cards = [
        {name: 'ACE', value: 1, alternative_value: 11}, 
        {name: '2', value: 2}, 
        {name: '3', value: 3}, 
        {name: '4', value: 4}, 
        {name: '5', value: 5}, 
        {name: '6', value: 6}, 
        {name: '7', value: 7},
        {name: '8', value: 8},
        {name: '9', value: 9},
        {name: '10', value: 10},
        {name: 'JACK', value: 10},
        {name: 'QUEEN', value: 10},
        {name: 'KING', value: 10}, 
    ]
    for (suit in suits) {
        console.log(suit)
    }
}

client.login(token)


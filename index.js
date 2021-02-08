const { Collection, Client, Discord } = require('discord.js')
const fs = require('fs')
const client = new Client({
    disableEveryone: true
})
const money = require('./models/money');
const crypto = require('./models/cr');
const mongo = require('mongoose');

mongo.connect("mongodb+srv://hwamzz:Hooded789@cluster0.ndh1e.mongodb.net/test", {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
const config = require('./config.json');
const cr = require('./models/cr');
const token = config.token
module.exports = client;
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
}); 

client.purse = (id) => new Promise(async ful => {
    const data = await money.findOne({ id });
    if(!data) return ful(0)
    ful(data.purse)
})

client.btc = (id) => new Promise(async ful => {
    const data = await cr.findOne({ id });
    if(!data) return ful(0)
    ful(data.btc)
})

client.ltc = (id) => new Promise(async ful => {
    const data = await cr.findOne({ id });
    if(!data) return ful(0)
    ful(data.ltc)
})

client.eth = (id) => new Promise(async ful => {
    const data = await cr.findOne({ id });
    if(!data) return ful(0)
    ful(data.eth)
})

client.bank = (id) => new Promise(async ful => {
    const data = await money.findOne({ id });
    if(!data) return ful(0)
    ful(data.bank)
})

client.profile = (id) => new Promise(async ful => {
    const data = await cr.findOne({ id });
    if(!data) return ful(0)
    ful(data.profile)
})


client.add = (id, purse, bank) => {
    money.findOne({ id }, async(err, data) => {
        if(err) throw err;
        if(data) {
            data.purse += purse;
        } else {
            data = new money({ id, purse, bank })
        }
        data.save();
    })
}
client.rmv = (id, purse, bank) => {
    money.findOne({ id }, async(err, data) => {
        if(err) throw err;
        if(data) {
            data.purse -= purse;
        } else {
            data = new money({ id, purse: -purse, bank  })
        }
        data.save();
    })
}

client.addBank = (id, bank) => {
    money.findOne({ id }, async(err, data) => {
        if(err) throw err;
        if(data) {
            data.bank += bank;
        } else {
            data = new money({ id, purse, bank })
        }
        data.save();
    })
}

client.addBTC = (id, btc) => {
    cr.findOne({ id }, async(err, data) => {
        if(err) throw err;
        if(data) {
            data.btc += btc;
        } else {
            data = new cr({ id, btc })
        }
        data.save();
    })
}

client.addLTC = (id, ltc) => {
    cr.findOne({ id }, async(err, data) => {
        if(err) throw err;
        if(data) {
            data.ltc += ltc;
        } else {
            data = new cr({ id, btc, ltc, eth })
        }
        data.save();
    })
}

client.addETH = (id, eth) => {
    cr.findOne({ id }, async(err, data) => {
        if(err) throw err;
        if(data) {
            data.eth += eth;
        } else {
            data = new cr({ id, btc, xrp, eth })
        }
        data.save();
    })
}



client.login(token)
// ready event
const client = require('../index.js')
const { getCommands } = require('./../utils/index')
const path = require('path')
const config = require('../config.json')
const prefix = config.prefix;

client.on('ready', () => {
    client.user.setActivity(`${prefix}help`)
    console.log(`${client.user.username} ✅`)

    const clientDetails = {
        guilds: client.guilds.cache.size,
        users: client.users.cache.size,
        channels: client.channels.cache.size
    }
    // express

    const express = require('express')
    const port = process.env.PORT || 3001;
    const app = express();

    app.set("view engine", "ejs");

    app.get("/", (req, res) => {
        res.status(200).sendFile(path.join(__dirname, "..", "pages", "landingPage.html"))
    })

    app.get("/commands", (req, res) => {
        const commands = getCommands();
        res.status(200).render('commands', { commands })
    })

    app.get("/info", (req, res) => {
        res.status(200).send(clientDetails);
    })

    app.listen(port)
})
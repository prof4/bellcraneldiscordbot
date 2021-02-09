const Discord = require('discord.js');
const { Client, MessageAttachment } = require('discord.js');
const bot = new Client();
const fs = require('fs');
bot.msgs = require("../spawn.json")
//bot.msgss = require("../cardown.json")
const { NONAME } = require('dns');
const { info, warn } = require('console');

module.exports = {
    name: 'claim',
    description: "this is a card claiming command!",
    execute(message) {
        let guild = message.guild.id
        //var cardspawner = '734389283632185345';
        let _message = bot.msgs[guild].message;
        if (_message == 'true'){
            editmessage = 'false'
            bot.msgs [guild] = {
                message: editmessage
            }
            fs.writeFile ("./spawn.json", JSON.stringify (bot.msgs, null, 4), err => {
                if (err) throw err;
                message.channel.send('Hey cool dude. You claimed the card.')
            });
        } else {
            message.channel.send('Weird.... ah i see. There are no cards to claim!!!')
        }
        
    }
}
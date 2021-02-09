const Discord = require('discord.js');
const { Client, MessageAttachment } = require('discord.js');
const bot = new Client();
const fs = require('fs');
bot.msgs = require("../spawn.json")
//bot.msgss = require("../cardown.json")
const { NONAME } = require('dns');
const { info, warn } = require('console');
var card_index = ['https://cdn.animesoul.com/images/cards/1/1611591896997.png', 'https://cdn.animesoul.com/images/cards/1/1611980519523.png', 'https://cdn.animesoul.com/images/cards/1/1612026788290.png', 'https://cdn.animesoul.com/images/cards/1/1612111752852.png', 'https://cdn.animesoul.com/images/cards/1/1612136313861.png', 'https://cdn.animesoul.com/images/cards/1/1612145891565.png', 'https://cdn.animesoul.com/images/cards/1/1612227524464.png', 'https://cdn.animesoul.com/images/cards/1/1612256003368.png', 'https://cdn.animesoul.com/images/cards/1/1612310983027.png', 'https://cdn.animesoul.com/images/cards/1/1612449225696.png', 'https://cdn.animesoul.com/images/cards/1/1612622235554.png', 'https://cdn.animesoul.com/images/cards/1/1612855277655.png', 'https://cdn.animesoul.com/images/cards/1/1611888291232.png', 'https://cdn.animesoul.com/images/cards/1/1611892015136.png', 'https://cdn.animesoul.com/images/cards/1/1611918993244.png', 'https://cdn.animesoul.com/images/cards/1/1611920501458.png', 'https://cdn.animesoul.com/images/cards/1/1611924257888.png', 'https://cdn.animesoul.com/images/cards/1/1611954863985.png', 'https://cdn.animesoul.com/images/cards/1/1611961282364.png', 'https://cdn.animesoul.com/images/cards/1/1611962908399.png', 'https://cdn.animesoul.com/images/cards/1/1611968152491.png', 'https://cdn.animesoul.com/images/cards/1/1611975038816.png', 'https://cdn.animesoul.com/images/cards/1/1611989637294.png', 'https://cdn.animesoul.com/images/cards/1/1611990400931.png'];//ben op pagina 3 pagina 2 is al af

module.exports = {
    name: 'spawncard',
    description: "this is a card spawning command!",
    execute(message) {
        let guild = message.guild.id
        //var cardspawner = '734389283632185345';

        if (message.member.roles.cache.some(role => role.name === "cardspawner") || message.member.hasPermission('MANAGE_MESSAGES')) {
            var cards = card_index[Math.floor(Math.random() * card_index.length)];
            const embed8 = new Discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle("What's this?")
                .setDescription("A wild anime card appears!")
                .setThumbnail(message.author.displayAvatarURL())
                //.attachFiles([`../soulcord complete/card imgs/${cards}`])
                //.setImage('attachment://'+cards)
                .setImage(cards)
                .setFooter("Type .claim to add this card to your collection");
            message.channel.send(embed8);
            
            editmessage = 'true'
            bot.msgs [guild] = {
                message: editmessage
            }
            fs.writeFile ("./spawn.json", JSON.stringify (bot.msgs, null, 4), err => {
                if (err) throw err;
            });
        } else {
            return message.channel.send('You do not have the permissions');
        }
    }
}
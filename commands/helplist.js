const Discord = require('discord.js');
const { Client, MessageAttachment } = require('discord.js');

const PREFIX = '-';

module.exports = {
    name: 'helplist',
    description: "this shows a list of help commands!",
    execute(message, args) {
        const embed3 = new Discord.MessageEmbed()
            .setTitle('help page')
            .setAuthor('Arata#6550', 'https://cdn.discordapp.com/avatars/725041335630954587/aa9af6bd4f2384f863f2d2afb12b1fbf.png')
            .addField('Fun', PREFIX + 'help fun', true)
            .addField('Moderation', PREFIX + 'help moderation', true)
            .addField('Utility', PREFIX + 'help utility', true)
            .addField('info', PREFIX + 'help info', true)
            .addField('Other', PREFIX + 'help other', true)
            .addField('Version', '0.0.1', true)
            .addField('current Server', message.guild.name, true)
            .setColor('#5DADE2')
            .setThumbnail(message.guild.iconURL())
            .setFooter('Subscribe to prof c4 on youtube.')
        message.channel.send(embed3);
    }
}
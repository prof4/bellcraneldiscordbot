module.exports = {
    name: 'profile',
    description: "shows your profile info",
    execute(message, args) {
        const embed = new Discord.MessageEmbed()
            .setTitle('User Information')
            .addField('Player name', message.author.username, true)
            .addField('Version', '0.0.1', true)
            .addField('current Server', message.guild.name, true)
            .setColor('#5DADE2')
            .setThumbnail(message.author.displayAvatarURL())
            .setFooter('Subscribe to prof c4 on youtube.')
        message.channel.send(embed);

    }
}
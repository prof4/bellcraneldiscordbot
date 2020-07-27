const Discord = require('discord.js');
const { Client, MessageAttachment } = require('discord.js');
const bot = new Client();

const PREFIX = '-';

const fs = require('fs');
const { NONAME } = require('dns');
const { info, warn } = require('console');

bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);

    bot.commands.set(command.name, command)
}
var version = '0.0.1'

var boss_man = '724640446982127666'
const start_currency = 0
bot.on('ready', () => {
    console.log('Soul bot is online');
    bot.user.setActivity('krunker.io gameplay', { type: "CUSTOM_STATUS", url: "https://www.youtube.com/watch?v=qTXpI-7ghp8" }).catch(console.error);
});

bot.on('guildMemberAdd', member => {

    const channel = member.guild.channels.cache.find(channel => channel.name === "🤗welcome🤗");
    if (!channel) return;

    channel.send(`Welcome to our server, ${member}, please read the rules in the rules channel`)
});

bot.on('message', message => {
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

    let args = message.content.slice(PREFIX.length).split(" ");
    switch (args[0]) {
        case 'youtube':
            bot.commands.get('youtube').execute(message, args);
            break;
        case 'info':
            bot.commands.get('info').execute(message, args);
            break;
        case 'purge':
            bot.commands.get('purge').execute(message, args);
            break;
        case 'profile':
            bot.commands.get('profile').execute(message, args);
            break;
        case 'helplist':
            if (args[1]) return;
            bot.commands.get('helplist').execute(message, args);
            
            break;
        case 'help':
            if (!args[1]) return message.channel.send('you must type helplist for all the help options');
            bot.commands.get('help').execute(message, args);
            break;

        case 'invite':
            message.channel.send('the link to invite the bot')
            message.channel.send('https://discord.com/api/oauth2/authorize?client_id=733189090463449209&permissions=8&scope=bot')
            message.channel.send('the link to official server: ')
            message.channel.send('https://discord.gg/jnNWeRH')

            break;
        case 'smug':
            bot.commands.get('smug').execute(message, args);
            break;
        case 'spawncard':
            bot.commands.get('spawncard').execute(message, args);
            break;
        case 'kick':
            bot.commands.get('kick').execute(message, args);
            break;
        case 'ban':
            bot.commands.get('ban').execute(message, args);
            break;
        case 'ping':
            //if (!message.member.roles.cache.has(boss_man)) return message.channel.send('You do not have the permissions');
            message.channel.send('pong!')
            break;
        case 'autorole':
            if (!args[1]) return message.channel.send('You need to specify a role');
            var server_basic_role = args[1];
            break;
        case 'work':
            break;


    }
});

//const token = 'NzMzMTg5MDkwNDYzNDQ5MjA5.XxKalQ.6QIu3WM53_FDV1qh1kf7RcsOi_c';//anime bot token from name : @bell cranel
//bot.login(token);

bot.login(process.env.token);

//${client.guilds.cache.size}
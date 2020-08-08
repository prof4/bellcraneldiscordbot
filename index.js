const Discord = require('discord.js');
const Canvas = require('canvas');
const { Client, MessageAttachment } = require('discord.js');
const bot = new Client();

const { Users, CurrencyShop } = require('./dbObjects');
const { Op } = require('sequelize');
const currency = new Discord.Collection();
const PREFIX = '-';

let channel = "🤗welcome🤗"
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
    bot.user.setActivity('krunker.io gameplay', { type: "STREAMING", url: "https://www.youtube.com/watch?v=qTXpI-7ghp8" }).catch(console.error);
});


const applyText = (canvas, text) => {
    const ctx = canvas.getContext('2d');

    // Declare a base size of the font
    let fontSize = 70;

    do {
        // Assign the font to the context and decrement it so it can be measured again
        ctx.font = `${fontSize -= 10}px sans-serif`;
        // Compare pixel width of the text to the canvas minus the approximate avatar size
    } while (ctx.measureText(text).width > canvas.width - 300);

    // Return the result to use in the actual canvas
    return ctx.font;
};

bot.on('guildMemberAdd', async member => {
    const channel = member.guild.channels.cache.find(channel => channel.name === '🤗welcome🤗');
    if (!channel) return;

    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext('2d');

    const background = await Canvas.loadImage('./wallpaper.jpg');
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#74037b';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Slightly smaller text placed above the member's display name
    ctx.font = '28px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Welcome to the server,', canvas.width / 2.5, canvas.height / 3.5);

    // Add an exclamation point here and below
    ctx.font = applyText(canvas, `${member.displayName}!`);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(`${member.displayName}!`, canvas.width / 2.5, canvas.height / 1.8);

    ctx.beginPath();
    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ format: 'jpg' }));
    ctx.drawImage(avatar, 25, 25, 200, 200);

    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png');

    channel.send(`Welcome to the server, ${member}!`, attachment);
});
bot.on('messageDelete', async message => {
    const channel = message.member.guild.channels.cache.find(channel => channel.name === 'audit-log');
    if (!channel) return;
    // ignore direct messages
    if (!message.guild) return;
    const fetchedLogs = await message.guild.fetchAuditLogs({
        limit: 1,
        type: 'MESSAGE_DELETE',
    });
    // Since we only have 1 audit log entry in this collection, we can simply grab the first one
    const deletionLog = fetchedLogs.entries.first();

    // Let's perform a coherence check here and make sure we got *something*
    if (!deletionLog) return console.log(`A message by ${message.author.tag} was deleted, but no relevant audit logs were found.`);

    // We now grab the user object of the person who deleted the message
    // Let us also grab the target of this action to double check things
    const { executor, target } = deletionLog;


    // And now we can update our output with a bit more information
    // We will also run a check to make sure the log we got was for the same author's message
    if (target.id === message.author.id) {
        channel.send(`A message by ${message.author.tag} was deleted by ${executor.tag}.`);
    } else {
        console.log(`A message by ${message.author.tag} was deleted, but we don't know by who.`);
    }
});

bot.on('guildMemberRemove', async member => {
    let channel = member.guild.channels.cache.find(channel => channel.name === 'audit-log');
    let leavechannel = member.guild.channels.cache.find(channel => channel.name === '😢leaves😢');
    if (!channel) return;
    const fetchedLogs = await member.guild.fetchAuditLogs({
        limit: 1,
        type: 'MEMBER_KICK',
    });
    // Since we only have 1 audit log entry in this collection, we can simply grab the first one
    const kickLog = fetchedLogs.entries.first();

    // Let's perform a coherence check here and make sure we got *something*
    if (!kickLog && leavechannel) {
        let channel = member.guild.channels.cache.find(ch => channel.name === '😢leaves😢');
        return channel.send(`${member.user.tag} left, pls come back soon.`);
    }

    // We now grab the user object of the person who kicked our member
    // Let us also grab the target of this action to double check things
    const { executor, target } = kickLog;

    // And now we can update our output with a bit more information
    // We will also run a check to make sure the log we got was for the same kicked member
    if (target.id === member.id) {
        let channel = member.guild.channels.cache.find(channel => channel.name === 'audit-log');
        channel.send(`${member.user.tag} left the guild; kicked by ${executor.tag}?`);
    } else {
        console.log(`${member.user.tag} left the guild, audit log fetch was inconclusive.`);
    }
});
client.on('guildBanAdd', async (guild, user) => {
    const channel = member.guild.channels.cache.find(channel => channel.name === 'audit-log');
    if (!channel) return;
    const fetchedLogs = await guild.fetchAuditLogs({
        limit: 1,
        type: 'MEMBER_BAN_ADD',
    });
    // Since we only have 1 audit log entry in this collection, we can simply grab the first one
    const banLog = fetchedLogs.entries.first();

    // Let's perform a coherence check here and make sure we got *something*
    if (!banLog) return console.log(`${user.tag} was banned from ${guild.name} but no audit log could be found.`);

    // We now grab the user object of the person who banned the user
    // Let us also grab the target of this action to double check things
    const { executor, target } = banLog;

    // And now we can update our output with a bit more information
    // We will also run a check to make sure the log we got was for the same kicked member
    if (target.id === user.id) {
        channel.send(`${user.tag} got hit with the swift hammer of justice in the guild ${guild.name}, wielded by the mighty ${executor.tag}`);
    } else {
        console.log(`${user.tag} got hit with the swift hammer of justice in the guild ${guild.name}, audit log fetch was inconclusive.`);
    }
});


Reflect.defineProperty(currency, 'add', {
	value: async function add(id, amount) {
		const user = currency.get(id);
		if (user) {
			user.balance += Number(amount);
			return user.save();
		}
		const newUser = await Users.create({ user_id: id, balance: amount });
		currency.set(id, newUser);
		return newUser;
	},
});
const storedBalances = await Users.findAll();
storedBalances.forEach(b => currency.set(b.user_id, b));

Reflect.defineProperty(currency, 'getBalance', {
	value: function getBalance(id) {
		const user = currency.get(id);
		return user ? user.balance : 0;
	},
});
bot.on('message', async message => {
    if (message.author.bot) return;
    currency.add(message.author.id, 1);

    if (!message.content.startsWith(PREFIX)) return;
    const input = message.content.slice(PREFIX.length).trim();
    if (!input.length) return;
    const [, command, commandArgs] = input.match(/(\w+)\s*([\s\S]*)/);

    if (command === 'balance') {
        const target = message.mentions.users.first() || message.author;
        return message.channel.send(`${target.tag} has ${currency.getBalance(target.id)}💰`);
    } else if (command === 'inventory') {
        const target = message.mentions.users.first() || message.author;
        const user = await Users.findOne({ where: { user_id: target.id } });
        const items = await user.getItems();

        if (!items.length) return message.channel.send(`${target.tag} has nothing!`);
        return message.channel.send(`${target.tag} currently has ${items.map(i => `${i.amount} ${i.item.name}`).join(', ')}`);
    } else if (command === 'transfer') {
        const currentAmount = currency.getBalance(message.author.id);
        const transferAmount = commandArgs.split(/ +/g).find(arg => !/<@!?\d+>/g.test(arg));
        const transferTarget = message.mentions.users.first();

        if (!transferAmount || isNaN(transferAmount)) return message.channel.send(`Sorry ${message.author}, that's an invalid amount.`);
        if (transferAmount > currentAmount) return message.channel.send(`Sorry ${message.author}, you only have ${currentAmount}.`);
        if (transferAmount <= 0) return message.channel.send(`Please enter an amount greater than zero, ${message.author}.`);

        currency.add(message.author.id, -transferAmount);
        currency.add(transferTarget.id, transferAmount);

        return message.channel.send(`Successfully transferred ${transferAmount}💰 to ${transferTarget.tag}. Your current balance is ${currency.getBalance(message.author.id)}💰`);
    } else if (command === 'buy') {
        const item = await CurrencyShop.findOne({ where: { name: { [Op.like]: commandArgs } } });
        if (!item) return message.channel.send(`That item doesn't exist.`);
        if (item.cost > currency.getBalance(message.author.id)) {
            return message.channel.send(`You currently have ${currency.getBalance(message.author.id)}, but the ${item.name} costs ${item.cost}!`);
        }

        const user = await Users.findOne({ where: { user_id: message.author.id } });
        currency.add(message.author.id, -item.cost);
        await user.addItem(item);

        message.channel.send(`You've bought: ${item.name}.`);
    } else if (command === 'shop') {
        const items = await CurrencyShop.findAll();
        return message.channel.send(items.map(item => `${item.name}: ${item.cost}💰`).join('\n'), { code: true });
    } else if (command === 'leaderboard') {
        return message.channel.send(
            currency.sort((a, b) => b.balance - a.balance)
                .filter(user => client.users.cache.has(user.user_id))
                .first(10)
                .map((user, position) => `(${position + 1}) ${(client.users.cache.get(user.user_id).tag)}: ${user.balance}💰`)
                .join('\n'),
            { code: true }
        );
    }
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
            message.channel.send('https://discord.com/oauth2/authorize?client_id=727844440604934244&permissions=8&scope=bot')
            message.channel.send('the link to official server: ')
            message.channel.send('https://discord.gg/XftsWZT')

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
        case 'welcome':
            if (message.member.hasPermission('MANAGE_SERVER') || message.member.hasPermission('MANAGE_CHANNELS'))
                if (!args[1]) return message.channel.send('You need to specify a welcome channel');
            let channel = member.guild.channels.cache.find(channel => channel.name === args[1]);
            if (!channel) return message.channel.send('invalid channel')
            break;



    }
});

//const token = 'NzMzMTg5MDkwNDYzNDQ5MjA5.XxKalQ.6QIu3WM53_FDV1qh1kf7RcsOi_c';//anime bot token from name : @bell cranel
//bot.login(token);

bot.login(process.env.token);

//${client.guilds.cache.size}
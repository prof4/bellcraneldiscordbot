/*const Discord = require('discord.js');
const {Client, MessageAttachment} = require('discord.js');
const bot = new Client();

const token = 'NzMzMTg5MDkwNDYzNDQ5MjA5.XxKalQ.6QIu3WM53_FDV1qh1kf7RcsOi_c';//anime bot token from name : @bell cranel
const token_soulbot = 'NzI3ODQ0NDQwNjA0OTM0MjQ0.XxKdIg.5Arj9aqkxK5JhKIq8cM6-ycULuo'
const PREFIX = '-';

var version = '0.0.1' 
var smug_img = ['https://animemotivation.com/wp-content/uploads/2018/07/Umaru-doma-smug.jpg',
    'https://animemotivation.com/wp-content/uploads/2018/06/fluesy-bluesy-smug-face.jpg',
    'https://animemotivation.com/wp-content/uploads/2018/07/shinoa-smug-face-owari-no-seraph.jpg',
    'https://animemotivation.com/wp-content/uploads/2018/07/zero-two-smug-darling-in-the-franxx.jpg',
    'https://animemotivation.com/wp-content/uploads/2017/10/haruhi-suzumiya-smug-face.jpg',
    'https://animemotivation.com/wp-content/uploads/2018/07/Goku-smug.jpg',
    'https://animemotivation.com/wp-content/uploads/2018/07/glenn-radars-smug.jpg',
    'https://animemotivation.com/wp-content/uploads/2018/07/smug-little-anime-girl.jpg',
    'https://animemotivation.com/wp-content/uploads/2018/07/asuna-yuuki-smug.jpg',
    'https://animemotivation.com/wp-content/uploads/2018/07/sanae-dekomori-smug.png',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ5ByAzqHcwDp1PtBKqphOy2twEGCnmhOpdrw&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR4XlEiOd6Aa0UsBMesYrYvt9Nz1--xAqSUog&usqp=CAU',
    'https://www.pngitem.com/pimgs/m/16-166222_transparent-smug-anime-face-png-anime-smug-png.png',
    'data:image/jpeg;base64,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',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT6QrANMCGn9P7cx74P7-bRjcyYKY1z_l_Rlw&usqp=CAU',
    'https://pbs.twimg.com/media/CurRux8UkAApQ8r.jpg'
]; 
var card_index = ['accelerator t4 from  csr and cmi.PNG', 'agel t1 sao.PNG', 'airi t2 classroom of the elite.PNG', 'Ak-12 t5 girls frontline.png', 'akeno t5.PNG', 'Ame t5 from wolf childeren.PNG', 'card 1.PNG', 'card 2.PNG', 'card 3.PNG', 'card 4.PNG', 'card 5 naruto.PNG', 'card 6.PNG', 'card 7 bleach.PNG', 'card 8 ssss gridman.PNG', 'card 9 ssss gridman.PNG', 'card 10 ssss gridman.PNG', 'celty t5 Durara.PNG', 'Gowter t5 seven deadly sins.PNG', 'joker t5.PNG', 'kakashi t5.PNG', 'Yuuki t5 sao.PNG'];
var cards = card_index[Math.floor(Math.random() * card_index.length)];
var smug = smug_img[Math.floor(Math.random() * smug_img.length)];

bot.on('ready', () =>{
    console.log('Soul bot is online');
});

bot.on('guildMemberAdd', member =>{

    const channel = member.guild.channels.cache.find(channel => channel.name === "🤗welcome🤗");
    if(!channel) return;

    channel.send(`Welcome to our server, ${member}, please read the rules in the rules channel`)
});

bot.on('message', message=>{
    if(!message.content.startsWith(PREFIX) || message.author.bot) return;

    let args = message.content.slice(PREFIX.length).split(" ");
    switch(args[0]){
        case 'ping':
            message.channel.send('pong!');
            break;
        case 'youtube':
            message.channel.send('https://www.youtube.com/channel/UCRCnkwj20LCs_xy6iy-b2nw?view_as=subscriber');
            break;
        case 'info':
            if(args[1] === 'version'){
                message.channel.send('Version '+ version);
            } else{
                message.channel.send('Invalid Args')
            }
        break;
        case 'purge':
            if (!args[1]) return message.reply('Error please define a second arg');
            message.channel.bulkDelete(time)
            break;
        case 'profile':
            const embed = new Discord.MessageEmbed()
            .setTitle('User Information')
            .addField('Player name', message.author.username, true)
            .addField('Version', '0.0.1', true)
            .addField('current Server', message.guild.name, true)
            .setColor('#5DADE2')
            .setThumbnail(message.author.displayAvatarURL())
            .setFooter('Subscribe to prof c4 on youtube.')
            message.channel.send(embed);
            break;
        case 'invite':
            message.channel.send('the link to invite the bot')
            message.channel.send('https://discord.com/api/oauth2/authorize?client_id=733189090463449209&permissions=0&scope=bot')
            message.channel.send('the link to official server: ')
            message.channel.send('https://discord.gg/jnNWeRH')

        break;
        case 'smug':
            var smug = smug_img[Math.floor(Math.random() * smug_img.length)];
            const attachment = new MessageAttachment(smug)
            message.channel.send(message.author, attachment)
        break;
        case 'spawncard':
            var cards = card_index[Math.floor(Math.random() * card_index.length)];
            const attachment2 = new MessageAttachment(cards)
            message.channel.send(message.author, attachment2)
        break;
    }
});
bot.login(token);//*/
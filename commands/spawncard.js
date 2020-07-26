const Discord = require('discord.js');
const { Client, MessageAttachment } = require('discord.js');

var card_index = ['accelerator t4 from  csr and cmi.PNG', 'agel t1 sao.PNG', 'airi t2 classroom of the elite.PNG', 'Ak-12 t5 girls frontline.png', 'akeno t5.PNG', 'Ame t5 from wolf childeren.PNG', 'card 1.PNG', 'card 2.PNG', 'card 3.PNG', 'card 4.PNG', 'card 5 naruto.PNG', 'card 6.PNG', 'card 7 bleach.PNG', 'card 8 ssss gridman.PNG', 'card 9 ssss gridman.PNG', 'card 10 ssss gridman.PNG', 'celty t5 Durara.PNG', 'Gowter t5 seven deadly sins.PNG', 'joker t5.PNG', 'kakashi t5.PNG', 'Yuuki t5 sao.PNG', 'card 5.PNG'];
var cards = card_index[Math.floor(Math.random() * card_index.length)];
module.exports = {
    name: 'spawncard',
    description: "this is a card spawning command!",
    execute(message, args) {
        var cardspawner = '734389283632185345';

        if (message.member.roles.cache.has(cardspawner)) {
            var cards = card_index[Math.floor(Math.random() * card_index.length)];
            const attachment2 = new MessageAttachment(cards)
            const embed8 = new Discord.MessageEmbed
                .setTitle("What's this?")
                .setDescription("A wild anime card appears!")
                /*embed8.setImage(attachment2)*/
                .setThumbnail(message.author.displayAvatarURL())
                .setFooter("Type .claim to add this card to your collection")
            message.channel.send(embed8, attachment2);
        } else {
            return message.channel.send('You do not have the permissions');
        }
    }
}
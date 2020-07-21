module.exports = {
    name: 'smug',
    description: "this is a smug role play command!",
    execute(message, args) {
        
        var smug = smug_img[Math.floor(Math.random() * smug_img.length)];
        const attachment = new MessageAttachment(smug)
        message.channel.send(message.author, attachment);
    }
}
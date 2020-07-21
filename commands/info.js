const { version } = require("discord.js");

module.exports= {
    name: 'info',
    description: "this is a info command!",
    execute(message, args){
        if(args[1] === 'version'){
            var version = '0.0.3'
            message.channel.send('Version '+ version);
        } else{
            message.channel.send('Invalid Args')
        }
    }
}
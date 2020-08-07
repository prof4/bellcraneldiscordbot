module.exports = {
    name: 'welcome',
    description: "this is a set welcome channel command!",
    execute(message, args) {
        message.channel.bulkDelete(args[1])
    }
}
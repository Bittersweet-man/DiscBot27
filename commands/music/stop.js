const commando = require("discord.js-commando");
const Server = require("../../models/server");

module.exports = class StopCommand extends commando.Command {

    constructor(client) {
        super(client,
            {
                name: 'stop',
                group: 'music',
                memberName: 'stop',
                description: 'Stops playing music, clear queue',
                examples: ['!stop']
            });
    }

    async run(message, args) {
        if (message.guild.voiceConnection) {
            message.guild.voiceConnection.disconnect();
            servers.set(message.guild.id, new Server(message.guild.id));
        } else {
            message.reply("Can't stop me if I'm not running!");
        }
    }

}
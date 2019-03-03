const discord = require('discord.js');
const commando = require("discord.js-commando");

module.exports = class QueueCommand extends commando.Command {

    constructor(client) {
        super(client,
            {
                name: 'queue',
                group: 'music',
                memberName: 'queue',
                description: 'Shows the queue',
                examples: ['!queue']
            });
    }

    async run(message, args) {
        // Get server from collection
        let server = servers.get(message.guild.id);

        if (server == null) {
            message.reply("Can't show the queue if there's nothing in the queue");
            return;
        }

        if (server.dispatcher == null || server.queue.length <= 0) {
            message.reply("Can't show the queue if there's nothing in the queue");
            return;
        }

        let embed = new discord.RichEmbed()
            .setTitle("The queue")

        for (let i = 0; i < server.queue.length; i++) {
            let item = server.queue[i];

            embed.addField(`Song #${i+1}`, item);
        }

        message.channel.send(embed);

    }

}
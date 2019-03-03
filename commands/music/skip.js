const commando = require("discord.js-commando");

module.exports = class SkipCommand extends commando.Command {

    constructor(client) {
        super(client, {
            name: 'skip',
            group: 'music',
            memberName: 'skip',
            description: 'Plays music by url or query',
            examples: ['!skip', '!skip 2']
        });
    }

    async run(message, args) {
        // Get server from collection
        let server = servers.get(message.guild.id);


        if (server == null) {
            message.reply("Can't skip a song if there's nothing in the queue");
            return;
        }

        if (server.dispatcher == null) {
            message.reply("Can't skip a song if there's nothing in the queue");
            return;
        }

        let splitted = message.content.split(" ");

        if (splitted.length <= 1) {
            server.dispatcher.end();
        } else {
            let number = parseInt(splitted[1]);
            if (isNaN(number)) {
                message.reply("param not a number, skipping one song")
                server.dispatcher.end();
            } else {


                if (number > server.queue.length) {
                    number = server.queue.length;
                }

                for (let i = 0; i < number - 1; i++) {
                    server.queue.shift();
                }

                servers.set(message.guild.id, server);

                server.dispatcher.end();
                message.reply(`Skipped ${number} songs`);
            }

        }
    }
}

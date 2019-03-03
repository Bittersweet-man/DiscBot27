const commando = require("discord.js-commando");
const Server = require("../../models/server");
const ytdl = require("ytdl-core");
const YouTube = require("simple-youtube-api");
const config = require("../../config.json");

module.exports = class PlayCommand extends commando.Command {

    constructor(client) {
        super(client, {
            name: 'play',
            group: 'music',
            memberName: 'play',
            description: 'Plays music by url or query',
            examples: ['!play https://www.youtube.com/watch?v=tjpsedQ-ZbI', '!play despacito']
        });
    }

    async run(message, args) {

        // Only works in guilds
        if (!message.guild) return;

        // Only works if you're in a voice channel
        if (!message.member.voiceChannel) {
            message.channel.send("You must be in a voice channel to use this command");
            return;
        }

        // Get server from collection
        let server = servers.get(message.guild.id);

        // If server not found, add server
        if (server == null) {
            server = new Server(message.guild.id);
        }

        // Split content
        const splitted = message.content.split(" ");

        // Placeholder for url
        let url = null;

        // Check if arguments are filled
        if (splitted.length <= 1) {
            message.channel.send("Please provide a valid youtube url or enter a query to play.");
            return;
        }

        // Get first argument
        const arg = splitted[1];

        // Check if user sent youtube link, get id from url
        if (ytdl.validateURL(arg)) {
            url = arg;

            // If content is a query, search youtube 
        } else {
            const api = new YouTube(process.env.YouTubeAPI);
            splitted.shift();

            await api
                .searchVideos(splitted.join(" "), 5)
                .then(results => {

                    // TODO: Let user choose, for now get first result
                    if (results.length > 0) {
                        url = results[0].url;
                    }
                })
                .catch(console.error);
        }
        const api = new YouTube(process.env.YouTubeAPI);
        let video = await api.searchVideos(splitted.join(" "), 5)
        let title = video.title
        console.log(title)
        // Push url to queue
        server.queue.push(url);

        // Update servers
        servers.set(message.guild.id, server);

        if (!message.guild.voiceConnection) {
            await message.member.voiceChannel.join()
                .then(connection => {
                    Play(connection, message)
                })
                .catch(console.error);
        }
    }
}

function Play(connection, message) {
    let server = servers.get(message.guild.id);

    server.dispatcher = connection.playStream(ytdl(server.queue[0], {
        filter: "audioonly"
    }));

    server.dispatcher.on('end', function () {

        // Get server again to check if queue is updated
        let server = servers.get(message.guild.id);

        // If any song is in the queue, play
        if (server.queue.length > 0) {
            Play(connection, message);
        }
        // Else disconnect
        else {
            connection.disconnect();
        }
    });

    server.queue.shift();

    servers.set(message.guild.id, server);
}
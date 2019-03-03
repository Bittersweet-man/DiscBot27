const Commando = require('discord.js-commando');
const YouTube = require("discord-youtube-api"); 
const config = require("../../config.json")
const youtube = new YouTube(config.youtubeKey);
const discord = require('discord.js')


class SearchCommand extends Commando.Command {
    constructor(client, ) {
        super(client, {
            name: 'search',
            group: 'music',
            memberName: 'search',
            description: 'Search for a youtube video!'
        });
    }


    async run(message, args) {
        if(!args){
            message.channel.send("Please supply a video you want!")
            return;
        }
        const video3 = await youtube.searchVideos(args);

        var mEmbed = new discord.RichEmbed()
        .setTitle('Song Result')
      .addField('Song Length', video3.length)
      .addField('Requested by', message.author)
      .setDescription(video3.title)
      .setFooter(video3.url)
      .setURL(video3.url)
      .setTimestamp()
      .setColor(0xff0000)
      .setThumbnail(video3.thumbnail)

     message.channel.send({
      embed: mEmbed
      })


    }
}

module.exports = SearchCommand;
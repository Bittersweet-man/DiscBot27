const Commando = require('discord.js-commando');
const discord = require("discord.js")

class FunMirrorCommand extends Commando.Command
{
    constructor(client,)
        {
        super(client,{
            name: 'mirror',
            group: 'simple',
            memberName: 'mirror',
            description: 'Look at your reflection in a mirror!'
        });
    }
        
        
    async run(message, args)
    {
        let embed = new discord.RichEmbed()
        .setTitle("Mirror")
        .setImage(message.author.avatarURL)
        message.channel.send({embed : embed})
        
    }
}

module.exports = FunMirrorCommand;
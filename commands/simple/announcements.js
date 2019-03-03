const Commando = require('discord.js-commando');

class AnnouncementsCommand extends Commando.Command {
    constructor(client, ) {
        super(client, {
            name: 'announcements',
            group: 'simple',
            memberName: 'announcements',
            description: 'Get notified for new announcements'
        });
    }



    async run(message, args) {
        var role = message.guild.roles.find(role => role.name === "announcements")
        if (message.guild.id == 465707591910162432) {
            if (message.member.roles.find(r => r.name === "announcements")) {
                message.member.removeRole(role)
                message.reply("The announcements role has been removed.")
                return;
            }
            if (!message.member.roles.find(r => r.name === "announcements")) {
                message.member.addRole(role)
                message.reply('You have recieved the announcements role, and will be notified of new announcements!')
            }
        } else {
            message.channel.send('That command isn\'t available here!')
        }
    }
};

module.exports = AnnouncementsCommand
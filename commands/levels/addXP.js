const Commando = require('discord.js-commando');
const discord = require("discord.js")
const sql = require("sqlite3")
const db = new sql.Database("./1xptest.db")


class XPCommand extends Commando.Command {
    constructor(client, ) {
        super(client, {
            name: 'changexp',
            group: 'levels',
            memberName: 'change xp',
            description: 'Chnage XP of a user! (ADMIN ONLY)'
        });
    }


    async run(message, args) {
        if (!message.member.hasPermission("BAN_MEMBERS")) {
            message.channel.send("You don't have permissions to use this command!");
            return;
        }
        var User = message.guild.member(message.mentions.users.first());
        if (!User) {
            message.channel.send("Sorry, I cound't find that person");
            return;
        }
        db.each(`Select xp, level, color FROM table_name WHERE id="${User.id}"`, function (err, row) {
            let words = args.split(' ');
            let toadd = words.slice(1).join(' ');
            if (isNaN(toadd)) {
                message.channel.send("Please provide a valid amount of XP!")
                return;
            }
            let toaddxp = parseInt(toadd)
            var test = row.xp + toaddxp
            db.run(`UPDATE table_name SET xp=${test} WHERE id=${User.id}`)
            message.channel.send("XP changed!")
            let xpembed = new discord.RichEmbed()
                .setTitle("Xp Changed")
                .addField("Changed For", User)
                .addField("Changed By", message.author)
                .setColor(0xfce300)
                .addField("Amount Changed", toaddxp)
                .setTimestamp()

            var channel = message.guild.channels.find(channel => channel.name === "modlogs")
            channel.send({
                embed: xpembed
            })

        })

    }

}

module.exports = XPCommand;
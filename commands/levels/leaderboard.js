const Commando = require('discord.js-commando');
const discord = require("discord.js")
const sql = require("sqlite3")
const db = new sql.Database("./1xptest.db")

class leaderboardCommand extends Commando.Command {
    constructor(client, ) {
        super(client, {
            name: 'leaderboard',
            group: 'levels',
            memberName: 'leaderboard',
            description: 'Get the XP leaderboard of the server!'
        });
    }


    async run(message, args) {
        var place = 1
        var thing = ''
        message.channel.send(`Leaderboard For ${message.guild.name}:`)
        db.each(`Select level, id, xp, name FROM table_name ORDER BY level DESC LIMIT 5`, function (err, leaderboard) {




            thing = thing + `**Place:** ${place}      **Level:** ${leaderboard.level}      **User:** ${leaderboard.name}
`
            //message.channel.send(`**Place:** ${place}      **Level:** ${leaderboard.level}      **User:** ${leaderboard.name}`)
            place++

            if (place == 6) {
                message.channel.send(thing)
            }

        })
    }
}

module.exports = leaderboardCommand;

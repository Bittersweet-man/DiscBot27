const Canvas = require('canvas');
const Commando = require('discord.js-commando');
const snekfetch = require("snekfetch")
const sql = require("sqlite3")
const db = new sql.Database("./1xptest.db")
const discord = require('discord.js')

const bot = new Commando.Client()
class testCommand extends Commando.Command {
    constructor(client, ) {
        super(client, {
            name: 'test',
            group: 'levels',
            memberName: 'test',
            description: "Testing canvas with the leaderboard"
        });
    }


    async run(message, args) {
        const canvas = Canvas.createCanvas(700, 700);
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = "#ffffff"
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 15;


        // Slightly smaller text placed above the member's display name
        ctx.strokeRect(0, 0, canvas.width, canvas.height);




        var place = 1
        var ypos = 75
        var thing = ''
        message.channel.send(`Leaderboard For ${message.guild.name}:`)
        db.each(`Select level, id, xp, name FROM table_name ORDER BY level DESC LIMIT 5`, async function (err, leaderboard) {




            thing = thing + `**Place:** ${place}      **Level:** ${leaderboard.level}      **User:** ${leaderboard.name}
`

            ctx.font = '50px sans-serif';
            ctx.fillStyle = '#000000';
            ctx.fillText(`${leaderboard.name}`, 25, ypos);

            ctx.beginPath();
            ctx.arc(550, ypos+100, 100, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();

            let user = this.client.guild.users.find(user => user.username == "Bittersweet Man").id;
            console.log(user)
           // const {body: buffer} = await snekfetch.get(user.avatarURL);
            //const avatar = await Canvas.loadImage(buffer);
            //ctx.drawImage(avatar, 450, ypos, 50, 50);
            ypos = ypos + 135

            //message.channel.send(`**Place:** ${place}      **Level:** ${leaderboard.level}      **User:** ${leaderboard.name}`)
            place++


            if (place == 6) {
                message.channel.send(thing)
                const attachment = new discord.Attachment(canvas.toBuffer(), 'welcome-image.png');


            message.channel.send(attachment);
            }

        })

    }
}

module.exports = testCommand;
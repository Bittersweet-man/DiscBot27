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
        var ypos2= 140
        var thing = ''
               ctx.fillStyle = "#FFB6C1";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 15;
            ctx.strokeRect(0, 0, canvas.width, canvas.height);
      
      

      
        message.channel.send(`Leaderboard For ${message.guild.name}:`)
        db.each(`Select level, id, xp, name FROM table_name ORDER BY level DESC LIMIT 5`, async function (err, leaderboard) {




            thing = thing + `**Place:** ${place}      **Level:** ${leaderboard.level}      **User:** ${leaderboard.name}
`

            
            //message.channel.send(message.guild.iconURL)
     

            ctx.font = '45px sans-serif';
            ctx.fillStyle = '#000000';
            ctx.fillText(`${place}. ${leaderboard.name}`, 25, ypos);
            ctx.font = '35px sans-serif';
            ctx.fillStyle = '#000000';
            ctx.fillText(`Level ${leaderboard.level}`, 25, ypos2);
             ctx.font = '35px sans-serif';
            ctx.fillStyle = '#000000';
            ctx.fillText(`XP ${leaderboard.xp}`, 300, ypos2);

           
            ypos = ypos + 135
          ypos2 = ypos2 + 135

            //message.channel.send(`**Place:** ${place}      **Level:** ${leaderboard.level}      **User:** ${leaderboard.name}`)
            place++


            if (place == 6) {
                message.channel.send(thing)
                

       ctx.beginPath();
            ctx.arc(575, 120, 100, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();

            const {
                body: buffer
            } = await snekfetch.get(message.guild.iconURL);
            const avatar = await Canvas.loadImage(buffer);
            ctx.drawImage(avatar, 474, 20, 200, 200);
              const attachment = new discord.Attachment(canvas.toBuffer(), 'welcome-image.png');

            message.channel.send(attachment);
            }

        })

    }
}

module.exports = testCommand;
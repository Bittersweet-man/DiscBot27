const Canvas = require('canvas');
const Commando = require('discord.js-commando');
const snekfetch = require("snekfetch")
const discord = require("discord.js")
const sql = require("sqlite3")
const db = new sql.Database("./1xptest.db")

const applyText = (canvas, text) => {
    const ctx = canvas.getContext('2d');

    // Declare a base size of the font
    let fontSize = 70;

    do {
        // Assign the font to the context and decrement it so it can be measured again
        ctx.font = `${fontSize -= 10}px sans-serif`;
        // Compare pixel width of the text to the canvas minus the approximate avatar size
    } while (ctx.measureText(text).width > canvas.width - 300);

    // Return the result to use in the actual canvas
    return ctx.font;
};
procent = 0,
    oneProcent = 360 / 100,
    result = oneProcent * 64;

class CanvasCommand extends Commando.Command {
    constructor(client, ) {
        super(client, {
            name: 'profile',
            group: 'levels',
            memberName: 'profile',
            description: 'Look at your profile!'
        });
    }


    async run(message, args) {

        if(message.guild.member(message.mentions.users.first())){
            var user = message.mentions.users.first()
        }else {
            var user = message.author
        }
        db.each(`Select xp, level, color FROM table_name WHERE id="${user.id}"`, async function (err, row) {


            const canvas = Canvas.createCanvas(700, 700);
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = row.color;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = '#000000';
            ctx.lineWidth = 15;


            // Slightly smaller text placed above the member's display name
            ctx.strokeRect(0, 0, canvas.width, canvas.height);
            ctx.font = '50px sans-serif';
            ctx.fillStyle = '#ffffff';
            ctx.fillText('Profile For:', 25, 75);

            // Add an exclamation point here and below
            ctx.font = applyText(canvas, `${user.displayName}`);
            ctx.fillStyle = '#ffffff';
            ctx.fillText(`${user.displayName}`, 25, 130);
            
            
            

            ctx.font = '50px sans-serif';
            ctx.fillStyle = "#ffffff";
            ctx.fillText(`Level:`, canvas.width / 15, canvas.height / 2.3)
            ctx.font = '50px sans-serif';
            ctx.fillStyle = "#ffffff";
            ctx.fillText(`${row.level}`, canvas.width / 15, canvas.height / 1.9)

            ctx.font = '50px sans-serif'
            ctx.fillStyle = '#ffffff'
            ctx.fillText(`Experience:`, canvas.width / 15, canvas.height / 1.3)
            ctx.font = '50px sans-serif'
            ctx.fillStyle = '#ffffff'
            ctx.fillText(`${row.xp}`, canvas.width / 15, canvas.height / 1.15)

            ctx.font = '50px sans-serif'
            ctx.fillStyle = '#ffffff'
            ctx.fillText(`XP to Next Level:`, canvas.width / 2.5, canvas.height / 2.29)
            let curXp = row.xp
            let curLvl = row.level
            let nxtLvlXp = (curLvl * 200) * 1.2;
            let difference = nxtLvlXp - curXp
            ctx.font = '50px sans-serif'
            ctx.fillStyle = '#ffffff'
            ctx.fillText(`${difference}`, canvas.width / 2.5, canvas.height / 1.91)
            //ctx.beginPath();
            //ctx.ellipse(450, 600, 200, 25, Math.PI / 90, 0, 2 * Math.PI);
            //ctx.stroke();


            ctx.font = '40px sans-serif'
            ctx.fillStyle = '#ffffff'
            let percent = Math.floor((curXp / nxtLvlXp) * 100)
            ctx.fillText(`${percent}%`, 520, 650)



            var posX = canvas.width / 2,
                posY = canvas.height / 2,
                fps = 1000 / 200,
                procent = 0,
                oneProcent = 360 / 100,
                result = oneProcent * 64;

            ctx.lineCap = "round";
            arcMove();

            function arcMove() {
                var deegres = ((curXp / nxtLvlXp) * 100) * 3.6;



                ctx.beginPath();
                ctx.shadowColor = 'black';
                ctx.shadowBlur = 30;
                ctx.arc(550, 480, 125, Math.PI / 180 * 270, Math.PI / 180 * (270 + 360));
                //Math.PI / 180 * (270 + 360)
                ctx.strokeStyle = "#ffffff";
                ctx.lineWidth = "20";
                ctx.stroke();

                ctx.beginPath();
                ctx.strokeStyle = row.color;
                

                ctx.lineWidth = "15";
                ctx.arc(
                    550,
                    480,
                    125,
                    Math.PI / 180 * 270,
                    Math.PI / 180 * (270 + deegres)
                    //Math.PI / 180 * (270 + deegres)
                );
                ctx.stroke();

            }





            ctx.beginPath();
            ctx.arc(550, 480, 100, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();

            const {
                body: buffer
            } = await snekfetch.get(user.avatarURL);
            const avatar = await Canvas.loadImage(buffer);
            ctx.drawImage(avatar, 450, 380, 200, 200);


            const attachment = new discord.Attachment(canvas.toBuffer(), 'welcome-image.png');


            message.channel.send(attachment);


        })
        //const background = await Canvas.loadImage('./wallpaper.png');
        //ctx.drawImage(background, 0, 0, canvas.width, canvas.height);


    }
}

module.exports = CanvasCommand;

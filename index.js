// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/display.txt');
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});

const Commando = require('discord.js-commando');



const bot = new Commando.Client({
    commandPrefix: "?",
    owner: "413754421365964800",
    owner: "462709446121095169"

})
let fs = require("fs")
const discord = require('discord.js')
global.servers = new discord.Collection();
const config = require("./config.json")
const TOKEN = config.token;
const sql = require("sqlite3")
const db = new sql.Database("./1xptest.db")
var presence = 0

//db.run("CREATE TABLE table_name (id integer, xp integer, level integer, color string, name string)");
//db.run("INSERT INTO table_name (id, level) VALUES (413754421365964800, 4)");
//db.run(`DELETE FROM table_name WHERE id=413754421365964800`)
//db.run(`UPDATE table_name SET name="coward" WHERE id=413754421365964800`)


//bot.registry.registerGroup('simple', 'Simple');
bot.registry.registerGroup('music', 'Music');
bot.registry.registerGroup('admin', 'Admin');
bot.registry.registerGroup('animals', 'Animals');

bot.registry.registerGroup('simple', 'Simple');
bot.registry.registerGroup('levels', 'Levels')
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + '/commands');

bot.login(TOKEN);



function presenceChange(guild) {
  
if(presence == 0){
    bot.user.setActivity("Type ?help", {type: 'WATCHING'})
    presence = 1
  setTimeout(presenceChange, 2500)
    return;
}
  if(presence == 1){
    const guild = bot.guilds.get("465707591910162432")
    bot.user.setActivity(`${guild.memberCount} users!`, {type: 'WATCHING'})
    presence = 0
  setTimeout(presenceChange, 2500)
    return;
}
  
}

var playQueue = [];
global.servers = new discord.Collection();
bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`)
  const guild = bot.guilds.get("465707591910162432")
          var channel = guild.channels.find(channel => channel.id === "538707114781179904")

    channel.send("I am online!")
  presenceChange(guild)
})

bot.on("guildMemberAdd", function (member) {
    if (member.guild.id == 465707591910162432) {
        member.send("Hello! Welcome to sylveon land, here we meme the crap out of our existence! Read #welcome-rules before typing away!");
        var channel = bot.channels.get('538814550506733578')
        var guild = 465707591910162432
        var rules = bot.channels.get('538813283139059732')
        var accept = bot.channels.get('538818808807292940')
        var thumbnail = member.id.avatarURL
        let welcome = new discord.RichEmbed()
            .setTitle("Welcome!")
            .addField("New Member", "New member " + member + " has joined! Give then a warm welcome!", true)
            .addField("Rules", "Make sure to read " + rules + " and do \'accept\' in" + accept + " to get access to the server!", true)
            .setDescription("You're user " + member.guild.memberCount)
            .setColor('RANDOM')
            .setImage(member.user.avatarURL)
            .setFooter("Welcome to the server!")

        channel.send(welcome);
    }
    if (member.guild.id == 510974262769614918) {
        var channel = bot.channels.get('510974262769614921')
        channel.send('someone joined kk')
    }

});

bot.on("guildMemberRemove", function (member) {
        if (member.guild.id == 465707591910162432) {
            var channel = bot.channels.get('538814550506733578')
            var guild = 465707591910162432
            channel.send('**I\'m sorry that ' + member.displayName + " has left us. oof.**")
        }
    }

);






bot.on('message', function (message) {
  
  

    if (message.author.bot) return;
  
  
  
  
  
    db.each(`Select xp, level FROM table_name WHERE id="${message.author.id}"`, function (err, row) {
        let xp = Math.floor(Math.random() * 10) + 5
        //console.log(xp)
        let curXp = row.xp
        let curLvl = row.level
        let nxtLvlXp = (curLvl * 200) * 1.2;
        //let difference = nxtLvlXp - curXp;
        var test = row.xp + xp
        if (curXp > nxtLvlXp) {
            curLvl = curLvl + 1
            var test = 0
            message.channel.send(`Congrats ${message.member.displayName}! You're now level ${curLvl}`)
        }

        db.run(`UPDATE table_name SET xp=${test}, level=${curLvl}, name="${message.member.displayName}" WHERE id=${message.author.id}`)

    })
  
  

    if (message.content == "insert") {
        var user = message.member.displayName
        db.run(`INSERT INTO table_name (id, xp, level, color, name) VALUES (${message.author.id}, 1, 1, "#fce300", "${message.member.displayName}")`);
        message.channel.send("ran")
    }


    if (message.content == "reset") {
        db.run(`DELETE FROM table_name WHERE id=${message.author.id}`)
    }
    if (message.content == "reboot") {
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            message.channel.send("You don't have permissions to use this command!");
            return;
        }
        message.channel.send('Resetting...')
            .then(msg => bot.destroy())
            .then(() => bot.login(TOKEN));
    }
    if (message.content == "shutdown") {
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            message.channel.send("You don't have permissions to use this command!");
            return;
        }
        message.channel.send('Shutting down...')
            .then(msg => bot.destroy())
    }
    if (message.content.toLowerCase() == "accept") {
        if (message.member.roles.find(r => r.name === "newcomer")) {
            return;
        }
        message.reply('You have been accepted to the Sylveon Squad!')
        var role = message.guild.roles.find(role => role.name === "newcomer")
        message.member.addRole(role)
    }
    if (message.content == '$shadow') {
        let myRole = message.guild.roles.get("515653899839864843");
        message.member.addRole(myRole)
        message.channel.send('welcome to the shadows')
    }
    if (message.content.toLowerCase().includes("nigga" || "nigger" || "fag" || "faggot" || "retard" || "dyke")) {
        message.delete();
        message.author.send("Please don't use any slurs! This is just a warning, next time will result in a ban.")
        var channel = message.guild.channels.find(channel => channel.name === "modlogs")
        let sEmbed = new discord.RichEmbed()
            .setTitle('Slur')
            .addField('A slur was used by', message.author)
            .addField('Channel', message.channel)
            .setDescription("Auto detection")
            .setTimestamp()
            .setColor(0xFFA500)
        channel.send({
            embed: sEmbed
        })
    }
})

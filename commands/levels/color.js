const Commando = require('discord.js-commando');
const discord = require("discord.js")
const sql = require("sqlite3")
const db = new sql.Database("./1xptest.db")


class ColorCommand extends Commando.Command
{
    constructor(client,)
        {
        super(client,{
            name: 'color',
            group: 'levels',
            memberName: 'color',
            description: 'Change the color of your profile! Command use: ?color #<hex code>'
        });
    }
        //?color     #008B8B
        
    async run(message, args)
    {
        if(!args){
            message.reply("Please provide a hex code!") 
            return;
        } 
        var isOk  = /^#[0-9A-F]{6}$/i.test(args)
        if(isOk !== true){
            message.reply("Thats not a valid hex code!")
            return;
        }

let colorcode = args
       message.channel.send(`Your profile color has been set to **\"${colorcode}\"**!`)

        db.run(`UPDATE table_name SET color="${colorcode}" WHERE id=${message.author.id}`)
    

        
    }

}

module.exports = ColorCommand;
const { MessageEmbed } = require("discord.js");
const { config } = require("dotenv");
const configValues = require("../../index.js")
module.exports = {
    name: "monica",
    description: "Monica will repeat the arguments of the command in a new embed message.",
    run: (client, message, args) => {
        message.delete();

        if(!configValues.enableMonicaCommand) {
            var embedMonicaDisabled = new MessageEmbed()
            .setTitle("Warning")
            .setDescription(`Monica Command is disabled in Bot Config!`)
            .setColor("#cd0000");
  
            return message.channel.send(embedMonicaDisabled);
        } else {
            if (!message.member.hasPermission("MANAGE_MESSAGES" ) && !configValues.enableDebugMode)
                return message.reply("You don't have the permission to do that! MANAGE_MESSAGES").then(m => m.delete(5000));

            if (args.length < 0)
                return message.reply("Let Monica say Something!").then(m => m.delete(5000));

            const images = ["https://media.discordapp.net/attachments/638076774416121866/802598772236091392/monichina2.jpg?width=522&height=676", "https://media.discordapp.net/attachments/680769643387814040/781213801554378752/IMG_20201117_185126.jpg?width=508&height=677", "https://media.discordapp.net/attachments/638076774416121866/802598767706636288/monichina_cuccinaaaaa.jpg?width=767&height=676", "https://media.discordapp.net/attachments/661136017138515978/802149026983313418/monichina3.jpg?width=744&height=676"];
            const embedMonica = new MessageEmbed()
            .setColor("#cd0000")
            .setTitle("Monica is just saying...")
            .setThumbnail(images[Math.floor(Math.random() * images.length)])
            .setDescription(`${args.slice(0).join(" ")}`)

            message.channel.send(embedMonica);
        }
    }
}
const chalk = require("chalk");
const Discord = require("discord.js");
const configValues = require("../../index.js")
module.exports = {
    name: "say",
    description: "Repeats the arguments of the command in another message.",
    run: (client, message, args) => {
        message.delete();

        if (!message.member.hasPermission("MANAGE_MESSAGES") && !configValues.enableDebugMode) {
            if(configValues.generalCommandStyle == "embed") {
                var embedUserNoPerm = new Discord.MessageEmbed()
                .setTitle("No Permission")
                .setDescription("<@"+message.member+`>, You need the MANAGE_MESSAGES permission to use the SAY command.`)
                .setColor(configValues.negativeHexColor);
    
                return message.channel.send(embedUserNoPerm);
            } else {
                return message.channel.send("<@"+message.member+">,You need the MANAGE_MESSAGES permission to use the SAY command.");
            }
        }

        if (args.length <= 0) {
            if(configValues.generalCommandStyle == "embed") {
                var embedMissingArgument = new Discord.MessageEmbed()
                .setTitle("Say Command - Error")
                .setDescription(`This command needs an argument!`)
                .setColor(configValues.negativeHexColor);
    
                return message.channel.send(embedMissingArgument);
            } else {
                return message.reply("This command needs an argument!");
            }
        }

        message.channel.send(args.join(" "));
    }
}
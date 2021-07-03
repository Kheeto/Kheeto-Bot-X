const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const configValues = require("../../index.js")
module.exports = {
    name: "clear",
    description: "Deletes the provided amount of messages.",
    run: async (client, message, args) => {
        message.delete();
        if (!message.member.hasPermission("MANAGE_MESSAGES") && !configValues.enableDebugMode) {
            if(configValues.generalCommandStyle == "embed") {
                var embedUserNoPerm = new MessageEmbed()
                .setTitle("No Permission")
                .setDescription(`You need the MANAGE_MESSAGES permission`)
                .setColor(configValues.negativeHexColor);
    
                return message.channel.send(embedUserNoPerm);
            } else {
                return message.channel.send("You need the MANAGE_MESSAGES permission to do that!");
            }
        }
        // Check if provided argument is a number
        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            if(configValues.generalCommandStyle == "embed") {
                var embedIncorrectUsage = new MessageEmbed()
                .setTitle("Clear Command - Error")
                .setDescription("Correct usage is "+configValues.prefix+"clear <number>")
                .setColor(configValues.negativeHexColor);
    
                return message.channel.send(embedIncorrectUsage);
            } else {
                return message.reply("Correct Usage: **"+configValues.prefix+"clear <number>**");
            }
        }
        // If bot doesn't have permission to delete messages
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            if(configValues.generalCommandStyle == "embed") {
                var embedBotNoPerm = new MessageEmbed()
                .setTitle("Clear Command - Error")
                .setDescription(`I don't have the permission to delete messages.`)
                .setColor(configValues.negativeHexColor);
    
                return message.channel.send(embedBotNoPerm);
            } else {
                return message.channel.send("Give me the permission to delete messages!");
            }
        }
        let deleteAmount;

        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }

        var embedClear = new MessageEmbed()
        .setColor(configValues.negativeHexColor)
        .setTitle("Clear Command")
        .setDescription(`${deleteAmount} messages were deleted.`);

        message.channel.bulkDelete(deleteAmount, true)
            .then(deleted => {
                if(configValues.generalCommandStyle == "embed") {
                    message.channel.send(embedClear)
                } else {
                    message.channel.send(`${deleteAmount} messages were deleted.`)
                }
            })
            .catch(err => message.reply("Can't delete messages."));
    }
}
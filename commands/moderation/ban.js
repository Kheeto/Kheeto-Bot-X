const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const configValues = require("../../index.js")
const chalk = require('chalk');
const hook = new Discord.WebhookClient(configValues.punishmentHookID, configValues.punishmentHookToken);
module.exports = {
    name: "ban",
    description: "Bans someone from this server.",
    run: async (client, message, args) => {

        let mentionedUser = message.mentions.members.first();
        if(!mentionedUser) return message.reply("Please mention an user to ban!");
        let reason = args.slice(1, args.length).join(" ") || "No reason specified.";

        if(message.member.hasPermission('KICK_MEMBERS') || message.member.hasPermission('ADMINISTRATOR') || configValues.enableDebugMode) {
            mentionedUser.ban({
                reason: reason,
            })

            mentionedUser.send("You have been banned by "+message.guild.name)
            if(configValues.generalCommandStyle == "embed") {
                const embedPunishment = new MessageEmbed()
                .setColor(configValues.negativeHexColor)
                .setTitle("Ban Command")
                .setDescription("You banned <@"+mentionedUser+"> from the server for reason "+reason)

                message.channel.send(embedPunishment);

                var embedPunishmentChannel = new MessageEmbed()
                .setTitle("Ban")
                .setDescription("<@"+mentionedUser+"> has been banned. Reason: "+reason)
                .setColor(configValues.negativeHexColor);

                hook.send(embedPunishmentChannel)
            } else if(configValues.generalCommandStyle == "default") {
                message.reply("You banned <@"+mentionedUser+"> from the server for reason "+reason)

                hook.send("<@"+mentionedUser+"> has been banned. Reason: "+reason)
            }
        } else if(!message.member.hasPermission('BAN_MEMBERS')) {
            if(configValues.generalCommandStyle == "embed") {
                var embedUserNoPerm = new MessageEmbed()
                .setTitle("No Permission")
                .setDescription(`You need the BAN_MEMBERS permission`)
                .setColor(configValues.negativeHexColor);
    
                return message.channel.send(embedUserNoPerm);
            } else if(configValues.generalCommandStyle == "default") {
                message.reply("You need the BAN_MEMBERS permission to do that!")
            } 
        }

    }
}
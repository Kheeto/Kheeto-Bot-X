const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const configValues = require("../../index.js")
const hook = new Discord.WebhookClient(configValues.punishmentHookID, configValues.punishmentHookToken);

module.exports = {
    name: "mute",
    description: "Mutes someone in this server.",
    run: async (client, message, args) => {

        if(!configValues.mutingEnabled) {
          if(configValues.generalCommandStyle == "embed") {
            var embedLockdownDisabled = new MessageEmbed()
            .setTitle("Warning")
            .setDescription(`Muting is Disabled in Bot Config!`)
            .setColor(configValues.negativeHexColor);

            return message.channel.send(embedLockdownDisabled);
          } else {
            return message.channel.send("Muting is Disabled in Bot Config!");
          }
        }

        let staffRole = configValues.staffRoleID;
        let mutedRole = configValues.mutedRoleID;

        if(!message.member.roles.cache.has(staffRole)) { // If user trying to use this command has not staff role
          if(configValues.generalCommandStyle == "default" && !configValues.enableDebugMode) {
            return message.reply("Only Server Staff Members can Mute Users!")
          } else if(configValues.generalCommandStyle == "embed") {
            var embedError1 = new MessageEmbed()
            .setTitle("Error")
            .setDescription(`Only Server Staff Members can Mute Users!`)
            .setColor(configValues.negativeHexColor);
  
            return message.channel.send(embedError1);
          }
        }

        let mentionedUser = message.mentions.members.first();
        if(!mentionedUser) return message.reply("Please mention an user to mute!");

        if(mentionedUser.roles.cache.has(staffRole) && !configValues.staffCanPunishEachOther) {
          if(configValues.generalCommandStyle == "default" && !configValues.enableDebugMode) {
            message.reply("You can't mute a Staff Member!");
          } else if(configValues.generalCommandStyle == "embed") {
            var embedError2 = new MessageEmbed()
            .setTitle("Error")
            .setDescription(`You can't mute a Staff Member!`)
            .setColor(configValues.negativeHexColor);
  
            return message.channel.send(embedError2);
          }
        }

        var embedNotMuted = new MessageEmbed()
        .setTitle("Mute")
        .setDescription("<@"+mentionedUser+"> is no longer Muted")
        .setColor(configValues.positiveHexColor);

        var embedMuted = new MessageEmbed()
        .setTitle("Mute")
        .setDescription("<@"+message.member+">, you muted <@"+mentionedUser+">")
        .setColor(configValues.negativeHexColor);

        if(!mentionedUser) {
          return message.reply("Please mention an user to Mute!")
        } else if (mentionedUser == message.member) {
          return message.reply("Do not mute yourself!")
        }

        var embedPunishmentNotMuted = new MessageEmbed()
        .setTitle("Mute")
        .setDescription("<@"+mentionedUser+"> is no longer Muted")
        .setColor(configValues.positiveHexColor);

        var embedPunishmentMuted = new MessageEmbed()
        .setTitle("Muted")
        .setDescription("<@"+mentionedUser+"> has been muted by <@"+message.member+"> Reason: "+args.slice(1, args.length).join(" "))
        .setColor(configValues.negativeHexColor);

        if(mentionedUser.roles.cache.has(mutedRole)) { // If mentioned users is already Muted, Un-Mutes him.
          mentionedUser.send("You are no longer muted on "+message.guild.name)

          mentionedUser.roles.remove(mutedRole);
          message.channel.send(embedNotMuted);
          if(configValues.showUnpunishInPunishmentChannel && configValues.punishmentChannelStyle == "default") {
            hook.send("<@"+mentionedUser+"> was un-muted by <@"+message.member+">");
          } else if(configValues.showUnpunishInPunishmentChannel && configValues.punishmentChannelStyle == "embed") {
            hook.send(embedPunishmentNotMuted);
          }

        } else if(!mentionedUser.roles.cache.has(mutedRole)) { // If mentioned users is NOT Muted, Mutes him.
          mentionedUser.send("You have been muted on "+message.guild.name)

          let reason = args.slice(1, args.length).join(" ") || "No reason specified.";
          mentionedUser.roles.add(mutedRole);
          message.channel.send(embedMuted);
          if(configValues.punishmentChannelStyle == "default") {
            hook.send("<@"+mentionedUser+"> was muted by <@"+message.member+">! Reason: **"+reason+"**");
          } else if(configValues.punishmentChannelStyle == "embed") {
            hook.send(embedPunishmentMuted);
          }

	}

    }
}
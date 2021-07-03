const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const configValues = require("../../index.js")
const chalk = require('chalk');
const hook = new Discord.WebhookClient(configValues.punishmentHookID, configValues.punishmentHookToken);

module.exports = {
    name: "lockdown",
    description: "Lockdowns someone in this server.",
    run: async (client, message, args) => {

        if(!configValues.lockdownEnabled) {
          if(configValues.generalCommandStyle == "embed") {
            var embedLockdownDisabled = new MessageEmbed()
            .setTitle("Warning")
            .setDescription(`Lockdown Feature is Disabled in Bot Config!`)
            .setColor(configValues.negativeHexColor);
  
            return message.channel.send(embedLockdownDisabled);
          } else {
            return message.channel.send("Lockdown Feature is Disabled in Bot Config!");
          }
        } else {

            let staffRole = configValues.staffRoleID;
            let lockdownRole = configValues.lockdownRoleID;
            let defaultRole = configValues.defaultRoleID;

            if(staffRole = "" || lockdownRole == "" || defaultRole == "") {
              console.log(chalk.red("[ERROR] Lockdown is enabled but StaffRole / LockdownRole or DefaultRole wasn't found in the server!"))
            }

            if(!message.member.roles.cache.has(staffRole)) { // If user trying to use this command has not staff role
              if(configValues.generalCommandStyle == "default" && !configValues.enableDebugMode) {
                return message.reply("Only Server Staff Members can Lockdown Users!")
              } else if(configValues.generalCommandStyle == "embed") {
                var embedError1 = new MessageEmbed()
                .setTitle("Error")
                .setDescription(`Only Server Staff Members can Lockdown Users!`)
                .setColor(configValues.negativeHexColor);
      
                return message.channel.send(embedError1);
              }
            }

            let mentionedUser = message.mentions.members.first();

            if(!mentionedUser) return message.reply("Please mention an user to lockdown!");

            if(mentionedUser.roles.cache.has(staffRole) && !configValues.staffCanPunishEachOther) {
              if(configValues.generalCommandStyle == "default" && !configValues.enableDebugMode) {
                message.reply("You can't lockdown a Staff Member!");
              } else if(configValues.generalCommandStyle == "embed") {
                var embedError2 = new MessageEmbed()
                .setTitle("Error")
                .setDescription(`You can't lockdown a Staff Member!`)
                .setColor(configValues.negativeHexColor);
      
                return message.channel.send(embedError2);
              }
            }

            var embedNotLockdown = new MessageEmbed()
            .setTitle("Lockdown Command")
            .setDescription("<@"+mentionedUser+"> is no longer Lockdowned")
            .setColor(configValues.positiveHexColor);

            var embedLockdown = new MessageEmbed()
            .setTitle("Lockdown Command")
            .setDescription("<@"+message.member+"> you lockdowned <@"+mentionedUser+">")
            .setColor(configValues.negativeHexColor);

            if(!mentionedUser) {
              return message.reply("Please mention an user to Lockdown!")
            } else if (mentionedUser == message.member) {
              return message.reply("Do not lockdown yourself!")
            }

            var embedPunishmentNotLockdown = new MessageEmbed()
            .setTitle("Lockdown Punishment")
            .setDescription("<@"+mentionedUser+"> is no longer Lockdowned")
            .setColor(configValues.positiveHexColor);

            var embedPunishmentLockdown = new MessageEmbed()
            .setTitle("Lockdown Punishment")
            .setDescription("<@"+mentionedUser+"> has been lockdowned by <@"+message.member+"> Reason: "+args.slice(1, args.length).join(" "))
            .setColor(configValues.negativeHexColor);

            if(mentionedUser.roles.cache.has(lockdownRole)) { // If mentioned users is already Lockdowned, remove him from Lockdown!
              mentionedUser.send("You are no longer lockdowned on "+message.guild.name)

              mentionedUser.roles.remove(lockdownRole);
              mentionedUser.roles.add(defaultRole);
              message.channel.send(embedNotLockdown);
              if(configValues.showUnpunishInPunishmentChannel && configValues.punishmentChannelStyle == "default") {
                hook.send("<@"+mentionedUser+"> was removed from Lockdown by <@"+message.member+">");
              } else if(configValues.showUnpunishInPunishmentChannel && configValues.punishmentChannelStyle == "embed") {
                hook.send(embedPunishmentNotLockdown);
              }
              

            } else if(!mentionedUser.roles.cache.has(lockdownRole)) { // If mentioned users is NOT Lockdowned, Lockdown him!
              mentionedUser.send("You have been lockdowned on "+message.guild.name)
              let reason = args.slice(1, args.length).join(" ") || "No reason specified.";
              mentionedUser.roles.add(lockdownRole);
              mentionedUser.roles.remove(defaultRole);
              message.channel.send(embedLockdown);
              if(configValues.punishmentChannelStyle == "default") {
                hook.send("<@"+mentionedUser+"> was Lockdowned by <@"+message.member+"> Reason: **"+reason+"**");
              } else if(configValues.punishmentChannelStyle == "embed") {
                hook.send(embedPunishmentLockdown);
              }
        }

	}

    }
}
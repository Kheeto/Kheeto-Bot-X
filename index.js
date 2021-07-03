// Bot Template by Kheeto or Kheeto#9999 on Discord.
// You can use and edit this Bot as you want.
// IF YOU WANT TO CUSTOMIZE THE BOT EDIT THESE CONFIG VALUES!

// GENERAL CONFIG VALUES
const prefix = "!"; // Prefix for all Bot commands.
const disableCommands = false;
const enableMonicaCommand = true; // Similiar to Say command but as embed with Monica Image as Thumbnail (Monica is Kheeto's Dog).
const positiveHexColor = "#0e6b0e"; // Hexadecimal Color Value used in embeds. Default is green - #0e6b0e
const negativeHexColor = "#cd0000"; // Hexadecimal Color Value used in embeds. Default is red - #cd0000
const generalCommandStyle = "embed" // Choose Between "default" and "embed".

// MODERATION CONFIG VALUES
const staffRoleID = "840914723812802581"; // Put the ID of the role for users who can Mute and Lockdown users.
const staffCanPunishEachOther = false; // Example: Can a Staff Member mute another Staff Member?
const mutingEnabled = true; // Enable Muting and Mute Command
const mutedRoleID = "840908911410020364"; // Put the ID of the muted role, used by Mute Command.
const enablePunishmentChannel = true; // If punishments like mutes, kicks, bans and lockdowns will be shown in a channel.
const punishmentHookID = "840914904986419211"; // Put the ID for the webhook of the punishment channel.
const punishmentHookToken = "Osux8k3vKfDfUAQX3z3LbqVMfvotsaUxnr5ZwmcOE1NVN6TbTwzwzY5eFBB-rMt_-ygE"; // Put the Token for the webhook of the punishment channel.
const showUnpunishInPunishmentChannel = true; // If Un-Punishments like Un-Mutes will be shown in the Punishment Channel. If set to false only Punishments will be shown.

// LOCKDOWN COMMAND CONFIG VALUES
// IF ENABLING LOCKDOWN MAKE SURE TO SET A "staffRoleID" UP IN THE MODERATION CONFIG VALUES!
const lockdownEnabled = true; // Is lockdown enabled?
const lockdownRoleID = "840915171362865178"; // Put the ID of the role that lockdowned users will get.
const defaultRoleID = "840915147513528321"; // Default server role assigned to users when they are not in lockdown.

// DEBUG OPTIONS
const enableDebugMode = false; // Only for developer purposes, we don't recommend using this because it disables permission checks in commands and other things!

// EXPORTING CONFIG VALUES TO OTHER FILES - DO NOT EDIT THIS OR SOME COMMANDS WILL NOT WORK!
module.exports = {
    enableDebugMode: enableDebugMode,
    prefix: prefix,
    disableCommands: disableCommands,
    enableMonicaCommand: enableMonicaCommand,
    lockdownEnabled: lockdownEnabled,
    lockdownRoleID: lockdownRoleID,
    staffRoleID: staffRoleID,
    defaultRoleID: defaultRoleID,
    mutingEnabled: mutingEnabled,
    mutedRoleID: mutedRoleID,
    enablePunishmentChannel: enablePunishmentChannel,
    punishmentHookID: punishmentHookID,
    punishmentHookToken: punishmentHookToken,
    positiveHexColor: positiveHexColor,
    negativeHexColor: negativeHexColor,
    staffCanPunishEachOther: staffCanPunishEachOther,
    showUnpunishInPunishmentChannel: showUnpunishInPunishmentChannel,
    generalCommandStyle: generalCommandStyle,
}

// Importing Modules - DO NOT EDIT THIS
const Discord = require("discord.js");
const { Client, Collection } = require("discord.js");
const fs = require("fs");
const { config } = require("dotenv");
const chalk = require('chalk');

// Client and Commands - DO NOT EDIT THIS
const client = new Client({
    disableEveryone: true
});
client.commands = new Collection();
client.aliases = new Collection();
config({
    path: __dirname + "/.env"
});
if(!disableCommands) {
    ["command"].forEach(handler=>{
        require(`./handlers/${handler}`)(client);
    });
} else {
    require(`./handlers/command`);
}
// Check some config values
if(generalCommandStyle != "embed" && generalCommandStyle != "default") console.log(chalk.red("[ERROR] Invalid Config Value: \"generalCommandStyle\" string value has to be equal to \"embed\" or \"default\""));
// Client Events
client.on("ready", () => {
    if(!disableCommands) console.log(chalk.green("[INFO] Finished loading Commands!"));
    console.log(chalk.green("[INFO] Bot Successful connected to Discord."));
    if(enableDebugMode) {
        console.log(chalk.yellow("[WARNING] Bot started using Debug Mode and disabling all permission checks!"))
    }
    client.user.setActivity('Edit this in index.js', { // You can edit the text in the Bot Status
        type: 'PLAYING', // You can edit the type of Bot Status - PLAYING, WATCHING, LISTENING, STREAMING
        // IF TYPE IS STREAMING ADD url: 'put link here' BEFORE THIS COMMENT!
    });
})

// Command Event - DO NOT EDIT THIS IF YOU DON'T KNOW WHAT YOU ARE DOING, OR COMMANDS WILL NOT WORK!
client.on("message", async message => {
    if(message.author.bot) return; // Bot will ignore commands from other bots. For example if another bot write /somecommand this bot will ignore it
    if(message.channel.type === "dm") return message.reply("Use me only in servers!");
    if(!message.guild) return;
    if(!message.content.startsWith(prefix)) return; // Check if command is starting with the prefix, defined on the start of this file.
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g); // Command Arguments
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0) return; // If command length is 0
    var command = client.commands.get(cmd);
    if(!command) command = client.commands.get(client.aliases.get(cmd)); // If text after prefix is not a valid command check if it's an alias
    if(command) {
        command.run(client,message,args); // Run the command
    }
})

// Client Login - Connect the Bot to Discord - THIS TAKES THE TOKEN FROM .ENV FILE
client.login(process.env.TOKEN)
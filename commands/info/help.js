const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const pagination = require("discord.js-pagination");
const { stripIndents } = require("common-tags");
const { readdirSync } = require("fs");
const configValues = require("../../index.js");
module.exports = {
    name: "help",
    description: "Shows the command list",
    run: async (client, message, args) => {

        const info = new MessageEmbed() // embed for the "Info" page in pagination embed
                .setTitle("**Help - Info**")
                .setDescription("Info Commands List")
                .setColor("#cd0000")
                .addField("**"+configValues.prefix +"help"+"**", "Sends an embed showing the command list.", true)
                .addField("**"+configValues.prefix +"myinfo"+"**", "Shows your informations in this server.", true)
                .addField("**"+configValues.prefix +"ping"+"**", "Shows the bot's ping in milliseconds.", true)

        const fun = new MessageEmbed() // embed for the "Fun" page in pagination embed
        .setTitle("**Help - Meme**")
        .setDescription("Meme Commands List")
        .setColor("#cd0000")
        .addField("**"+configValues.prefix +"meme"+"**", "Sends a random meme from reddit in an embed.", true)
        .addField("**"+configValues.prefix +"monica"+"**", "Monica will repeat the arguments of the command in an embed.", true)

        const moderation = new MessageEmbed() // embed for the "Moderation" page in pagination embed
        .setTitle("**Help - Moderation**")
        .setDescription("Moderation Commands List")
        .setColor("#cd0000")
        .addField("**"+configValues.prefix +"say"+"**", "Repeats the arguments of the command in another message.", true)
        .addField("**"+configValues.prefix +"clear"+"**", "Deletes the provided amount of messages.", true)
        .addField("**"+configValues.prefix +"kick"+"**", "Kicks an user from the server.", true)
        .addField("**"+configValues.prefix +"ban"+"**", "Bans an user from the server.", true)
        .addField("**"+configValues.prefix +"mute"+"**", "Mutes an user in this server.", true)
        .addField("**"+configValues.prefix +"lockdown"+"**", "Lockdowns an user in this server.", true)

        const other = new MessageEmbed() // embed for the "Other" page in pagination embed
        .setTitle("**Help - Other**")
        .setDescription("Other Commands List")
        .setColor("#cd0000")
        .addField("**"+configValues.prefix +"weather"+"**", "Shows the current wheather informations for the provided location.", true)
        .addField("**"+configValues.prefix +"ascii"+"**", "Converts a default text to an ascii one.", true)

        const pages = [ // array containing all single embeds for pagination embed
            info,
            fun,
            moderation,
            other
        ]

        message.react("✅")
        pagination(message, pages, ["⏪","⏩"], 120000);

    }

}

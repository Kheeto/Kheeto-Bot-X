const Discord = require("discord.js");
const configValues = require("../../index.js");

const figlet = require("figlet");
const { promisify } = require("util");
const figletAsync = promisify(figlet);

module.exports = {
    name: "ascii",
    description: "Converts a normal text to an ascii one.",
    run: async (client, message, args) => {

        const tooLongEmbed = new Discord.MessageEmbed()
        .setTitle("Ascii Command - Error")
        .setColor(configValues.negativeHexColor)
        .setDescription("Provide a shorter text, the ascii version of the text you provided would exceed the Discord limit (it would be longer than 2000 characters).")

        const noTextEmbed = new Discord.MessageEmbed()
        .setTitle("Ascii Command - Error")
        .setColor(configValues.negativeHexColor)
        .setDescription("You have to provide a text that will be converted to an ascii text!")

        var text = args.join(" ");
        if (!text) {
            if(configValues.generalCommandStyle == "embed") {
                message.reply(noTextEmbed);
            } else if(configValues.generalCommandStyle == "default") {
                message.reply("You have to provide a text that will be converted to an ascii text!");
            }
            return;
        }

        if (text.length) {
            if(configValues.generalCommandStyle == "embed") {
                message.reply(tooLongEmbed);
            } else if(configValues.generalCommandStyle == "default") {
                message.reply("Provide a shorter text, the ascii version of the text you provided would exceed the Discord limit (it would be longer than 2000 characters).");
            }
            return;
        }

        const ascii = await figletAsync(text);
        message.channel.send("```" +ascii+ "```");

    }

}

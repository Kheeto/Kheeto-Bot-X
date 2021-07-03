const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const configValues = require("../../index.js")
module.exports = {
    name: "ping",
    description: "Shows the bot's ping in milliseconds.",
    run: async (client, message, args) => {
        if(configValues.generalCommandStyle == "embed") {
            const msg = await message.channel.send(`Wait...`);

            msg.edit(`Calculating ping...`);
            msg.delete();
    
            const ping = `${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms`
    
            const embedPing = new MessageEmbed()
                .setColor(configValues.positiveHexColor)
                .setTitle("Bot Latency")
                .setDescription(ping);
            
            message.channel.send(embedPing);
        } else if(configValues.generalCommandStyle == "default") {
            
        }

    }
}

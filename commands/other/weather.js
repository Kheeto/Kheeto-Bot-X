const weather = require("weather-js");
const Discord = require("discord.js");
const configValues = require("../../index.js");
module.exports = {
    name: "weather",
    description: "Shows the current weather",
    run: async (client, message, args) => {

        weather.find({search: args.join(" "), degreeType: 'C'}, function(error, result){
            const errorEmbed = new Discord.MessageEmbed()
            .setTitle("Weather Command - Error")
            .setColor(configValues.negativeHexColor)
            .setDescription(error)

            const noLocationEmbed = new Discord.MessageEmbed()
            .setTitle("Weather Command - Error")
            .setColor(configValues.negativeHexColor)
            .setDescription("Please provide a location to check the current weather!")

            const invalidLocationEmbed = new Discord.MessageEmbed()
            .setTitle("<@"+message.member+">")
            .setColor(configValues.negativeHexColor)
            .setDescription("You provided an invalid location!")

            if(error) return message.channel.send(errorEmbed);
            if(args.lenght == 0) {
                if(configValues.generalCommandStyle == "embed") {
                    message.channel.send(noLocationEmbed);
                } else if(configValues.generalCommandStyle == "default") {
                    message.reply("Please provide a location to check the current weather!")
                }
                return;
            }

            if(result === undefined || result.length === 0) {
                if(configValues.generalCommandStyle == "embed") {
                    message.channel.send(invalidLocationEmbed);
                } else if(configValues.generalCommandStyle == "default") {
                    message.reply("You provided an invalid location!")
                }
                return;
            }

            var current = result[0].current;
            var location = result[0].location;

            const weatherInfo = new Discord.MessageEmbed()
            .setTitle("Weather for "+current.observationpoint)
            .setDescription(current.skytext)
            .setThumbnail(current.imageUrl)
            .addField("Temperature", current.temperature+"°C (Celsius)", true)
            .addField("Wind Info", current.winddisplay, true)
            .addField("Humifity", current.humifity, true)
            .addField("Using Timezone", 'UTC'+location.timezone, true)

            message.channel.send(weatherInfo);
        })

    }

}

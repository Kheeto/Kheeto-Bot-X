const configValues = require("../index.js");
const chalk = require("chalk");
module.exports = {
    name: 'ready',
    once: true,
    run: async(client, message, args) => {
        if(!configValues.disableCommands) console.log(chalk.green("[INFO] Finished loading Commands!"));
        console.log(chalk.green("[INFO] Bot Successful connected to Discord."));
        if(configValues.enableDebugMode) {
            console.log(chalk.yellow("[WARNING] Bot started using Debug Mode and disabling all permission checks!"))
        }
        configValues.client.user.setActivity('Edit this in index.js', { // You can edit the text in the Bot Status
            type: 'PLAYING', // You can edit the type of Bot Status - PLAYING, WATCHING, LISTENING, STREAMING
            // IF TYPE IS STREAMING ADD url: 'put link here' BEFORE THIS COMMENT!
        });
    }
}

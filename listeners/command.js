const { readdirSync } = require("fs");
const chalk = require('chalk');
const index = require("../index")
console.log(chalk.green("Welcome to Kheeto's Bot Template"))
console.log(chalk.yellow("Inizializing Commands..."));
var commands;
if(!index.disableCommands) {
    module.exports = (client) => {
        readdirSync("./commands").forEach(dir => {
            commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));

            for(let file of commands) {
                pull = require(`../commands/${dir}/${file}`);
                if(pull.name) {
                    client.commands.set(pull.name, pull);
                    console.log("Successful Loaded Command "+ chalk.cyan(pull.name));
                } else {
                    console.log(chalk.red("[ERROR] Error while loading "+pull+", couldn't find the command name."))
                    continue;
                }
                if(pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
            }

            
        }), commands;
    }
} else {
    console.log(chalk.red("[WARNING] Commands are disabled by config in index.js"))
}
if(index.enableDebugMode && !index.disableCommands) {
    console.log(chalk.red("[INFO] Debug mode is enabled by config in index.js"));
    console.log(chalk.red("Inizializing debug mode..."));
    console.log(chalk.red("All Command Permission Checks Disabled."))
    console.log(chalk.red("[WARNING] If you are not a developer of this Bot, we don't recommend using Debug Mode!"))
} else if(!index.enableDebugMode && !index.disableCommands){
    console.log(chalk.cyan("[INFO] Debug Mode is Disabled, Loading Permission Checks in Commands..."));
}

const { MessageEmbed } = require("discord.js")
const configValues = require("../../index.js")
module.exports = {
    name: "myinfo",
    description: "Shows your informations in this server.",
    run: async(client,message,args) => {
        const myuser = message.member.user;
        const member = message.guild.members.cache.get(myuser.id); // member in the server

        var userInfoEmbed = new MessageEmbed()
        .setAuthor(`${myuser.username}'s Profile`, myuser.displayAvatarURL())
        .addFields({
            name: 'Name + Tag',
            value: myuser.tag,
        },
        {
            name: 'Nickname',
            value: member.nickname || myuser.username + ' has no Nickname in this Server.'
        },
        {
            name: 'Joined Server on:',
            value: new Date(member.joinedAt).toLocaleDateString()
        },
        {
            name: 'Account Creation on:',
            value: new Date(myuser.createdTimestamp).toLocaleDateString()
        }
        );

        var defaultStyleNick = member.nickname || "No Nickname!"
        var defaultStyleJoined = new Date(member.joinedTimeStamp).toLocaleDateString();
        var defaultStyleCreated = new Date(myuser.createdTimestamp).toLocaleDateString();

        if(configValues.generalCommandStyle == "embed") message.channel.send(userInfoEmbed);
        else if (configValues.generalCommandStyle == "default") message.channel.send(`${myuser.username}${myuser.tag} Info\n\nNickname: ${defaultStyleNick}\nJoined Server on ${defaultStyleJoined}\nAccount Created on ${defaultStyleCreated}`);
    }
}
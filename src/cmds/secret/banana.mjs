import discord, { MessageEmbed } from "discord.js"

class Command {
    /**
     * @param {discord.Client} client
     * @param {discord.Message} message
     * @param {string[]} args
     */
    constructor(client, message, args) {
        this.client = client
        this.message = message
        this.args = args
    }
    async run() {

        const embed = new MessageEmbed()
        .setTitle("banana")
        .setURL("https://media.discordapp.net/attachments/869271348696977428/881980058732990514/VID-20210804-WA0285.mp4")
        .setColor("RANDOM")
        .setImage("https://media.discordapp.net/attachments/869271348696977428/881985601069543424/ezgif.com-gif-maker.gif")
        .setFooter("comando oculto 1/3")
        
        this.message.channel.send({embeds :[embed]})  
    }
}

export default {
    name: "banana",
    alias: [],
    clase: Command
}
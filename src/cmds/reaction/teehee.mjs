import { MessageEmbed } from "discord.js"
import nekoapi from "cacao_nekoapi"

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
        let img = await nekoapi.SFW.reaction_1.teehee()
     
        const embed = new MessageEmbed()
        .setDescription(`${this.message.author.username} se echa un pequeña risa `)
        .setColor("RANDOM")
        .setImage(img.url)
        
        this.message.channel.send({embeds: [embed]})   
    }
}

export default {
    name: "teehee",
    alias: [],
    clase: Command
}
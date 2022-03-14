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
        let img = await nekoapi.SFW.anime_1.girl()
  
        const embed = new MessageEmbed()
        
        .setColor("RANDOM")
        .setImage(img.url)
   
   
      this.message.channel.send({embeds: [embed]})  
    }
}

export default {
    name: "girl",
    alias: [],
    clase: Command
}
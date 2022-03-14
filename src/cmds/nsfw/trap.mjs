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
        let img = await nekoapi.NSFW.nsfw.trap()
   
        const embed = new MessageEmbed()
        .setColor("RANDOM")
        .setImage(img.url)
   
   if (!this.message.channel.nsfw) {
         return await this.message.reply({content:"❌ **Esto no es un canal NSFW**",
         allowedMentions: {
          repliedUser: false
    }
  }).then((msg) => {
               setTimeout(() => {
               msg.delete();
               }, 5000)
               })  
      }else{
      this.message.channel.send({embeds: [embed]})
    }
  }
}

export default {
    name: "trap",
    alias: [],
    clase: Command
}
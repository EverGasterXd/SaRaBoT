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
        let img = await nekoapi.SFW.action_1.stare()

        const mencion = message.mentions.members.first()
       
       const embed = new MessageEmbed()
         .setDescription(`${message.author.username} se le quedo mirando a ${message.mentions.members.first()} `)
         .setColor("RANDOM")
         .setImage(img.url)
   
       if (!mencion) {
         return await this.message.reply({content:"debes mencionar a alguien", 
         allowedMentions: {
           repliedUser: false
     }
    }).then((msg) => {
               setTimeout(() => {
               msg.delete();
               }, 5000)
               })  
       } else if (mencion && mencion.id == message.author.id) {
         return await this.message.reply({content:"🪞 ten ya te miraste a hora menciona a alguien mas", 
         allowedMentions: {
           repliedUser: false
     }
    }).then((msg) => {
               setTimeout(() => {
               msg.delete();
               }, 5000)
               })  
       }else{
   
       this.message.channel.send({ embeds: [embed] })
      } 
    }
}

export default {
    name: "state",
    alias: [],
    clase: Command
}
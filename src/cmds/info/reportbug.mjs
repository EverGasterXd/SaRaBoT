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

        const owner = this.client.channels.cache.get(`940737221655425024`)       

        const patas = this.args.join(" ")
        if (!patas ) return await this.message.reply({content: "debes espisificar el bug",
        allowedMentions: {
         repliedUser: false
   }
}).then((msg) => {
    setTimeout(() => {
    msg.delete();
    }, 5000)
    })

        const embed = new MessageEmbed()
        .setTitle("nuevo bug")
        .addField(`**| author del reporte |**`, `${this.message.author.toString()}`, true)
        .addField(`**| reporte |**`, `\`\`\`${patas}\`\`\``)
        .setThumbnail(this.message.author.displayAvatarURL({ dynamic: true}))

        owner.send({embeds: [embed]}).then(async msg => {
           this.message.reply({content: "se a enviado correctamente",
           allowedMentions: {
            repliedUser: false
      }
    })
        }).catch(async err =>{
           this.message.reply ({content: "hubo un error al enviarlo",
           allowedMentions: {
            repliedUser: false
      }
    })
        })
    }
}

export default {
    name: "reportbug",
    alias: [],
    clase: Command
}
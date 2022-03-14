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
        const owner = this.message.guild.ownerId
     
        const member = this.message.mentions.members.first()

        if(!this.message.member.permissions.has("ADMINISTRATOR")) return this.message.reply({content: "no tienes permisos para usar este comando",
        allowedMentions: {
         repliedUser: false
   }
}).then((msg) => {
    setTimeout(() => {
    msg.delete();
    }, 5000)
    })  

  
    if(member && member.id == this.message.author.id) {
        return await this.message.reply({content: "no puedes kickear a ti mismo",
        allowedMentions: {
         repliedUser: false
   }
}).then((msg) => {
    setTimeout(() => {
    msg.delete();
    }, 5000)
    })
    }

    if(member && member.id == owner) {
        return await this.message.reply({content: "no puedes kickear al owner",
        allowedMentions: {
         repliedUser: false
   }
}).then((msg) => {
    setTimeout(() => {
    msg.delete();
    }, 5000)
    })
    }


        if (!member) {
            const embed1 = new MessageEmbed()
            .setColor("AQUA")
            .setTitle("Error")
            .setDescription("este usuario no existe en el servidor")
            this.message.channel.send({embeds: [embed1]});
            return
        }


            member.kick('esto no esta bien')
            .then(async(target) => {
                
                const embed2 = new MessageEmbed()
                .setColor("DARK_AQUA")
                .setTitle(`Kickeado!`)
                .setDescription(`se a kickeado a ${target.user.username} perfectamente`)
                this.message.channel.send({embeds: [embed2]});
                
            }).catch(() => {
                this.message.reply({content: "a sucedido un error",
                allowedMentions: {
                 repliedUser: false
           }
        })
            });
    }
}
export default {
    name: "kick",
    alias: [],
    clase: Command
}
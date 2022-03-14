import discord, { MessageEmbed, MessageActionRow, MessageButton } from "discord.js"

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
        
        const server = this.message.guild;

        const embed = new MessageEmbed()
          .setTitle(`${this.message.guild.name} Icono`)
          .setImage(server.iconURL({ size: 2048, dynamic: true, format: "png" }))
          .setColor("RANDOM");

          const button = new MessageActionRow().addComponents(
            new MessageButton()
            .setStyle("LINK")
            .setURL(server.iconURL({
                size: 2048,
                format: "png",
                dynamic: true,
         }))
            .setLabel("📷 link del icono")
        
        );
        this.message.reply({ embeds: [embed], components: [button],
          allowedMentions: {
           repliedUser: false
     }
    });
      }
    };
    


export default {
    name: "servericon",
    alias: ["icon", "severicon"],
    clase: Command
}
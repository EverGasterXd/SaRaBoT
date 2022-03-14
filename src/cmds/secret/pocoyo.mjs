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
        .setTitle("nooo pocoyo donde te sentaste")
        .setImage("https://images-ext-1.discordapp.net/external/0ZosL3ufWzVugmus-FHJjiiEHz6kAqZ0Jgy_XhsdOyc/https/media.discordapp.net/attachments/869271348696977428/881990151239249970/images_11_11.jpeg")
        .setFooter("comando oculto 2/3")
        .setColor("RANDOM")
        
        this.message.channel.send({embeds :[embed]})   
    }
}

export default {
    name: "pocoyo",
    alias: [],
    clase: Command
}
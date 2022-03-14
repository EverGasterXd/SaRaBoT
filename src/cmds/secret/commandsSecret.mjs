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
        .setTitle ("has descubierto los comandos ocultos felicidades")
        .addField("los comandos ocultos", "banana \n pocoyo \n love")
        .setFooter("felicidades", "https://media.discordapp.net/attachments/869271348696977428/869272215718354984/20210720_152404.jpg")
        .setColor("RED")
        .setImage("https://media.discordapp.net/attachments/797240914660950036/912043671837356032/lucifer_modeus_cerberus_justice_judgement_and_4_more_helltaker_drawn_by_tsukudani_coke_buta__sample-e9c87bdf791c9ec704c134dbd323d5f1.jpg")
   
        this.message.channel.send({ embeds :[embed ]})    
    }
}

export default {
    name: "secret",
    alias: [],
    clase: Command
}
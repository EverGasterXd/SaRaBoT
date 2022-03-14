import disocrd, { MessageEmbed } from "discord.js"
import moment from "moment"
import m from "moment-duration-format"

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
        const duration = moment.duration(this.client.uptime).format(" D [days], H [hours], m [minutes], s [seconds]");

     const embed = new MessageEmbed()
    .setTitle("tiempo que esta activa SaRa")
    .setDescription(`SaRa a estado activa durante **${duration}**`)
    .setFooter("SaRa bot", this.client.user.displayAvatarURL({ dynamic: true }))
    .setColor("RED")

    embed.setTimestamp(new Date(),"<:raidencry:900169376139968562>")

    this.message.channel.send({embeds: [embed]})
    }
}

export default {
    name: "uptime",
    alias: [],
    clase: Command
}
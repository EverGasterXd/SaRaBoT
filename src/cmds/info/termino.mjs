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
	 
        .setTitle ("terminos y condiciones")
        .setDescription ("el usuario tiene el derecho a borrar su informacion cuando el quiera \n la informacion que le otorgan a sara para la blacklist es para la moderacion fuera del mensaje no se conserva mucho")


        this.message.channel.send({embeds: [embed]})	   
    }
}

export default {
    name: "termino",
    alias: [],
    clase: Command
}
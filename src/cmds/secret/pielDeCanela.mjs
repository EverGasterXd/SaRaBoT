import discord from "discord.js"

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
        this.message.channel.send("que se quede el infinito sin estrellas♪♬♫          https://youtu.be/bnwX_njsv4E    (comando oculto 3/3)")
    }
}

export default {
    name: "love",
    alias: [],
    clase: Command
}
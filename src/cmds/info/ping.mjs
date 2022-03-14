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
        let ping = Math.floor(this.client.ws.ping)
        await this.message.reply({ content: `> Pong 🏓 | \`${ping} ms\``, allowedMentions: { repliedUser: false }})
    }
}

export default {
    name: "ping",
    alias: [],
    clase: Command
}
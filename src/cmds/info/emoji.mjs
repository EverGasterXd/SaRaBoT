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
        
        if(!this.args[0])return await this.message.channel.send("debes poner un emoji")
        let emoji = this.message.guild.emojis.cache.find(x => x.name === this.args[0].split(":")[1])
     
        this.message.channel.send(emoji.url)
    }
}

export default {
    name: "emoji",
    alias: ["jumbo"],
    clase: Command
}
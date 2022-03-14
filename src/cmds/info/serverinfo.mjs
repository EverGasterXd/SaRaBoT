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
        
        let owner =  await this.client.users.fetch(`${this.message.guild.ownerId}`)
    
        const embed = new MessageEmbed()

        .setTitle("sever info ")

        .setThumbnail(this.message.guild.iconURL())

        .addField(`owner`, `${owner.username}`)

        .addField(`🆔 id`,  `${this.message.guild.id}`)

        .addField(`🚹 miembros`,`total :: ${this.message.guild.memberCount} \n bots :: ${(await (await this.message.guild.fetch(this.message.guildId)).members.fetch()).filter(c => c.user.bot).size} `, true)

        .addField(`<:cobijita:918106713054384138> emojis`, `${this.message.guild.emojis.cache.size}`, true)

        .addField(`🎨 roles`, `${this.message.guild.roles.cache.size}`, true)

        .addField(`📖 nombre del sever`, `${this.message.guild.name}`)

        .addField(`🖼 icono`, `[descarga el icono](${this.message.guild.iconURL({
            dynamic: true,
            size: 2048,
            format: "png",
        })
    })`)

        .addField(`🔒 nivel de seguridad`, `${this.message.guild.verificationLevel}`)

        .setImage(this.message.guild.bannerURL())



        this.message.channel.send({ embeds: [embed]})
    }
}

export default {
    name: "serverinfo",
    alias: [],
    clase: Command
}
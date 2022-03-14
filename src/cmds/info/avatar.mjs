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

        let member =
      this.message.mentions.members.first() || 
      this.message.guild.members.resolveId(this.args[0]) || 
      this.message.member;

     let user = await this.client.users.fetch(`${member.user.id}`)

     const embed = new MessageEmbed()
     
     .setTitle(
        member.id === this.message.member.id
          ? `avatar de ${member.displayName}`
          : `avatar de ${member.displayName}`
      )

   .setImage(user.avatarURL({
       size: 1024,
       format: "png",
       dynamic: true,
}))
  .setColor("RANDOM")
const button = new MessageActionRow().addComponents(
    new MessageButton()
    .setStyle("LINK")
    .setURL(user.avatarURL({
        size: 1024,
        format: "png",
        dynamic: true,
 }))
    .setLabel("📷 link del avatar")


);
this.message.channel.send({embeds: [embed], components: [button]})
    }
}

export default {
    name: "avatar",
    alias: ["av"],
    clase: Command
}
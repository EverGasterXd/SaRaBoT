import discord, { MessageActionRow, MessageButton, MessageEmbed } from "discord.js"

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
        const member = this.message.mentions.members.first() || this.message.member

        let user = await this.client.users.fetch(`${member.user.id}`)

    function formatDate (template, date) {
        var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':')
        date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
        return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
          return template.split(specs[i]).join(item)
        }, template)
      }
      const embed1 = new MessageEmbed()
      .setColor("RANDOM")
        .setDescription("**INFORMACIÓN DEL USUARIO:**")
        .addField("**:ticket: Nombre**:", "**" + `${member.user.tag}` + "**")
        .addField("**🖼 avatar**",`**[avatar link](${user.displayAvatarURL({ format: "png", dynamic: true, size: 1024 })})**`, true)
        .addField("**:tickets: ID**:", `**${member.id}**` )
        .addField("**:inbox_tray: Cuenta Creada:**", formatDate('**DD/MM/YYYY, a las HH:mm:ss**', member.user.createdAt))
        .setThumbnail (user.avatarURL({ format: "png", dynamic: true, size: 1024 }))
    
        .setTimestamp()

     const embed2 = new MessageEmbed()
     .setColor("RANDOM")
     .addField("**:pushpin: Apodo del usuario**:", `**${member.nickname !== null ? `${member.nickname}` : 'Ninguno'}**`, true) 
     .addField("**:rocket: ¿Boostea?**:", member.premiumSince ? '**Estoy boosteando**' : '**No estoy boosteando**')
     .addField("**:bellhop: Fecha de Ingreso al Servidor:**", formatDate('**DD/MM/YYYY, a las HH:mm:ss**', member.joinedAt))
     .setThumbnail (user.avatarURL({ format: "png", dynamic: true, size: 1024 }))
     .setTimestamp()


     const embed3 = new MessageEmbed()
     .addField("**:military_medal: Roles:**", `**${member.roles.cache.map(r => r.name)}**`)
     .setThumbnail (user.avatarURL({ format: "png", dynamic: true, size: 1024 }))

     const button = new MessageActionRow().addComponents(
        new MessageButton()
          .setStyle("PRIMARY")
          .setCustomId("usuario")
          .setLabel(" usuario")
          .setEmoji("<:confunsion:910400063371636736>"),
        new MessageButton()
          .setStyle("SECONDARY")
          .setCustomId("user")
          .setLabel(`user`)
          .setEmoji("<:feliz:910400345149149244>"),
        new MessageButton()
          .setStyle("SUCCESS")
          .setCustomId("roles")
          .setLabel(`roles`)
          .setEmoji("<:beso:910400208607793152>"),
     );

     const m = await this.message.channel.send({
        embeds: [embed1],
        components: [button],
      });
  
      const collector = m.createMessageComponentCollector({
        filter: async (i) => {
          if (i.user.id === this.message.author.id) return true;
          else {
            await i.reply({ content: "No puedes usar esto", ephemeral: true });
            return false;
          }
        },
        time: 500000,
      });
  
      collector.on(`collect`, (i) => {
        const id = i.customId;
  
        if (id === "usuario") {
          i.update({ embeds: [embed1], components: [button] });
        }
        if (id === "user") {
          i.update({ embeds: [embed2], components: [button] });
        }             
        if (id === "roles") {
          i.update({ embeds: [embed3], components: [button] });
        }
     });
    }
}

export default {
    name: "userinfo",
    alias: [],
    clase: Command
}
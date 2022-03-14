import discord, { MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } from "discord.js"

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

      var perms = this.message.guild.me.permissions.has("SEND_MESSAGES")
      if(!perms) return;
    	const row = new MessageActionRow()
    	.addComponents(
  new MessageSelectMenu()
  .setCustomId("menu")
  .setMaxValues(1)    
.addOptions([
  {
         label: "nsfw",
           value: "embed4",
           description: "Comandos nsfw",
  emoji:"<:amor:910400150806102056>"
  }
])
  .addOptions([
  {
         label: "anime",
           value: "embed3",
           description: "Comandos de anime y informacion",
       emoji:"<:beso:910400208607793152>"
  }
])
.addOptions([
  {
         label: "Rolplay",
           value: "embed2",
           description: "Comandos de rolplay",
       emoji:"<:feliz:910400345149149244>"
  }
]
)
.addOptions([
  {
  label: "moderacion",
   value: "embed5",
   description: "comandos de moderacion",
   emoji: "<:alex_marin:910400398672662548>",
  }
])
        .addOptions([
  {
         label: "Menu",
           value: "embed1",
           description: "Menu Principal",
       emoji:"<:confunsion:910400063371636736>"
  }
])
  )
    
        const embed1 = new MessageEmbed()
        .setTitle("lista de Comandos")
  
        .setDescription("║las categorías para cada comando║")
  
        .addField("todos las catogrias", "> **nsfw** comandos cochinos :: <:amor:910400150806102056> \n > **rol**   comandos para rol :: <:feliz:910400345149149244> \n > **menu**  menu principal  :: <:cfunsion:910400063371636736> \n > **anime** anime e información  :: <:beso:910400208607793152> \n > **moderacion** comandos de moderacion  :: <:alex_marin:910400398672662548>")
        .addField("soporte" , "[invitacion](https://discord.gg/WnEkPJgtnt)", true)
       
        .setImage("https://media.discordapp.net/attachments/935251336646250496/935253590434521128/720_2.gif")
  
        .setColor("RED")
        
        .setFooter({text:"menu", iconURL:"https://media.discordapp.net/attachments/797240914660950036/912052196714090596/1637519433767.png"});

      const embed2 = new MessageEmbed()
        .setTitle("║para hacer rol con la gente║")
  
        .addField("comandos sin mencion", "``` s!sad      s!scream  s!yandere \n s!wink     s!vomit   s!think \n s!teehee   s!pout    s!like \n s!laugh    s!dance   s!cry \n s!bored    s!blush   s!angry \n s!run      s!sleep   s!travel \n s!stare    s!work ```")
        .addField("comandos con mencion", "``` s!baka   s!kiss   s!kill \n s!spank  s!pat    s!shot \n s!slap   s!punch  s!poke ```")
        
        .setColor("RED")
  
        .setImage("https://media.discordapp.net/attachments/935251336646250496/935253591151751258/16e90a95bf12af9a0bdde0e8e467a1e4.gif?width=1185&height=669") 
  
        .setFooter({text:"comandos de rol", iconURL:"https://media.discordapp.net/attachments/797240914660950036/912052196714090596/1637519433767.png"});
  
      const embed3 = new MessageEmbed()
  
      .setTitle("║para pasar el rato║")
  
      .addField("Comandos para tener nekos", "``` s!girl         s!wallpaper  s!waifu \n s!neko         s!maple      s!foxgirl \n s!kemonomimi   s!avatar     s!userinfo \n s!mbwallpaper  s!jumbo      s!botinfo \n s!servericon   s!severinfo  s!setprefix```")

      .setColor("RED")

.setImage("https://media.discordapp.net/attachments/935251336646250496/935256554997952574/beel-beelzebub.gif")

      .setFooter({ text: "comando de anime", iconURL:"https://media.discordapp.net/attachments/797240914660950036/912052196714090596/1637519433767.png"});

      const embed4 = new MessageEmbed()
  
      .setTitle("para tus puercadas")
  
      .addField("comandos sin mencion", "``` s!pussy   s!boobs    s!yuri \n s!ahegao  s!lwmaple  s!lwneko \n s!hentai  s!uniform  s!trap \n s!gif     s!bdsm     s!feet \n s!rule34 ```")

      .addField("comandos con mención", "``` s!anal  s!boobjob  s!cum \n s!fuck  s!feetjob  s!happyend \n s!kuni  s!spankh   s!suck ```")

      .setColor("RED")

.setImage("https://media.discordapp.net/attachments/935251336646250496/935255518740631643/283ff3b5941dec66773d38ac3f13bd1a_1.gif")

      .setFooter({text:"comandos nsfw 7u7", iconURL:"https://media.discordapp.net/attachments/797240914660950036/912052196714090596/1637519433767.png"});
    
      const embed5 = new MessageEmbed()

      .setTitle("║ moderacion ║")

      .setDescription("``` s!blacklist   s!reportbug   s!kick```")

      .setColor("RED")

      .setImage("https://media.discordapp.net/attachments/935251336646250496/935256571653550130/vos9nrltujl71.gif?width=1191&height=670")

      .setFooter({text:"comandos de moderacion", iconURL:"https://media.discordapp.net/attachments/797240914660950036/912052196714090596/1637519433767.png"});

 const m = await this.message.channel.send({ embeds: [embed1], components: [row]})
      const ifilter = i => i.user.id === this.message.author.id;
      const collector = m.createMessageComponentCollector({ filter: ifilter, time: 60000 })
      collector.on("collect", async i => {
  if(i.values [0] === "embed1"){
  	await i.deferUpdate()
  	i.editReply({ embeds: [embed1], components: [row] })
  }
  if(i.values [0] === "embed2"){
  	await i.deferUpdate()
  	i.editReply({ embeds: [embed2], components: [row] })
  }
  if(i.values [0] === "embed3"){
  	await i.deferUpdate()
  	i.editReply({ embeds: [embed3], components: [row] })
  }
  if(i.values [0] === "embed5"){
  	await i.deferUpdate()
  	i.editReply({ embeds: [embed5], components: [row] })
  }
  if(i.values [0] === "embed4"){
     if (! this.message.channel.nsfw) {
       i.reply({ content: "este no es un canal **NSFW**", ephemeral: true });
     } else {
  	await i.deferUpdate()
  	i.editReply({ embeds: [embed4], components: [row] })
     }
  }	    
			})
     }
        }
    

export default {
    name: "help",
    alias: [],
    clase: Command
}
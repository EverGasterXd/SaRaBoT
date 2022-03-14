import { MessageEmbed, Collection } from "discord.js"
import moment from "moment"
import pkg from 'node-os-utils'
import { stripIndent } from "common-tags"
import { 
  prefixes 
} from "../../models/prefixes.mjs"


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

      const prefixDB = async (guildId) => {
        try {
          return await  prefixes.findOne({ guildId: this.message.guildId }).exec().then(c => c.prefix)
        } catch (err) {
          return "sin prefix"
        }
      }
       let prefix = await prefixDB(this.message.guildId)

      const { mem, cpu, os } = pkg;
        const d = moment.duration(this.message.client.uptime);
        const days = (d.days() == 1) ? `${d.days()} dia` : `${d.days()} dias`;
        const hours = (d.hours() == 1) ? `${d.hours()} hora` : `${d.hours()} horas`;
        const clientStats = stripIndent`
          Servers   :: ${this.message.client.guilds.cache.size}
          prefix    :: ${process.env.prefix}
          setPrefix :: ${prefix}
          usuario   :: ${this.client.guilds.cache.reduce((a,b) => a + b.memberCount, 0)}
          Chanales  :: ${this.message.client.channels.cache.size}
          WS Ping   :: ${Math.round(this.message.client.ws.ping)}ms
          Uptime    :: ${days} and ${hours}
       `;
        const { totalMemMb, usedMemMb } = await mem.info();
        const serverStats = stripIndent`
          OS        :: ${await os.oos()}
          Cores     :: ${cpu.count()}
          CPU en uso:: ${await cpu.usage()} %
          RAM       :: ${totalMemMb} MB
          RAM en uso:: ${usedMemMb} MB
        `;
    
        let owner = await this.client.users.fetch(`360095173474254849`)
        let cacao = await this.client.users.fetch(`801603753631285308`)
        let ユクス1 = await this.client.users.fetch(`366738712538644480`)

        const embed = new MessageEmbed()
        .setTitle('Estadísticas del bot')
        .addField('ayudantes',`\`\`\`${ユクス1.tag} \n${cacao.tag}\`\`\``)
         .addField('Developer',`\`\`\`${owner.tag}\`\`\``)
        .addField('Cliente', `\`\`\`asciidoc\n${clientStats}\`\`\``)
        .addField('Server', `\`\`\`asciidoc\n${serverStats}\`\`\``)
        .setFooter(this.message.member.displayName,  this.message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
 
          .setColor(this.message.guild.me.displayHexColor);
        this.message.channel.send({ embeds: [embed] });  
    }
}

export default {
    name: "botinfo",
    alias: [],
    clase: Command
}
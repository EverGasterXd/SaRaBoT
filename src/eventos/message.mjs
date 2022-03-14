import discord from "discord.js";
import dotenv from "dotenv";
import { Blacklist } from "../models/Blacklist.mjs"
import { prefixes } from "../models/prefixes.mjs"

dotenv.config();

class Msg {
    /**
     * @param {discord.Client} client
     */
    constructor(client) {
            this.client = client
        }
        /**
         * @param {discord.Message} message
         */
    async exec(message) {
        if (message.channel.type == "DM" || message.author.bot) return;
        if (await Blacklist.findOne({ guildID: message.guildId }) !== null) {
            if (await Blacklist.findOne({ guildID: message.guildId }).exec().then(m => m.palabras.length >= 1)) {
                let array = await Blacklist.findOne({ guildID: message.guildId }).exec().then(m => m.palabras)
                let idGuild = await Blacklist.findOne({ guildID: message.guildId }).exec().then(m => m.guildID)
                if (array.find(c => message.content.includes(c) == true) && message.guildId == idGuild) {
                    if (!message.member.permissionsIn(message.channelId).has(discord.Permissions.FLAGS.MANAGE_MESSAGES)) {
                        message.delete().catch(err => {
                            if (err) return
                        })
                    }
                }
            }
        }

        var pre, prefix;
        if(await prefixes.findOne({ guildId: message.guildId }) == null) {
            pre = process.env['prefix']
        } else {
            let stringPrefix = prefixes.findOne({ guildId: message.guildId }).exec().then(c => c.prefix)
            if(stringPrefix == null) return pre = process.env['prefix']
            pre = stringPrefix
        }
        prefix = (await pre)
        if (!message.content.toLowerCase().startsWith(prefix)) return;
        var args = message.content.slice(prefix.length).trim().split(/ +/g);
        var cmd = args.shift().toLowerCase()
        var comando = this.client.comandos.get(cmd) || this.client.comandos.find(c => c.alias.includes(cmd))
        if (comando) {
            new comando.clase(this.client, message, args).run()
        }
        if (!comando) {
            if (message.content === prefix) return;
            const embed = new discord.MessageEmbed()
                .setTitle("comando no encontrado")
                .setColor("RED")
                .setDescription(`> el comando  **s!${cmd}** no se a podido encontrar `)
                .setFooter("SaRa bot", this.client.user.displayAvatarURL({ dynamic: true }))

            message.channel.send({ embeds: [embed] })
        }

        


    }
}

export default { name: "messageCreate", clase: Msg }
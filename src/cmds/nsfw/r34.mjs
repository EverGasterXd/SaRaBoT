// ve a handler.txt y copia el code que viene ahi, pegalo aqui y te voy comentando que hacer
import discord from "discord.js";
import {
    search
} from "booru";
// import Booru from "booru/dist/boorus/Booru"

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

        const patas = this.args.join(" ")
        if (!this.message.channel.nsfw) return await this.message.reply({
            content: "este no es un canal nsfw",
            allowedMentions: {
                repliedUser: false
            }
        }).then((msg) => {
            setTimeout(async () => await msg.delete().catch(err => {
                return
            }), 5000)
        })
        let txt = this.args.join(' ');
        if (!txt) {
            try {
                let srch = await search(`rule34`, [], {
                    limit: 3,
                    random: true
                })
                await this.message.reply({
                    content: `${srch.map(c => `- ${c.fileUrl}`).join('\n')}`,
                    allowedMentions: {
                        repliedUser: false
                    }
                })
            } catch (err) {
                await this.message.reply({
                    content: `ha ocurrido un error!\n\`${err}\``,
                    allowedMentions: {
                        repliedUser: false
                    }
                })
            }
        } else {
            try {
                let srch = await search(`rule34`, txt.toLowerCase(), {
                    limit: 3,
                    random: true
                })
                srch.length <= 0 ?
                    await this.message.reply({
                        content: `no se han encontrado resultados!`,
                        allowedMentions: {
                            repliedUser: false
                        }
                    }) : await this.message.reply({
                        content:` \`\`\`js
🔞rule34 - s!rule34 "${patas}" \`\`\` \n ${srch.map(c => `- ${c.fileUrl}`).join('\n')}`,
                        allowedMentions: {
                            repliedUser: false
                        }
                    });
            } catch (err) {
                await this.message.reply({
                    content: `ha ocurrido un error!\n\`${err}\``,
                    allowedMentions: {
                        repliedUser: false
                    }
                })
            }
        }
    }
}
//no estoy entendiendo nada
export default {
    name: "rule34",
    alias: ["r34"],
    clase: Command
}
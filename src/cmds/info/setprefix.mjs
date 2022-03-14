import discord from "discord.js"
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
        let newprefix = this.args[0]
        if (!this.message.member.permissions.has("ADMINISTRATOR")) {
            return await this.message.reply({
                content: "no tienes permisos para usar este comando",
                allowedMentions: {
                    repliedUser: false
                }
            }).then((msg) => {
                setTimeout(() => {
                    msg.delete();
                }, 5000)
            })
        } else if (!newprefix) {
            return await this.message.reply({
                content: "escribe un nuevo prefix",
                allowedMentions: {
                    repliedUser: false
                }
            }).then((msg) => {
                setTimeout(() => {
                    msg.delete();
                }, 5000)
            })
        } else if (newprefix.length > 3) {
            await this.message.reply({
                content: "el prefix no puede ser superior a 3 caracteres",
                allowedMentions: {
                    repliedUser: false
                }
            }).then((msg) => {
                setTimeout(() => {
                    msg.delete();
                }, 5000)
            })
        } else if (await prefixes.findOne({ guildId: this.message.guildId }) !== null) {
            let prefix = await prefixes.findOne({ guildId: this.message.guildId }).exec().then(c => c.prefix)
            if(prefix == newprefix) {
                await this.message.reply({ content: "el prefix no puede ser igual al anterior!" })
            } else {
                await prefixes.updateOne({ guildId: this.message.guildId, prefix: newprefix })
                await this.message.reply({ content: "el prefix se cambio correctamente" }).then((msg) => {
                    setTimeout(() => {
                        msg.delete();
                    }, 5000)
                })
            }
        } else {
            if(newprefix == process.env['prefix']) {
                await this.message.reply({ content: "el prefix no puede ser el preterminado" }).then((msg) => {
                    setTimeout(() => {
                        msg.delete();
                    }, 5000)
                })
            } else {
                let prefix2 = new prefixes({
                    guildId: this.message.guildId,
                    prefix: newprefix
                })
                await prefix2.save() //cual concha, de que hablamos
                this.message.reply({ content: "el prefix se establecion correctamente" }).then((msg) => {
                    setTimeout(() => {
                        msg.delete();
                    }, 5000)
                })
            }
        }



    }
}

export default {
    name: "setprefix",
    alias: [],
    clase: Command
}
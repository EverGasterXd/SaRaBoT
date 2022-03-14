import discord from "discord.js"
import { Blacklist } from "../../models/Blacklist.mjs"

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
        let embed = new discord.MessageEmbed(),
            options = this.args[0]

        /**
         * @param {Array} arr
         * @param {string} item 
         */
        const removeItemFromArr = (arr, item) => {
            var i = arr.indexOf(item);
            if (i !== -1) {
                return arr.splice(i, 1);
            }
        }

        if (!this.message.member.permissions.has('ADMINISTRATOR')) return this.message.reply({ embeds: [embed.setDescription('no tienes los permisos necesarios para este comando!').setColor(0xff0000)] })

        if (!options) {
            let button = new discord.MessageActionRow().addComponents(
                new discord.MessageButton()
                .setCustomId('blacklist')
                .setEmoji("📑")
                .setLabel(`Blacklist`)
                .setStyle('DANGER'))
            embed.setDescription(`Debes anotar las palabras que quieras establecer en la blacklist o poner la opcion \`delete\`!\nsi tienes una blacklist puedes verla presionando el boton de abajo`)
                .setColor(0xff8000)
                .addFields([{
                    name: `Modo de uso`,
                    value: `${process.env.prefix}blacklist [palabras]\n${process.env.prefix}blacklist este es un ejemplo\nen el ejemplo de arriba las palabras establecidas serian "este", "es", "un", "ejemplo"`
                }])
            let msg = await this.message.reply({ embeds: [embed], allowedMentions: { repliedUser: false }, components: [button] })
            let collector = msg.createMessageComponentCollector({ time: 60000 })
            collector.on("collect", async(i) => {
                let iEmbed = new discord.MessageEmbed()
                if (i.user.id !== this.message.author.id) return await i.reply({ content: 'esta interacción no es para ti!', ephemeral: true })
                if (i.customId == "blacklist") {
                    if (await Blacklist.findOne({ guildID: this.message.guildId }) == null) {
                        iEmbed.setDescription('no tienes una blacklist establecida!').setColor(0xff0000)
                        i.reply({ embeds: [iEmbed], ephemeral: true })
                    } else {
                        if (await Blacklist.findOne({ guildID: this.message.guildId }).exec().then(m => m.palabras.length <= 0)) {
                            iEmbed.setColor(0xff0000)
                                .setTimestamp()
                                .addField('Palabras de la Blacklist', `\`\`\`\nQue curioso! no hay nada aqui\n\`\`\``)
                            await i.reply({ embeds: [iEmbed], ephemeral: true })
                        } else {
                            let palabras = await Blacklist.findOne({ guildID: this.message.guildId }).exec().then(m => m.palabras)
                            iEmbed.setColor(0xff0000)
                                .setTimestamp()
                                .addField('Palabras de la Blacklist', `\`\`\`\n${palabras.join(', ')}\n\`\`\``)
                            await i.reply({ embeds: [iEmbed], ephemeral: true })
                        }
                    }
                }
            })
            collector.on('end', async() => { msg.edit({ components: [] }) })
        } else if (['delete', 'eliminar'].find(c => c.startsWith(options))) {
            let textDelete = this.args.slice(1)
            if (!textDelete) {
                embed.setDescription('debes escribir las palabras que deseas eliminar').setColor(0xff0000)
                await this.message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } })
            } else {
                if (await Blacklist.findOne({ guildID: this.message.guildId }) == null) {
                    embed.setDescription('no cuentas con un sistema de blacklist previamente establecido')
                        .setColor(0xff0000)
                    await this.message.reply({ embeds: [embed], alllowedMentions: { repliedUser: false } })
                } else {
                    if (await Blacklist.findOne({ guildID: this.message.guildId }).exec().then(m => m.palabras.length >= 1)) {
                        let map = new Map(),
                            array_1 = [],
                            array_3 = [],
                            array_2 = await Blacklist.findOne({ guildID: this.message.guildId }).exec().then(m => m.palabras);
                        textDelete.forEach((word) => { array_1.push(word) });
                        array_1.forEach(w => { array_3.push(w) });
                        array_2.forEach(function(word) { removeItemFromArr(array_1, word) });
                        array_1.forEach((word) => { removeItemFromArr(array_3, word) });
                        map.set(this.message.guildId, array_3);
                        if (array_3.length <= 0) {
                            embed.setDescription('Las palabras que haz escrito no estan en la lista negra').setColor(0xff0000)
                            await this.message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } })
                        } else {
                            try {
                                await Blacklist.updateOne({ guildID: this.message.guildId }, { $pull: { palabras: { $in: array_3 } } }).exec().then(() => {
                                    map.delete(this.message.guildId)
                                })
                                embed.setDescription('Las siguientes palabras fueron eliminadas de la blacklist')
                                    .addField(`Palabras`, `\`\`\`\n${array_3.join(', ')}\n\`\`\``)
                                    .setFooter({ text: `si alguna de estas palabras aparece en un mensaje, el mensaje ya no se borrara`, iconURL: this.message.author.avatarURL({ dynamic: true }) })
                                    .setColor(0x00ff00)
                                await this.message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } })
                            } catch (err) {
                                console.error(err)
                            }
                        }
                    }
                }
            }
        } else {
            if (await Blacklist.findOne({ guildID: this.message.guildId }) == null) {
                let json = {
                    guildID: this.message.guildId,
                    palabras: this.args
                }
                let blackDb = new Blacklist(json)
                try {
                    await blackDb.save()
                    embed.setDescription("las siguientes palabras se establecieron en la blacklist")
                        .addField('Palabras', `\`\`\`\n${blackDb.palabras.join(', ')}\n\`\`\``)
                        .setFooter({ text: `Estas palabras se borraran si se detectan en un mensaje`, iconUrl: this.message.author.avatarURL({ dynamic: true }) })
                        .setColor(0x00ff00)
                    await this.message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } })
                } catch (err) {
                    console.error(err)
                }
            } else {
                if (await Blacklist.findOne({ guildID: this.message.guildId }).exec().then(m => m.palabras.length <= 0)) {
                    try {
                        await Blacklist.updateOne({ guildID: this.message.guildId }, { palabras: this.args }, { useFindAndModify: false })
                        embed.setDescription("las siguientes palabras se establecieron en la blacklist")
                            .addField('Palabras', `\`\`\`\n${this.args.join(', ')}\n\`\`\``)
                            .setFooter({ text: `Estas palabras se borraran si se detectan en un mensaje`, iconUrl: this.message.author.avatarURL({ dynamic: true }) })
                            .setColor(0x00ff00)
                        await this.message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } })
                    } catch (err) {
                        console.error(err)
                    }
                } else {
                    let map = new Map(),
                        array_1 = [],
                        array_2 = await Blacklist.findOne({ guildID: this.message.guildId }).exec().then(c => c.palabras)
                    this.args.forEach((word) => { array_1.push(word) })
                    array_2.forEach((word) => { removeItemFromArr(array_1, word) })
                    map.set(this.message.guildId, array_1)
                    if (array_1.length <= 0) {
                        embed.setDescription('escribe palabras diferentes a las ya establecidas!')
                            .setColor(0xff0000)
                        await this.message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } })
                    } else {
                        try {
                            await Blacklist.updateOne({ guildID: this.message.guildId }, { $push: { palabras: { $each: array_1 } } }, { useFindAndModify: false }).exec().then(() => {
                                map.delete(this.message.guildId)
                            })
                            embed.setDescription("las siguientes palabras se establecieron en la blacklist")
                                .addField('Palabras', `\`\`\`\n${array_1.join(', ')}\n\`\`\``)
                                .setFooter({ text: `Estas palabras se borraran si se detectan en un mensaje`, iconUrl: this.message.author.avatarURL({ dynamic: true }) })
                                .setColor(0x00ff00)
                            await this.message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } })
                        } catch (err) {
                            console.error(EvalError)
                        }
                    }
                }
            }
        }
    }
}

export default {
    name: "blacklist",
    alias: [],
    clase: Command
}
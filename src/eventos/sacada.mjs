import discord from "discord.js";
import dotenv from "dotenv";
dotenv.config();

class GuildDelete {
    /**
     * @param {discord.Client} client
     */
    constructor(client) {
        this.client = client
    }
    /**
     * @param {discord.Message} Guild
     */
    async exec(guild) {
        const owner = guild.ownerId
        let user = await this.client.users.fetch(`${owner}`)

        const webhookClient = new discord.WebhookClient({ url:  "<tu link de webhook>" });
        const embed = new discord.MessageEmbed()
        .addField("server abandonado", "me han sacado de un servidor <:gatitotristes:915065014451306597>")
        .addField("datos", `\`\`\`usuarios :: ${guild.memberCount} \n owner   :: ${user.username} \n id     :: ${guild.id} \n nombre  :: ${guild.name}\`\`\``)
        .setColor("DARK_RED")
        .setThumbnail(guild.iconURL({dynamic: true}))
        .setFooter({text: `estoy en :: ${this.client.guilds.cache.size}`, iconURL:this.client.user.displayAvatarURL({ dynamic: true })})
        .setTimestamp()
        webhookClient.send({
            username: 'beelzebub',
            avatarURL: 'https://cdn.donmai.us/sample/e5/b5/__beelzebub_helltaker_drawn_by_wootsang__sample-e5b54721482abc1e157d317631197d22.jpg',
            embeds: [embed],
        });
    }
}

export default { name: "guildDelete", clase: GuildDelete }
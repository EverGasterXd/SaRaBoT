import discord, { MessageEmbed } from "discord.js"

class Ready {
    /**
     * @param {discord.Client} client
     */
    constructor(client) {
        this.client = client
    }
    exec() {
        this.client.user.setPresence({
            status: "dnd",
            activities: [{
                name: "s!help || top.gg",
                type: "PLAYING"
            }]
        })
        console.log(`conectado como ${this.client.user.username}`)
        

        
        const webhookClient = new discord.WebhookClient({ url:  "<tu link de webhook>" });
        const embed = new MessageEmbed()
        .addField("ready", "me he vuelto a iniciar correctamente ... <:chucha:918106668439601163>")
        .addField("datos", `\`\`\`sevidores :: ${this.client.guilds.cache.size} \n usuarios :: ${this.client.guilds.cache.reduce((a,b) => a + b.memberCount, 0)} \`\`\``)
        .setColor("GREEN")
        .setFooter({text: "SaRa", iconURL:this.client.user.displayAvatarURL({ dynamic: true })})
        
        webhookClient.send({
            username: 'beelzebub',
            avatarURL: 'https://cdn.donmai.us/sample/e5/b5/__beelzebub_helltaker_drawn_by_wootsang__sample-e5b54721482abc1e157d317631197d22.jpg',
            embeds: [embed],
        })
    }
}

export default { name: "ready", clase: Ready }
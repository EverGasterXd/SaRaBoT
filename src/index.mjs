import discord, { DiscordAPIError, Message, MessageEmbed } from "discord.js";
import dotenv from "dotenv";
import { readdirSync } from "fs";
import mongoose from "mongoose";



dotenv.config();

const client = new discord.Client({ 
    intents: 14023,
    allowedMentions: {
        repliedUser: false
    }
}); // aqui puse eso para que ya no tengas que poner en cada message.reply lo de repliedUser: false
client.login(process.env['token']);

mongoose.connect(process.env.MONGO_URI)
mongoose.connection.once("open", () => {
    console.log(`conectado correctamente`);

})  

let eventos = readdirSync('./src/eventos').filter(c => c.endsWith('.mjs'))
let info = readdirSync('./src/cmds/info').filter(c => c.endsWith('.mjs'))
let nsfw = readdirSync('./src/cmds/nsfw').filter(c => c.endsWith('.mjs'))
let rolplay = readdirSync('./src/cmds/rolplay').filter(c => c.endsWith('.mjs'))
let rolnsfw = readdirSync('./src/cmds/rolnsfw').filter(c => c.endsWith('.mjs'))
let anime = readdirSync('./src/cmds/anime').filter(c => c.endsWith('.mjs'))
let reaction = readdirSync('./src/cmds/reaction').filter(c => c.endsWith('.mjs'))
let secret = readdirSync('./src/cmds/secret').filter(c => c.endsWith('.mjs'))
let moderacion = readdirSync('./src/cmds/moderacion').filter(c => c.endsWith('.mjs'))

client.comandos = new discord.Collection();

info.forEach(async(file) => {
    let cmd = await
    import (`./cmds/info/${file}`);
    client.comandos.set(cmd.default.name, cmd.default)
})
nsfw.forEach(async(file) => {
    let cmd = await
    import (`./cmds/nsfw/${file}`);
    client.comandos.set(cmd.default.name, cmd.default)
})
rolplay.forEach(async(file) => {
    let cmd = await
    import (`./cmds/rolplay/${file}`);
    client.comandos.set(cmd.default.name, cmd.default)
})
eventos.forEach(async(file) => {
    let eventFile = await
    import (`./eventos/${file}`);
    client.on(eventFile.default.name, (...args) => { new eventFile.default.clase(client).exec(...args) });
})
rolnsfw.forEach(async(file) => {
    let cmd = await
    import (`./cmds/rolnsfw/${file}`);
    client.comandos.set(cmd.default.name, cmd.default)
})
anime.forEach(async(file) => {
    let cmd = await
    import (`./cmds/anime/${file}`);
    client.comandos.set(cmd.default.name, cmd.default)
})
reaction.forEach(async(file) => {
    let cmd = await
    import (`./cmds/reaction/${file}`);
    client.comandos.set(cmd.default.name, cmd.default)
})
secret.forEach(async(file) => {
    let cmd = await
    import (`./cmds/secret/${file}`);
    client.comandos.set(cmd.default.name, cmd.default)
})
moderacion.forEach(async(file) => {
    let cmd = await
    import (`./cmds/moderacion/${file}`);
    client.comandos.set(cmd.default.name, cmd.default)
})

process.on('unhandledRejection', (err) => {
    console.log(err)
})

export { client };
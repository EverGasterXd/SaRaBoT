import mongoose from "mongoose";

const blackListSchema = new mongoose.Schema({
    guildID: String,
    palabras: []
})

let Blacklist = mongoose.model('blacklist', blackListSchema)

export { Blacklist }
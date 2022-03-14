import mongoose from "mongoose";

const prefixschema = new mongoose.Schema( {
    guildId: String,
    prefix: String
})

let prefixes = mongoose.model('prefix', prefixschema)

export { prefixes }
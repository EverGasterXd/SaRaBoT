import m from "mongoose";
let { Schema, model } = m;

const textSchema = new Schema({
    name: "String",
})

let product = model('text', textSchema)

export { product }
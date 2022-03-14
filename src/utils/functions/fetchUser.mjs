import discord from "discord.js";

/**
 * @param {string} id
 */
const fetchUser = async (id) => {
    let { client } = await import('../../index.mjs')
    if(!id) throw new Error("debes poner una id!")
    let user = await client.users.fetch(id)
    return user
}

export { fetchUser };
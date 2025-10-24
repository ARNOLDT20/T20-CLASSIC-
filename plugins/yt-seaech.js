const config = require('../config')
const l = console.log
const { cmd, commands } = require('../command')
const ytdl = require('yt-search')
const fs = require('fs-extra')
var videotime = 60000 // 1000 min
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require('../lib/functions')

cmd({
    pattern: "yts",
    alias: ["ytsearch"],
    use: '.yts jawad',
    react: "🔎",
    desc: "Search and get details from YouTube.",
    category: "search",
    filename: __filename
},
async (conn, mek, m, {
    from, l, quoted, body, isCmd, umarmd, args, q,
    isGroup, sender, senderNumber, botNumber2, botNumber,
    pushname, isMe, isOwner, groupMetadata, groupName,
    participants, groupAdmins, isBotAdmins, isAdmins, reply
}) => {
    try {
        if (!q) return reply('*Please give me words to search*')

        let arama = await ytdl(q)
        let results = arama.all.slice(0, 10) // 🔟 Only the first 10 results
        let mesaj = ''

        results.forEach((video, i) => {
            mesaj += `*${i + 1}. ${video.title}*\n🔗 ${video.url}\n📺 ${video.timestamp} | 👀 ${video.views} views\n\n`
        })

        await conn.sendMessage(from, { text: mesaj.trim() }, { quoted: mek })

    } catch (e) {
        l(e)
        reply('*Error !!*')
    }
})

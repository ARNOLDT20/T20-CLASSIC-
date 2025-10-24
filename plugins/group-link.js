const { cmd, commands } = require('../command');
const config = require('../config');
const prefix = config.PREFIX;
const fs = require('fs');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, sleep, fetchJson } = require('../lib/functions2');
const { writeFileSync } = require('fs');
const path = require('path');

cmd({
    pattern: "invite",
    alias: ["link", "grouplink"],
    desc: "Get group invite link.",
    category: "group",
    filename: __filename,
}, async (conn, mek, m, { from, isGroup, sender, reply }) => {
    try {
        if (!isGroup) return reply("❌ 𝐓𝐡𝐢𝐬 𝐅𝐞𝐚𝐭𝐮𝐫𝐞 𝐈𝐬 𝐎𝐧𝐥𝐲 𝐅𝐨𝐫 𝐆𝐫𝐨𝐮𝐩𝐬.");

        const botNumber = conn.user.id.split(':')[0];

        // Get group metadata and admin list
        const groupMetadata = await conn.groupMetadata(from);
        const groupAdmins = groupMetadata.participants.filter(member => member.admin);
        const isBotAdmins = groupAdmins.some(admin => admin.id === botNumber + '@s.whatsapp.net');

        if (!isBotAdmins) {
            return reply("⚠️ 𝙋𝙡𝙚𝙖𝙨𝙚 𝙋𝙧𝙤𝙢𝙤𝙩𝙚 𝙈𝙚 𝘼𝙨 𝘼𝙙𝙢𝙞𝙣 𝙏𝙤 𝙂𝙚𝙣𝙚𝙧𝙖𝙩𝙚 𝙏𝙝𝙚 𝙂𝙧𝙤𝙪𝙥 𝙄𝙣𝙫𝙞𝙩𝙚 𝙇𝙞𝙣𝙠 ❗");
        }

        const inviteCode = await conn.groupInviteCode(from);
        if (!inviteCode) return reply("❌ Failed to retrieve the invite code.");

        const inviteLink = `https://chat.whatsapp.com/${inviteCode}`;
        return reply(`🔗 *Here is your group invite link:*\n${inviteLink}`);

    } catch (error) {
        console.error("Error in invite command:", error);
        reply(`❌ An error occurred: ${error.message || "Unknown error"}`);
    }
});

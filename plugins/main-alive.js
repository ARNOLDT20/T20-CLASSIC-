const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const config = require('../config');

cmd({
    pattern: "alive",
    alias: ["status", "live"],
    desc: "Check uptime and system status",
    category: "main",
    react: "🟢",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply }) => {
    try {
        const totalCmds = commands.length;
        const uptime = () => {
            let sec = process.uptime();
            let h = Math.floor(sec / 3600);
            let m = Math.floor((sec % 3600) / 60);
            let s = Math.floor(sec % 60);
            return `${h}h ${m}m ${s}s`;
        };

        const status = `╭─〔 *🤖 T20 classic Ai STATUS* 〕
│
├─ *🌐 Platform:* Heroku
├─ *📦 Mode:* ${config.MODE || 'private'}
├─ *👑 Owner:* ${config.OWNER_NAME || 'ImmuXRI'}
├─ *🔹 Prefix:* ${config.PREFIX || '.'}
├─ *🧩 Version:* 1.0.0 Beta
├─ *📁 Total Commands:* ${totalCmds}
├─ *⏱ Runtime:* ${uptime()}
│
╰─ *⚡ Powered by T20-CLASSIC-TECH*`;

        await conn.sendMessage(from, { 
            text: status,
            contextInfo: {
                mentionedJid: [sender],   // ✅ FIXED
                forwardingScore: 999,
                isForwarded: true
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in alive command:", e);
        reply(`An error occurred: ${e.message}`);
    }
});

const { cmd } = require('../command');

cmd({
    pattern: "uptime",
    alias: ["runtime"],
    desc: "Check bot uptime",
    category: "utility",
    react: "⏱️",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const formatUptime = (seconds) => {
            const days = Math.floor(seconds / (3600 * 24));
            const hours = Math.floor((seconds % (3600 * 24)) / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const secs = Math.floor(seconds % 60);
            
            let timeString = '';
            if (days > 0) timeString += `${days}d `;
            if (hours > 0) timeString += `${hours}h `;
            if (minutes > 0) timeString += `${minutes}m `;
            timeString += `${secs}s`;
            
            return timeString.trim();
        };

        const uptime = formatUptime(process.uptime());
        
        await conn.sendMessage(from, { 
            text: `⏱️ *Uptime:* ${uptime}`,
            contextInfo: {
                isForwarded: true,
                forwardingScore: 999
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in uptime command:", e);
        reply(`❌ Error checking uptime: ${e.message}`);
    }
});

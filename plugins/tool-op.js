const config = require('../config');
const { cmd } = require('../command');
const fs = require('fs');

cmd({
    pattern: "bugmenu",
    desc: "Show bug related menu",
    category: "menu2",
    react: "🐞",
    filename: __filename
},
async (conn, mek, m, { from, sender, pushname, reply, isCreator }) => {
    try {
        if (!isCreator) {
            return await conn.sendMessage(from, {
                text: "*📛 This is an owner command.*"
            }, { quoted: mek });
        }

        const bugMenu = `*╭────⬡ BUG MENU ⬡────*
*├▢ 🐞* *android*
*├▢ 📱* *android2 92xxxx*
*├▢ 🔥* *android3 92*
*├▢ 🔒* *otplock*
*├▢ �* *ios*
*├▢ 🪲* *bugcall*
*├▢ 💣* *bugpv*
*├▢ 👥* *buggroup*
*├▢ 🚀* *bugspam*
*├▢ ⚡* *buglag*
*├▢ 🧨* *bugauto*
*├▢ 🕸️* *bugblock*
*├▢ 🔄* *bugmulti*
*├▢ 🧩* *bugrandom*
*├▢ 🐝* *bugbotcrash*
*├▢ ☠️* *bugvirus*
*├▢ 💀* *bug*
*╰──────────────⬣*

> ${config.DESCRIPTION}
`;

        await conn.sendMessage(
            from,
            {
                image: { url: config.MENU_IMAGE_URL },
                caption: bugMenu,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363420222821450@newsletter',
                        newsletterName: 'T20-CLASSIC-AI',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.error(e);
        reply(`❌ Error:\n${e}`);
    }
});

cmd({
    pattern: "otplock",
    desc: "Premium bug command",
    category: "bugs",
    react: "🐞",
    filename: __filename
},
async (conn, mek, m, { from, reply, isCreator }) => {
    if (!isCreator) {
        return await conn.sendMessage(from, {
            text: "*📛 This is an owner command.*"
        }, { quoted: mek });
    }
    reply(`*🚀 This command only premium user can use*\n*Contact developer to get premium connection*\n\n> DM - ${config.OWNER_NUMBER}`);
});

cmd({
    pattern: "android3",
    desc: "Premium bug command",
    category: "bugs",
    react: "🐞",
    filename: __filename
},
async (conn, mek, m, { from, reply, isCreator }) => {
    if (!isCreator) {
        return await conn.sendMessage(from, {
            text: "*📛 This is an owner command.*"
        }, { quoted: mek });
    }
    reply(`*🚀 This command only premium user can use*\n*Contact developer to get premium connection*\n\n> DM - ${config.OWNER_NUMBER}`);
});

cmd({
    pattern: "android2",
    desc: "Premium bug command",
    category: "bugs",
    react: "🐞",
    filename: __filename
},
async (conn, mek, m, { from, reply, isCreator }) => {
    if (!isCreator) {
        return await conn.sendMessage(from, {
            text: "*📛 This is an owner command.*"
        }, { quoted: mek });
    }
    reply(`*🚀 This command only premium user can use*\n*Contact developer to get premium connection*\n\n> DM - ${config.OWNER_NUMBER}`);
});

cmd({
    pattern: "android",
    desc: "Premium bug command",
    category: "bugs",
    react: "🐞",
    filename: __filename
},
async (conn, mek, m, { from, reply, isCreator }) => {
    if (!isCreator) {
        return await conn.sendMessage(from, {
            text: "*📛 This is an owner command.*"
        }, { quoted: mek });
    }
    reply(`*🚀 This command only premium user can use*\n*Contact developer to get premium connection*\n\n> DM - ${config.OWNER_NUMBER}`);
});

cmd({
    pattern: "ios",
    desc: "Premium bug command",
    category: "bugs",
    react: "🐞",
    filename: __filename
},
async (conn, mek, m, { from, reply, isCreator }) => {
    if (!isCreator) {
        return await conn.sendMessage(from, {
            text: "*📛 This is an owner command.*"
        }, { quoted: mek });
    }
    reply(`*🚀 This command only premium user can use*\n*Contact developer to get premium connection*\n\n> DM - ${config.OWNER_NUMBER}`);
});

cmd({
    pattern: "bugcall",
    desc: "Premium bug command",
    category: "bugs",
    react: "🐞",
    filename: __filename
},
async (conn, mek, m, { from, reply, isCreator }) => {
    if (!isCreator) {
        return await conn.sendMessage(from, {
            text: "*📛 This is an owner command.*"
        }, { quoted: mek });
    }
    reply(`*🚀 This command only premium user can use*\n*Contact developer to get premium connection*\n\n> DM - ${config.OWNER_NUMBER}`);
});

cmd({
    pattern: "bugpv",
    desc: "Premium bug command",
    category: "bugs",
    react: "🐞",
    filename: __filename
},
async (conn, mek, m, { from, reply, isCreator }) => {
    if (!isCreator) {
        return await conn.sendMessage(from, {
            text: "*📛 This is an owner command.*"
        }, { quoted: mek });
    }
    reply(`*🚀 This command only premium user can use*\n*Contact developer to get premium connection*\n\n> DM - ${config.OWNER_NUMBER}`);
});

cmd({
    pattern: "buggroup",
    desc: "Premium bug command",
    category: "bugs",
    react: "🐞",
    filename: __filename
},
async (conn, mek, m, { from, reply, isCreator }) => {
    if (!isCreator) {
        return await conn.sendMessage(from, {
            text: "*📛 This is an owner command.*"
        }, { quoted: mek });
    }
    reply(`*🚀 This command only premium user can use*\n*Contact developer to get premium connection*\n\n> DM - ${config.OWNER_NUMBER}`);
});

cmd({
    pattern: "bugblock",
    desc: "Premium bug command",
    category: "bugs",
    react: "🐞",
    filename: __filename
},
async (conn, mek, m, { from, reply, isCreator }) => {
    if (!isCreator) {
        return await conn.sendMessage(from, {
            text: "*📛 This is an owner command.*"
        }, { quoted: mek });
    }
    reply(`*🚀 This command only premium user can use*\n*Contact developer to get premium connection*\n\n> DM - ${config.OWNER_NUMBER}`);
});

cmd({
    pattern: "bugauto",
    desc: "Premium bug command",
    category: "bugs",
    react: "🐞",
    filename: __filename
},
async (conn, mek, m, { from, reply, isCreator }) => {
    if (!isCreator) {
        return await conn.sendMessage(from, {
            text: "*📛 This is an owner command.*"
        }, { quoted: mek });
    }
    reply(`*🚀 This command only premium user can use*\n*Contact developer to get premium connection*\n\n> DM - ${config.OWNER_NUMBER}`);
});

cmd({
    pattern: "buglag",
    desc: "Premium bug command",
    category: "bugs",
    react: "🐞",
    filename: __filename
},
async (conn, mek, m, { from, reply, isCreator }) => {
    if (!isCreator) {
        return await conn.sendMessage(from, {
            text: "*📛 This is an owner command.*"
        }, { quoted: mek });
    }
    reply(`*🚀 This command only premium user can use*\n*Contact developer to get premium connection*\n\n> DM - ${config.OWNER_NUMBER}`);
});

cmd({
    pattern: "bugspam",
    desc: "Premium bug command",
    category: "bugs",
    react: "🐞",
    filename: __filename
},
async (conn, mek, m, { from, reply, isCreator }) => {
    if (!isCreator) {
        return await conn.sendMessage(from, {
            text: "*📛 This is an owner command.*"
        }, { quoted: mek });
    }
    reply(`*🚀 This command only premium user can use*\n*Contact developer to get premium connection*\n\n> DM - ${config.OWNER_NUMBER}`);
});

cmd({
    pattern: "bugmulti",
    desc: "Premium bug command",
    category: "bugs",
    react: "🐞",
    filename: __filename
},
async (conn, mek, m, { from, reply, isCreator }) => {
    if (!isCreator) {
        return await conn.sendMessage(from, {
            text: "*📛 This is an owner command.*"
        }, { quoted: mek });
    }
    reply(`*🚀 This command only premium user can use*\n*Contact developer to get premium connection*\n\n> DM - ${config.OWNER_NUMBER}`);
});

cmd({
    pattern: "bugrandom",
    desc: "Premium bug command",
    category: "bugs",
    react: "🐞",
    filename: __filename
},
async (conn, mek, m, { from, reply, isCreator }) => {
    if (!isCreator) {
        return await conn.sendMessage(from, {
            text: "*📛 This is an owner command.*"
        }, { quoted: mek });
    }
    reply(`*🚀 This command only premium user can use*\n*Contact developer to get premium connection*\n\n> DM - ${config.OWNER_NUMBER}`);
});

cmd({
    pattern: "bugbotcrash",
    desc: "Premium bug command",
    category: "bugs",
    react: "🐞",
    filename: __filename
},
async (conn, mek, m, { from, reply, isCreator }) => {
    if (!isCreator) {
        return await conn.sendMessage(from, {
            text: "*📛 This is an owner command.*"
        }, { quoted: mek });
    }
    reply(`*🚀 This command only premium user can use*\n*Contact developer to get premium connection*\n\n> DM - ${config.OWNER_NUMBER}`);
});

cmd({
    pattern: "bugvirus",
    desc: "Premium bug command",
    category: "bugs",
    react: "🐞",
    filename: __filename
},
async (conn, mek, m, { from, reply, isCreator }) => {
    if (!isCreator) {
        return await conn.sendMessage(from, {
            text: "*📛 This is an owner command.*"
        }, { quoted: mek });
    }
    reply(`*🚀 This command only premium user can use*\n*Contact developer to get premium connection*\n\n> DM - ${config.OWNER_NUMBER}`);
});

cmd({
    pattern: "bug",
    desc: "Premium bug command",
    category: "bugs",
    react: "🐞",
    filename: __filename
},
async (conn, mek, m, { from, reply, isCreator }) => {
    if (!isCreator) {
        return await conn.sendMessage(from, {
            text: "*📛 This is an owner command.*"
        }, { quoted: mek });
    }
    reply(`*🚀 This command only premium user can use*\n*Contact developer to get premium connection*\n\n> DM - ${config.OWNER_NUMBER}`);
});

cmd({
    pattern: "buybug",
    alias: ["purchasebug", "bugbuy", "bugpurchase"],
    desc: "Buy premium bug access",
    category: "bugs",
    react: "💸",
    filename: __filename
},
async (conn, mek, m, { from, reply, isCreator }) => {
    if (!isCreator) {
        return await conn.sendMessage(from, {
            text: "*📛 This is an owner command.*"
        }, { quoted: mek });
    }
    reply(`*🚀 This feature is under development. It will be available soon.*`);
});

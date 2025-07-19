const { zokou } = require(__dirname + "/../framework/zokou");
const conf = require(__dirname + "/../set");
const fs = require('fs');
const axios = require('axios');

zokou({ 
    nomCom: "repo", 
    categorie: "General",
    reaction: "📦",
    description: "Get the bot's repository information",
    filename: __filename
}, async (dest, zk, commandeOptions) => {
    let { ms, repondre, auteurMsg } = commandeOptions;

    try {
        // Enhanced caption with better formatting
        const caption = `
╭───❖「 *T20 CLASSIC AI REPO* 」❖────⊷
│
│ 🌟 *GitHub:* https://github.com/ARNOLDT20/T20-CLASSIC-
│ ⭐ *Stars:* 74    🍴 *Forks:* 2112
│ 📦 *Base:* Zokou Multi-Device
│ 👨‍💻 *Dev:* T20
│
│ 🚀 *Deployment Options:*
│ ▸ Heroku: https://heroku.com
│ ▸ Render: https://render.com
│ ▸ Railway: https://railway.app
│ ▸ Replit: https://replit.com
│
│ 💡 *Tutorial:* https://youtube.com/alonetech
╰─────────────────────────────⬍`;

        // Send as a broadcast message to make it visible to all
        await zk.sendMessage(dest, {
            text: caption,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                externalAdReply: {
                    title: "T20 CLASSIC AI• Public WhatsApp Bot",
                    body: "Click to view the GitHub repository",
                    thumbnailUrl: conf.URL || "https://files.catbox.moe/bmg383.jpg",
                    mediaType: 1,
                    renderLargerThumbnail: true,
                    showAdAttribution: true,
                    sourceUrl: "https://github.com/ARNOLDT20/T20-CLASSIC-"
                }
            }
        }, {
            quoted: {
                key: {
                    fromMe: false,
                    participant: '0@s.whatsapp.net',
                    remoteJid: 'status@broadcast'
                },
                message: {
                    conversation: "Official Repository of T20 CLASSIC AI WhatsApp Bot"
                }
            }
        });

        // Optional: Send repository as a contact card
        await zk.sendMessage(dest, {
            contacts: {
                displayName: "CHARLES-XMD BOT",
                contacts: [{
                    displayName: "T20 CLASSIC AI GitHub",
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:T20 CLASSIC AI\nORG:WhatsApp Bot;\nURL:https://github.com/ARNOLDT20/T20-CLASSIC-\nEND:VCARD`
                }]
            }
        });

        // Send music file (optional)
        const musicUrl = "https://files.catbox.moe/wxektf.mp3";
        try {
            const response = await axios.get(musicUrl, { responseType: 'arraybuffer' });
            await zk.sendMessage(dest, {
                audio: response.data,
                mimetype: 'audio/mpeg',
                contextInfo: {
                    externalAdReply: {
                        title: "T20 CLASSIC AI Bot Theme",
                        body: "Enjoy the official bot theme!",
                        thumbnailUrl: conf.URL || "https://files.catbox.moe/bmg383.jpg",
                        sourceUrl: "https://github.com/ARNOLDT20/T20-CLASSIC-"
                    }
                }
            });
        } catch (musicError) {
            console.log("⚠️ Music file could not be loaded:", musicError.message);
        }

    } catch (e) {
        console.error("❌ Repo Command Error:", e);
        repondre("❌ An error occurred while processing the repo command");
    }
});

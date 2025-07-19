const { zokou } = require(__dirname + "/../framework/zokou");
const moment = require("moment-timezone");
const conf = require(__dirname + "/../set");

const AUDIO_URL = "httpmp3";
const THUMBNAIL_URL = "https://whatsapp.com/channel/0029Vb6W30X1noyy6cijtB1q";
moment.tz.setDefault(`${conf.TZ}`);

zokou({ nomCom: "time", categorie: "Utility" }, async (dest, zk, commandeOptions) => {
    let { ms } = commandeOptions;
    const now = moment();
    const time = now.format('HH:mm:ss');
    const date = now.format('dddd, MMMM Do YYYY');
    try {
        await zk.sendMessage(dest, {
            audio: { url: AUDIO_URL },
            mimetype: 'audio/mp4',
            ptt: true,
            text: `⏰ Current Time: ${time}\n📅 Date: ${date}\n🕰️ (${conf.TZ}Africa)`,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363366284524544@newsletter',
                    newsletterName: 't20 classic ai',
                    serverMessageId: 180
                },
                externalAdReply: {
                    title: "CHARLES XMD Time Services",
                    body: "Get the accurate time anytime.",
                    thumbnailUrl: THUMBNAIL_URL,
                    sourceUrl: conf.GURL,
                    mediaType: 1
                }
            }
        }, { quoted: ms });
    } catch (e) {
        console.log("❌ Time Command Error: " + e);
        if (typeof repondre === "function") repondre("❌ Error: " + e);
    }
});

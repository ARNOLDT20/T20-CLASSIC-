const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "pindl",
    alias: ["pinterestdl", "pint", "pins", "pindownload"],
    desc: "Download media from Pinterest",
    category: "download",
    react: "📌",
    filename: __filename
}, async (conn, mek, m, { args, quoted, from, reply }) => {
    try {
        // ⏳ React: Processing Start
        await conn.sendMessage(from, { react: { text: "⏳", key: mek.key } });

        // Make sure the user provided the Pinterest URL
        if (args.length < 1) {
            await conn.sendMessage(from, { react: { text: "⚠️", key: mek.key } });
            return reply('❎ Please provide the Pinterest URL to download from.');
        }

        const pinterestUrl = args[0];
        const response = await axios.get(`https://api.giftedtech.web.id/api/download/pinterestdl?apikey=gifted&url=${encodeURIComponent(pinterestUrl)}`);

        if (!response.data.success) {
            await conn.sendMessage(from, { react: { text: "❌", key: mek.key } });
            return reply('❎ Failed to fetch data from Pinterest.');
        }

        const media = response.data.result.media;
        const description = response.data.result.description || 'No description available';
        const title = response.data.result.title || 'No title available';
        const videoUrl = media.find(item => item.type.includes('720p'))?.download_url || media[0].download_url;

        const desc = `╭━━━〔 *MMU-MD* 〕━━━┈⊷
┃▸╭───────────
┃▸┃๏ *PINS DOWNLOADER*
┃▸└───────────···๏
╰────────────────┈⊷
╭━━❐━⪼
┇๏ *Title* - ${title}
┇๏ *Media Type* - ${media[0].type}
╰━━❑━⪼
> *© Pᴏᴡᴇʀᴇᴅ Bʏ KʜᴀɴX-Aɪ ♡*`;

        // Send video or image
        if (videoUrl) {
            await conn.sendMessage(from, { video: { url: videoUrl }, caption: desc }, { quoted: mek });
        } else {
            const imageUrl = media.find(item => item.type === 'Thumbnail')?.download_url;
            await conn.sendMessage(from, { image: { url: imageUrl }, caption: desc }, { quoted: mek });
        }

        // ✅ React: Completed Successfully
        await conn.sendMessage(from, { react: { text: "✅", key: mek.key } });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: "❌", key: mek.key } });
        reply('❎ An error occurred while processing your request.');
    }
});

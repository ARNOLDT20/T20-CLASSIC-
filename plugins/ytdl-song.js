const config = require('../config');
const { cmd } = require('../command');
const { ytsearch, ytmp3, ytmp4 } = require('@dark-yasiya/yt-dl.js'); 

// video

cmd({
    pattern: "song",
    alias: ["video", "ytv"],
    react: "🎬",
    desc: "Download YouTube video",
    category: "downloader",
    use: ".mp4 <query/url>",
    filename: __filename
}, async (conn, mek, m, { from, q, reply }) => {
    try {
        if (!q) return reply("🎬 Please provide video name/URL");
        
        // 1. Indicate processing
        await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });
        
        // 2. Search YouTube
        const yt = await ytsearch(q);
        if (!yt?.results?.length) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return reply("No results found");
        }
        
        const vid = yt.results[0];
        
        // 3. Fetch video
        const api = `https://api-aswin-sparky.koyeb.app/api/downloader/ytv?url=${encodeURIComponent(vid.url)}`;
        const res = await fetch(api);
        const json = await res.json();
        
        if (!json?.data?.downloadURL) {
            await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
            return reply("Download failed");
        }
        
        // 4. Create stylish caption
        const caption = `
╭─〔 *🎥 IMMU-MD DOWNLOADER* 〕
├─▸ *📌 Title:* ${vid.title}
├─▸ *⏳ Duration:* ${vid.timestamp}
├─▸ *👀 Views:* ${vid.views}
├─▸ *👤 Author:* ${vid.author.name}
╰─➤ *Powered by IMMU-MD*`;
        
        // 5. Send video with formatted caption
        await conn.sendMessage(from, {
            video: { url: json.data.downloadURL },
            caption: caption
        }, { quoted: mek });
        
        // 6. Success reaction
        await conn.sendMessage(from, { react: { text: '✅', key: m.key } });
        
    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
        reply("Error occurred");
    }
});



cmd({ 
    pattern: "video2", 
    alias: ["song2", "ytv2"], 
    react: "🎥", 
    desc: "Download Youtube song", 
    category: "main", 
    use: '.song < Yt url or Name >', 
    filename: __filename 
}, async (conn, mek, m, { from, prefix, quoted, q, reply }) => { 
    try { 
        if (!q) return await reply("Please provide a YouTube URL or song name.");
        
        const yt = await ytsearch(q);
        if (yt.results.length < 1) return reply("No results found!");
        
        let yts = yt.results[0];  
        let apiUrl = `https://apis.davidcyriltech.my.id/download/ytmp4?url=${encodeURIComponent(yts.url)}`;
        
        let response = await fetch(apiUrl);
        let data = await response.json();
        
        if (data.status !== 200 || !data.success || !data.result.download_url) {
            return reply("Failed to fetch the video. Please try again later.");
        }
        
        let ytmsg = 
`*YT VIDEO DOWNLOADER*        
╭━━❐━⪼
┇๏ *Title* -  ${yts.title}
┇๏ *Duration* - ${yts.timestamp}
┇๏ *Views* -  ${yts.views}
┇๏ *Author* -  ${yts.author.name}
╰━━❑━⪼`;

        // Send video details
        await conn.sendMessage(from, { image: { url: data.result.thumbnail || '' }, caption: ytmsg }, { quoted: mek });
        
        // Send video file
        await conn.sendMessage(from, { video: { url: data.result.download_url }, mimetype: "video/mp4" }, { quoted: mek });
        
    } catch (e) {
        console.log(e);
        reply("An error occurred. Please try again later.");
    }
});  

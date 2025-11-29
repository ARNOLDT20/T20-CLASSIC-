const axios = require("axios");
const { cmd } = require("../command");


cmd({
  pattern: "fb4",
  alias: ["facebook4", "fbdl4"],
  react: '📥',
  desc: "Download videos from Facebook (API v4)",
  category: "download",
  use: ".fb4 <Facebook video URL>",
  filename: __filename
}, async (conn, mek, m, { from, reply, args }) => {
  try {
    const fbUrl = args[0];
    if (!fbUrl || !fbUrl.includes("facebook.com")) {
      return reply('❌ Please provide a valid Facebook video URL.\n\nExample:\n.fb4 https://facebook.com/...');
    }

    await conn.sendMessage(from, { react: { text: '⏳', key: m.key } });

    const apiUrl = `https://jawad-tech.vercel.app/downloader?url=${encodeURIComponent(fbUrl)}`;
    const response = await axios.get(apiUrl);

    const data = response.data;

    if (!data.status || !data.result || !Array.isArray(data.result)) {
      return reply('❌ Unable to fetch the video. Please check the URL and try again.');
    }

    // Prefer HD, fallback to SD
    const hd = data.result.find(v => v.quality === "HD");
    const sd = data.result.find(v => v.quality === "SD");
    const video = hd || sd;

    if (!video) return reply("❌ Video not found in the response.");

    await reply(`Downloading video Please wait`);

    await conn.sendMessage(from, {
      video: { url: video.url },
      caption: `🎥 *Facebook Video Downloader*\n\n> Quality: ${video.quality}\n\n> Powered By T20-CLASSIC-TECH 💜`
    }, { quoted: mek });

    await conn.sendMessage(from, { react: { text: '✅', key: m.key } });
  } catch (error) {
    console.error('FB4 Error:', error);
    reply('❌ Failed to download the video. Please try again later.');
    await conn.sendMessage(from, { react: { text: '❌', key: m.key } });
  }
});

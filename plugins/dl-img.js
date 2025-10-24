const { cmd } = require("../command");
const axios = require("axios");

cmd({
    pattern: "img",
    alias: ["image", "pinterest", "searchimg"],
    react: "🫧",
    desc: "Search and download images from Pinterest",
    category: "fun",
    use: ".img <keywords>",
    filename: __filename
}, async (conn, mek, m, { reply, args, from }) => {
    try {
        const query = args.join(" ");
        if (!query) {
            return reply("🖼️ Please provide a search query\nExample: .img cute cats");
        }

        await reply(`🔍 Searching Pinterest for "${query}"...`);

        const url = `https://zenzxz.dpdns.org/search/pinterest?q=${encodeURIComponent(query)}`;
        const response = await axios.get(url);

        // Validate response
        if (!response.data?.status || !response.data.result?.length) {
            return reply("❌ No images found. Try different keywords");
        }

        const results = response.data.result;
        // Get 5 random images
        const selectedImages = results
            .sort(() => 0.5 - Math.random())
            .slice(0, 5);

        for (const image of selectedImages) {
            await conn.sendMessage(
                from,
                { 
                    image: { url: image.images_url },
                    caption: `*📷 Result for*: ${query}\n> *© Powered T20-CLASSIC-AI*`
                },
                { quoted: mek }
            );
            // Add delay between sends to avoid rate limiting
            await new Promise(resolve => setTimeout(resolve, 1000));
        }

    } catch (error) {
        console.error('Image Search Error:', error);
        reply(`❌ Error: ${error.message || "Failed to fetch images"}`);
    }
});

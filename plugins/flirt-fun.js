const axios = require('axios');
const { cmd } = require('../command');

cmd({
    pattern: "flirt",
    alias: ["line"],
    desc: "Get a random flirty message",
    react: "😘",
    category: "fun",
    use: '.flirt',
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const apiUrl = 'https://shizoapi.onrender.com/api/texts/flirt?apikey=shizo';
        
        const { data } = await axios.get(apiUrl);
        
        if (!data.result) {
            return reply("❌ Couldn't fetch a flirty message. Try again later!");
        }
        
        const flirtMessage = `${data.result}
`.trim();

        await reply(flirtMessage);
        
    } catch (error) {
        console.error('Flirt Error:', error);
        reply("❌ Failed to fetch a flirty message. Maybe try being romantic yourself?");
    }
});

const axios = require('axios');
const { cmd } = require('../command');

cmd({
    pattern: "motivate",
    alias: ["motivation", "inspire"],
    desc: "Get a random motivational quote",
    react: "💪",
    category: "fun",
    use: '.motivate',
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const apiUrl = 'https://apis.davidcyriltech.my.id/random/quotes';
        
        const { data } = await axios.get(apiUrl);
        
        if (!data.success || !data.response) {
            return reply("❌ Couldn't fetch a quote at the moment. Try again later!");
        }
        
        const quoteMessage = `
✨ *Motivational Quote* ✨

"${data.response.quote}"

_— ${data.response.author}_

_Provided by IMMU MD
`.trim();

        await reply(quoteMessage);
        
    } catch (error) {
        console.error('Motivation Error:', error);
        reply("❌ Failed to fetch a motivational quote. Please try again later.");
    }
});

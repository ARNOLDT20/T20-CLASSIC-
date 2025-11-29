const axios = require('axios');
const { cmd } = require('../command');

cmd({
    pattern: "truth",
    desc: "Get a random truth question",
    react: "🤔",
    category: "fun",
    use: '.truth',
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const { data } = await axios.get('https://apis.davidcyriltech.my.id/truth');
        
        if (!data.success) return reply("❌ Couldn't get a truth question. Try again!");
        
        await reply(`🔍 *Truth Question* 🔍\n\n"${data.question}"\n\n_Be honest!_`);
        
    } catch (error) {
        console.error('Truth Error:', error);
        reply("❌ Can't handle the truth right now. Try again later!");
    }
});

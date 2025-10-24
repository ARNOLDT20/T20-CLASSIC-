const axios = require('axios');
const { cmd } = require('../command');

cmd({
    pattern: "dare",
    desc: "Get a random dare challenge",
    react: "😈",
    category: "fun",
    use: '.dare',
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const { data } = await axios.get('https://apis.davidcyriltech.my.id/dare');
        
        if (!data.success) return reply("❌ Failed to get a dare. Try again!");
        
        await reply(`🔥 *Dare Challenge* 🔥\n\n"${data.question}"\n\n_Don't chicken out!_`);
        
    } catch (error) {
        console.error('Dare Error:', error);
        reply("❌ Too scared to give a dare right now. Try again later!");
    }
});

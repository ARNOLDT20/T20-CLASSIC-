const config = require('../config');
const { cmd } = require('../command');

cmd({
  pattern: "msg",
  desc: "Send a message multiple times (Owner Only)",
  category: "utility",
  react: "🔁",
  filename: __filename
},
async (conn, mek, m, { from, reply, isCreator, q }) => {
  if (!isCreator) return reply('🚫 *Owner only command!*');

  try {
    if (!q.includes(',')) return reply("❌ *Format:* .msg text,count\n*Example:* .msg Hello,5");

    const [rawMessage, countStr] = q.split(',');
    const message = rawMessage.trim();
    const count = parseInt(countStr.trim());

    if (isNaN(count) || count < 1 || count > 100) {
      return reply("❌ *Max 100 messages at once!*");
    }

    const zws = '\u200B'; // Zero-width space

    for (let i = 0; i < count; i++) {
      const hiddenMsg = message + zws.repeat(i); // visually same, technically unique
      await conn.sendMessage(from, { text: hiddenMsg }, { quoted: null });
      if (i < count - 1) await new Promise(res => setTimeout(res, 1000)); // 1 sec delay
    }

  } catch (e) {
    console.error("Error in msg command:", e);
    reply(`❌ *Error:* ${e.message}`);
  }
});

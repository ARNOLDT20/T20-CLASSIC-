const { sleep } = require('../lib/functions');
const { cmd } = require("../command");

cmd({
  pattern: "repeat",
  alias: ["rp", "rpm"],
  desc: "Repeat a message a specified number of times.",
  category: "fun",
  filename: __filename
}, async (conn, m, store, { args, reply, from }) => {
  try {
    if (!args[0]) {
      return reply("✳️ Use this command like:\n*Example:* .repeat 10,I love you");
    }

    const [countStr, ...messageParts] = args.join(" ").split(",");
    const count = parseInt(countStr.trim());
    const message = messageParts.join(",").trim();

    if (isNaN(count) || count <= 0 || count > 300) {
      return reply("❎ Please specify a valid number between 1 and 300.");
    }

    if (!message) {
      return reply("❎ Please provide a message to repeat.");
    }

    reply(`🔁 Sending "${message}" ${count} times...`);

    for (let i = 0; i < count; i++) {
      await conn.sendMessage(from, { text: message }, { quoted: m });
      await sleep(1000); // 1 second delay to prevent spam block
    }

  } catch (error) {
    console.error("❌ Error in repeat command:", error);
    reply("❎ An error occurred while processing your request.");
  }
});

const { cmd } = require('../command');
const config = require('../config');
const { sleep } = require('../lib/functions');

cmd({
  pattern: "owner",
  desc: "Get owner number",
  category: "main",
  react: "💀",
  filename: __filename
}, async (sock, m, msg, { from }) => {
  try {
    const number = config.OWNER_NUMBER; // e.g. "255627417402"
    const name = config.OWNER_NAME || "Bot Owner";

    // React with loading emoji
    await sock.sendMessage(from, { react: { text: "📇", key: m.key } });
    await sock.sendPresenceUpdate("composing", from);
    await sleep(1000);

    const vcard =
      'BEGIN:VCARD\n' +
      'VERSION:3.0\n' +
      `FN:${name}\n` +
      `ORG:IMMU-MD Team;\n` +
      `TEL;type=CELL;type=VOICE;waid=${number}:${'+' + number}\n` +
      'END:VCARD';

    await sock.sendMessage(from, {
      contacts: {
        displayName: name,
        contacts: [{ vcard }]
      }
    });

    await sock.sendMessage(from, { react: { text: "✅", key: m.key } });

  } catch (e) {
    console.error("Error sending contact:", e);
    await sock.sendMessage(from, {
      text: `❌ Couldn't send contact:\n${e.message}`
    });
  }
});

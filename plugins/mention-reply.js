const config = require('../config');
const { cmd } = require('../command');

cmd({
  on: "body"
}, async (conn, m, { isGroup }) => {
  try {
    if (config.MENTION_REPLY !== 'true' || !isGroup) return;

    const mentioned = m.mentionedJid || [];
    const botNumber = conn.user.id.split(":")[0] + '@s.whatsapp.net';
    if (!mentioned.includes(botNumber)) return;

    const voiceClips = [
      "https://cdn.ironman.my.id/i/7p5plg.mp4",
      "https://cdn.ironman.my.id/i/l4dyvg.mp4",
      "https://cdn.ironman.my.id/i/4z93dg.mp4",
      "https://cdn.ironman.my.id/i/m9gwk0.mp4",
      "https://cdn.ironman.my.id/i/gr1jjc.mp4",
      "https://cdn.ironman.my.id/i/lbr8of.mp4",
      "https://cdn.ironman.my.id/i/0z95mz.mp4",
      "https://cdn.ironman.my.id/i/rldpwy.mp4",
      "https://cdn.ironman.my.id/i/lz2z87.mp4",
      "https://cdn.ironman.my.id/i/gg5jct.mp4"
    ];

    const randomClip = voiceClips[Math.floor(Math.random() * voiceClips.length)];

    await conn.sendMessage(m.chat, {
      audio: { url: randomClip },
      mimetype: 'audio/mp4',
      ptt: true,
      waveform: [99, 0, 99, 0, 99],
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true
      }
    }, { quoted: m });

  } catch (e) {
    console.error(e);
  }
});

cmd({
    pattern: "me",
    alias: ["mention", "broken", "x", "xd"],
    desc: "Send a random voice clip",
    category: "fun",
    react: "⚡",
    filename: __filename
}, async (conn, m) => {
    try {
        const voiceClips = [
            "https://cdn.ironman.my.id/i/7p5plg.mp4",
            "https://cdn.ironman.my.id/i/l4dyvg.mp4",
            "https://cdn.ironman.my.id/i/4z93dg.mp4",
            "https://cdn.ironman.my.id/i/m9gwk0.mp4",
            "https://cdn.ironman.my.id/i/gr1jjc.mp4",
            "https://cdn.ironman.my.id/i/lbr8of.mp4",
            "https://cdn.ironman.my.id/i/0z95mz.mp4",
            "https://cdn.ironman.my.id/i/rldpwy.mp4",
            "https://cdn.ironman.my.id/i/lz2z87.mp4",
            "https://cdn.ironman.my.id/i/gg5jct.mp4"
        ];

        const randomClip = voiceClips[Math.floor(Math.random() * voiceClips.length)];

        await conn.sendMessage(m.chat, {
            audio: { url: randomClip },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: m });
    } catch (e) {
        console.error(e);
        await conn.sendMessage(m.chat, { text: "❌ Failed to send random clip." }, { quoted: m });
    }
});

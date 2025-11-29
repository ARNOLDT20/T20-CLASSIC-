const { cmd } = require("../command");

cmd({
  pattern: "ship",
  alias: ["match", "love"],
  desc: "Randomly pairs the command user with another group member.",
  react: "❤️",
  category: "fun",
  filename: __filename
}, async (conn, m, store, { from, isGroup, groupMetadata, reply, sender }) => {
  try {
    if (!isGroup) return reply("❌ This command can only be used in groups.");

    const participants = groupMetadata.participants.map(user => user.id);
    
    // Filter out the sender to avoid self-pairing
    const otherParticipants = participants.filter(id => id !== sender);
    
    if (otherParticipants.length === 0) {
      return reply("❌ Not enough participants to make a pair.");
    }

    // Get random participant (excluding sender)
    const randomPair = otherParticipants[Math.floor(Math.random() * otherParticipants.length)];

    const user1 = sender.split("@")[0];
    const user2 = randomPair.split("@")[0];
    
    const message = `💘 *Match Found!* 💘\n❤️ @${user1} + @${user2}\n💖 Congratulations! 🎉`;

    await conn.sendMessage(from, {
      text: message,
      contextInfo: {
        mentionedJid: [sender, randomPair]
      }
    }, { quoted: m });

  } catch (error) {
    console.error("❌ Error in ship command:", error);
    reply("⚠️ An error occurred while processing the command. Please try again.");
  }
});

// Bhai/Brother command
cmd({
  pattern: "bhai",
  alias: ["bro", "brother", "bahi", "bhrata"],
  desc: "Randomly tags a group member as your brother.",
  react: "👦",
  category: "fun",
  filename: __filename
}, async (conn, m, store, { from, isGroup, groupMetadata, reply, sender }) => {
  try {
    if (!isGroup) return reply("❌ Ye command sirf groups mein use ki ja sakti hai.");

    const participants = groupMetadata.participants.map(user => user.id);
    const otherParticipants = participants.filter(id => id !== sender);
    
    if (otherParticipants.length === 0) {
      return reply("❌ Itne kam log hain k bhai nahi bana ja sakta!");
    }

    const randomPerson = otherParticipants[Math.floor(Math.random() * otherParticipants.length)];
    const user = randomPerson.split("@")[0];
    
    await conn.sendMessage(from, {
      text: `> Ya lo tumhara Bhai @${user} 👦`,
      mentions: [randomPerson]
    }, { quoted: m });

  } catch (error) {
    console.error("Error in bhai command:", error);
    reply("⚠️ Kuch to gadbad hai! Phir se try karo.");
  }
});

// Bhen/Sister command
cmd({
  pattern: "bhen",
  alias: ["sis", "sister", "behen", "bhan", "bahan"],
  desc: "Randomly tags a group member as your sister.",
  react: "👧",
  category: "fun",
  filename: __filename
}, async (conn, m, store, { from, isGroup, groupMetadata, reply, sender }) => {
  try {
    if (!isGroup) return reply("❌ Ye command sirf groups mein use ki ja sakti hai.");

    const participants = groupMetadata.participants.map(user => user.id);
    const otherParticipants = participants.filter(id => id !== sender);
    
    if (otherParticipants.length === 0) {
      return reply("❌ Itne kam log hain k behen nahi bani ja sakti!");
    }

    const randomPerson = otherParticipants[Math.floor(Math.random() * otherParticipants.length)];
    const user = randomPerson.split("@")[0];
    
    await conn.sendMessage(from, {
      text: `> Ya lo tumhari Behen @${user} 👧`,
      mentions: [randomPerson]
    }, { quoted: m });

  } catch (error) {
    console.error("Error in bhen command:", error);
    reply("⚠️ Kuch to gadbad hai! Phir se try karo.");
  }
});  

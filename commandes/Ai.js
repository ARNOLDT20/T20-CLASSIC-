const { zokou } = require('../framework/zokou');
const axios = require('axios');
const { default: makeWASocket, generateWAMessageFromContent, proto } = require('@whiskeysockets/baileys');

zokou(
  {
    nomCom: "ai",
    reaction: "🤖",
    categorie: "ai"
  },
  async (dest, zk, commandeOptions) => {
    const { repondre, arg } = commandeOptions;

    if (!arg || arg.length === 0) {
      return repondre("🤖 *Hello!*\nWhat question would you like to ask me am from Charles xmd Ai my owner is Charles?");
    }

    const prompt = arg.join(' ');

    try {
      const res = await axios.post(
        'https://api.groq.com/openai/v1/chat/completions',
        {
          model: 'meta-llama/llama-4-scout-17b-16e-instruct',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
          max_tokens: 1000
        },
        {
          headers: {
            Authorization: 'Bearer 
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',
            'Content-Type': 'application/json'
          },
          timeout: 15000
        }
      );

      const replyText = res.data?.choices?.[0]?.message?.content?.trim();

      if (!replyText) {
        return repondre("⚠️ I didn’t receive a valid response. Try rephrasing your question.");
      }

      // Final response in forwarded newsletter format
      await zk.sendMessage(dest, {
        text: 💡 *GPT Response:*\n\n${replyText},
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          externalAdReply: {
            title: "CHARLES  AI",
            body: "🤖 powered by T20",
            mediaType: 1,
            thumbnailUrl: "",
            sourceUrl: "https://groq.com",
            renderLargerThumbnail: true
          },
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363366284524544@newsletter",
            newsletterName: "T20"
          }
        }
      });

    } catch (error) {
      console.error("❌ GPT Error:", error.response?.data || error.message);
      return repondre("🚫 Sorry, GPT could not respond. Try again later.");
    }
  }
);

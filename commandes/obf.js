const util = require('util');
const { zokou } = require(__dirname + '/../framework/zokou');
const axios = require('axios');

zokou(
  {
    nomCom: 'obfuscate',
    categorie: 'Mods',
    reaction: '🔐',
  },
  async (dest, zk, commandeOptions) => {
    const { ms, repondre, arg, nomAuteurMessage } = commandeOptions;

    try {
      console.log('DEBUG - obfuscate triggered:', { arg, nomAuteurMessage });

      if (!arg[0]) {
        return repondre(`T20 CLASSIC AI\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ HEY ${nomAuteurMessage}, DON’T BE A NOOB! Give me some JavaScript code, like .obfuscate console.log('Hello World!')! 😡\n◈━━━━━━━━━━━━━━━━◈`);
      }

      const code = arg.join(' ').trim();
      await repondre(`T20 CLASSIC AI\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ Yo ${nomAuteurMessage}, scrambling your code into chaos! 🔍\n◈━━━━━━━━━━━━━━━━◈`);

      const apiUrl = `https://api.giftedtech.web.id/api/tools/encrypt?apikey=gifted&code=${encodeURIComponent(code)}`;
      const response = await axios.get(apiUrl);
      const data = response.data;

      if (!data.success || !data.encrypted_code) {
        return repondre(`T20 CLASSIC AI\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ YIKES, ${nomAuteurMessage}! Obfuscation failed: ${data.error || 'No encrypted code'}! Try better code! 😣\n◈━━━━━━━━━━━━━━━━◈`);
      }

      // Truncate if too long for WhatsApp (4096 char limit)
      let obfuscatedCode = data.encrypted_code;
      if (obfuscatedCode.length > 4000) {
        obfuscatedCode = obfuscatedCode.slice(0, 4000) + '... [truncated]';
      }

      await zk.sendMessage(
        dest,
        {
          text: `T20 CLASSIC AI\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ BOOM, ${nomAuteurMessage}! Your code’s now a cryptic mess! 🔥\n│❒ Obfuscated Code:\n${obfuscatedCode}\n│❒ Powered by xh_clinton\n◈━━━━━━━━━━━━━━━━◈`,
          footer: `Hey ${nomAuteurMessage}! I'm Toxic-MD, created by 𝐱𝐡_𝐜𝐥𝐢𝐧𝐭𝐨𝐧 😎`,
        },
        { quoted: ms }
      );

    } catch (e) {
      console.error('Obfuscate error:', e);
      await repondre(`T20 CLASSIC AI\n\n◈━━━━━━━━━━━━━━━━◈\n│❒ TOTAL MELTDOWN, ${nomAuteurMessage}! Something broke: ${e.message} 😡 Fix it or scram!\n◈━━━━━━━━━━━━━━━━◈`);
    }
  }
);

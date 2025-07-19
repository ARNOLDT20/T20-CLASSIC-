const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206);
const Taphere = more.repeat(4001);

zokou({ nomCom: "biblelist", categorie: "God-first" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    let { cm } = require(__dirname + "/../framework/zokou");
    var coms = {};
    var mode = "public";

    // Set mode if needed
    if ((s.MODE || '').toLocaleLowerCase() !== "yes") {
        mode = "private";
    }

    // Collect all commands (not really used in message, but kept for structure)
    if (Array.isArray(cm)) {
        cm.forEach((com) => {
            if (!coms[com.categorie])
                coms[com.categorie] = [];
            coms[com.categorie].push(com.nomCom);
        });
    }

    moment.tz.setDefault("Africa/Nairobi");
    // Créer une date et une heure en GMT
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    let infoMsg =  `

🤲🕍  ┈─• *HOLY BIBLE* •─┈  🕍🤲

 💫 𝘈𝘭𝘭 Holy books 𝘢𝘯𝘥 𝘵𝘩𝘦𝘪𝘳 𝘯𝘶𝘮𝘣𝘦𝘳𝘴 𝘭𝘪𝘴𝘵
𝘧𝘰𝘳 𝘨𝘦𝘵𝘵𝘪𝘯𝘨 books 𝘵𝘺𝘱𝘦 ${s.PREFIXE}bible judges 2:3 Or ${s.PREFIXE}biblie judges 3:6💫🌸 

📜 *Old Testament.* 📜
1. 🧬 Genesis (MWANZO)
2. ♟️ Exodus (KUTOKA)
3. 🕴️ Leviticus (WALAWI)
4. 🔢 Numbers (HESABU)
5. 🗞️ Deuteronomy (TORATI)
6. 🍁 Joshua (JOSHUA)
7. 👨‍⚖️ Judges (WAAMUZI)
8. 🌹 Ruth (RUTH)
9. 🥀 1 Samuel (1SAMWELI)
10. 🌺 2 Samuel (2 SAMWEL)
11. 🌷 1 Kings (1 WAFALME)
12. 👑 2 Kings(2 WAFALME)
13. 🪷 1 Chronicles (1 WATHESALONIKE)
14. 🌸 2 Chronicles (2 WATHESALONIKE)
15. 💮 Ezra (EZRA)
16. 🏵️ Nehemiah (NEHEMIA)
17. 🌻 Esther (ESTA)
18. 🌼 Job (AYUBU)
19. 🍂 Psalms (ZABURI)
20. 🍄 Proverbs (MITHALI)
21. 🌾 Ecclesiastes (MHUBIRI)
22. 🌱 Song of Solomon (WIMBO WA SULEMAN)
23. 🌿 Isaiah (ISAYA)
24. 🍃 Jeremiah (YEREMIA)
25. ☘️ Lamentations (MAOMBOLEZO)
26. 🍀 Ezekiel (EZEKIEL)
27. 🪴 Daniel (DANIEL)
28. 🌵 Hosea (HESEA)
29. 🌴 Joel (JOEL)
30. 🌳 Amos (AMOSI)
31. 🌲 Obadiah (OBADIA)
32. 🪵 Jonah (YONA)
33. 🪹 Micah (MIKA)
34. 🪺 Nahum (NAHUM)
35. 🏜️ Habakkuk (HABAKUKI)
36. 🏞️ Zephaniah (ZEFANIA)
37. 🏝️ Haggai (HAGAI)
38. 🌅 Zechariah (ZAKARIA)
39. 🌄 Malachi (MALAKI)

📖 *New Testament.* 📖
1. 🌈 Matthew (MATHAYO)
2. ☔ Mark (MARKO)
3. 💧 Luke (LUKA)
4. ☁️ John (JOHN)
5. 🌨️ Acts (MATENDO)
6. 🌧️ Romans (WARUMI)
7. 🌩️ 1 Corinthians (1 WAKORITHO)
8. 🌦️ 2 Corinthians (2 WAKORITHO)
9. ⛈️ Galatians (WAGALATIA)
10. 🌥️ Ephesians (WAEFESO)
11. ⛅ Philippians (WAFILIPI)
12. 🌤️ Colossians (WAKOLOSAI)
13. ☀️ 1 Thessalonians (1 WATHESALONIKE)
14. 🪐 2 Thessalonians (2WATHESALONIKE)
15. 🌞 1 Timothy (TIMOTHEO)
16. 🌝 2 Timothy (2TIMOTHEO)
17. 🌚 Titus (TITO)
18. 🌜 Philemon (FILEMONI)
19. 🌛 Hebrews (WAEBRANIA)
20. ⭐ James (JAMES)
21. 🌟 1 Peter (1 PETER)
22. ✨ 2 Peter (2 PETER)
23. 💫 1 John (1 JOHN)
24. 🌙 2 John (2JOHN)
25. ☄️ 3 John (3 JOHN)
26. 🌠 Jude (YUDA)
27. 🌌 Revelation (UFUNUO WA YOHANA)


📜BY *charleske*⚪
`;

    let menuMsg = `
> *POWERED BY t20 classic ai*

> ©ᴘᴏᴡᴇʀᴇᴅ ʙʏ t20
`;

    try {
        // Prefer nomAuteurMessage, fallback to ms.key.participant, or empty string
        const senderName = nomAuteurMessage || (ms && ms.key && ms.key.participant) || '';
        await zk.sendMessage(dest, {
            text: infoMsg + menuMsg,
            contextInfo: {
                mentionedJid: [senderName],
                externalAdReply: {
                    title: "*t20 classic ai* HOLY BIBLE LIST",
                    body: "Live with God my friends you don't know your tomorrow",
                    thumbnailUrl: "",
                    sourceUrl: "https://whatsapp.com/channel/0029Vb6W30X1noyy6cijtB1q",
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });
    } catch (error) {
        console.error("Menu error: ", error);
        if (typeof repondre === 'function') {
            repondre("🥵🥵 Menu error: " + error);
        }
    }
});

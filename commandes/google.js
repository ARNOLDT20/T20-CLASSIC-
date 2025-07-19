const axios = require("axios");
const { zokou } = require("../framework/zokou");
const traduire = require("../framework/traduction");
const { Sticker, StickerTypes } = require('wa-sticker-formatter');

const viewChannel = "🔔 *View Channel:* https://whatsapp.com/channel/0029Vao2hgeChq6HJ5bmlZ3K";

// 🔹 ranime command
zokou({
  nomCom: "ranime",
  categorie: "Fun",
  reaction: "📺"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;
  const jsonURL = "https://api.jikan.moe/v4/random/anime";

  try {
    const response = await axios.get(jsonURL);
    const data = response.data.data;

    const title = data.title;
    const synopsis = data.synopsis;
    const imageUrl = data.images.jpg.image_url;
    const episodes = data.episodes;
    const status = data.status;

    const message = `📺 Titre: ${title}\n🎬 Épisodes: ${episodes}\n📡 Statut: ${status}\n📝 Synopsis: ${synopsis}\n🔗 URL: ${data.url}\n\n${viewChannel}`;

    zk.sendMessage(origineMessage, { image: { url: imageUrl }, caption: message }, { quoted: ms });
  } catch (error) {
    console.error('Error retrieving data from JSON :', error);
    repondre('Error retrieving data from JSON.');
  }
});

// 🔹 google command
zokou({
  nomCom: "google",
  categorie: "Search"
}, async (dest, zk, commandeOptions) => {
  const { arg, repondre } = commandeOptions;

  if (!arg[0]) {
    repondre("Give me a query.\n*Example: .google What is a bot.*");
    return;
  }

  const google = require('google-it');
  try {
    const results = await google({ query: arg.join(" ") });
    let msg = `🔍 Google search for: ${arg.join(" ")}\n\n`;

    for (let result of results) {
      msg += `➣ Title: ${result.title}\n`;
      msg += `➣ Description: ${result.snippet}\n`;
      msg += `➣ Link: ${result.link}\n\n────────────────────────\n\n`;
    }

    msg += `${viewChannel}`;

    repondre(msg);
  } catch (error) {
    repondre("An error occurred during Google search.");
  }
});

// 🔹 imdb command
zokou({
  nomCom: "images",
  categorie: "Search"
}, async (dest, zk, commandeOptions) => {
  const { arg, repondre, ms } = commandeOptions;

  if (!arg[0]) {
    repondre("Give the name of a series or film.");
    return;
  }

  try {
    const response = await axios.get(`http://www.omdbapi.com/?apikey=742b2d09&t=${arg.join(" ")}&plot=full`);
    const imdbData = response.data;

    let imdbInfo = "⚍⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚍\n";
    imdbInfo += " ``` CHARLESKE 𝕊𝔼𝔸ℝℂℍ```\n";
    imdbInfo += "⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎⚎\n";
    imdbInfo += `🎬 Title: ${imdbData.Title}\n`;
    imdbInfo += `📅 Year: ${imdbData.Year}\n`;
    imdbInfo += `⭐ Assessment: ${imdbData.Rated}\n`;
    imdbInfo += `📆 Release: ${imdbData.Released}\n`;
    imdbInfo += `⏳ Runtime: ${imdbData.Runtime}\n`;
    imdbInfo += `🌀 Genre: ${imdbData.Genre}\n`;
    imdbInfo += `👨🏻‍💻 Director: ${imdbData.Director}\n`;
    imdbInfo += `✍ Writers: ${imdbData.Writer}\n`;
    imdbInfo += `👨 Actors: ${imdbData.Actors}\n`;
    imdbInfo += `📃 Synopsis: ${imdbData.Plot}\n`;
    imdbInfo += `🌐 Language: ${imdbData.Language}\n`;
    imdbInfo += `🌍 Country: ${imdbData.Country}\n`;
    imdbInfo += `🎖️ Awards: ${imdbData.Awards}\n`;
    imdbInfo += `📦 BoxOffice: ${imdbData.BoxOffice}\n`;
    imdbInfo += `🏙️ Production: ${imdbData.Production}\n`;
    imdbInfo += `🌟 Score: ${imdbData.imdbRating}\n`;
    imdbInfo += `❎ imdbVotes: ${imdbData.imdbVotes}\n\n${viewChannel}`;

    zk.sendMessage(dest, {
      image: { url: imdbData.Poster },
      caption: imdbInfo,
    }, { quoted: ms });
  } catch (error) {
    repondre("An error occurred while searching IMDb.");
  }
});

// 🔹 movie command (same as imdb, different formatting)
zokou({
  nomCom: "movie",
  categorie: "Search"
}, async (dest, zk, commandeOptions) => {
  const { arg, repondre, ms } = commandeOptions;

  if (!arg[0]) {
    repondre("Give the name of a series or film.");
    return;
  }

  try {
    const response = await axios.get(`http://www.omdbapi.com/?apikey=742b2d09&t=${arg.join(" ")}&plot=full`);
    const imdbData = response.data;

    let imdbInfo = "THANKS ALL FOR THE SUPPORT ITS ME CHARLESKE XMD \n";
    imdbInfo += " ``` t20 classic aiFILMS```\n";
    imdbInfo += "*Made by t20 classic ai*\n";
    imdbInfo += `🎬 Title: ${imdbData.Title}\n`;
    imdbInfo += `📅 Year: ${imdbData.Year}\n`;
    imdbInfo += `⭐ Assessment: ${imdbData.Rated}\n`;
    imdbInfo += `📆 Release: ${imdbData.Released}\n`;
    imdbInfo += `⏳ Runtime: ${imdbData.Runtime}\n`;
    imdbInfo += `🌀 Genre: ${imdbData.Genre}\n`;
    imdbInfo += `👨🏻‍💻 Director: ${imdbData.Director}\n`;
    imdbInfo += `✍ Writers: ${imdbData.Writer}\n`;
    imdbInfo += `👨 Actors: ${imdbData.Actors}\n`;
    imdbInfo += `📃 Synopsis: ${imdbData.Plot}\n`;
    imdbInfo += `🌐 Language: ${imdbData.Language}\n`;
    imdbInfo += `🌍 Country: ${imdbData.Country}\n`;
    imdbInfo += `🎖️ Awards: ${imdbData.Awards}\n`;
    imdbInfo += `📦 BoxOffice: ${imdbData.BoxOffice}\n`;
    imdbInfo += `🏙️ Production: ${imdbData.Production}\n`;
    imdbInfo += `🌟 Score: ${imdbData.imdbRating}\n`;
    imdbInfo += `❎ imdbVotes: ${imdbData.imdbVotes}\n\n${viewChannel}`;

    zk.sendMessage(dest, {
      image: { url: imdbData.Poster },
      caption: imdbInfo,
    }, { quoted: ms });
  } catch (error) {
    repondre("An error occurred while searching IMDb.");
  }
});

// 🔹 emomix command
zokou({
  nomCom: "emomix",
  categorie: "Conversion"
}, async (dest, zk, commandeOptions) => {
  const { arg, repondre, ms, nomAuteurMessage } = commandeOptions;

  if (!arg[0] || arg.length !== 1) {
    repondre("Incorrect use. Example: .emojimix 😀;🥰");
    return;
  }

  const emojis = arg.join(' ').split(';');
  if (emojis.length !== 2) {
    repondre("Please specify two emojis using a ';' as a separator.");
    return;
  }

  const emoji1 = emojis[0].trim();
  const emoji2 = emojis[1].trim();

  try {
    const response = await axios.get(`https://levanter.onrender.com/emix?q=${emoji1}${emoji2}`);

    if (response.data.status === true) {
      const stickerMess = new Sticker(response.data.result, {
        pack: nomAuteurMessage,
        type: StickerTypes.CROPPED,
        categories: ["🤩", "🎉"],
        id: "12345",
        quality: 70,
        background: "transparent",
      });

      const stickerBuffer2 = await stickerMess.toBuffer();

      await zk.sendMessage(dest, { sticker: stickerBuffer2 }, { quoted: ms });

      // Send channel link after sticker
      await zk.sendMessage(dest, { text: viewChannel }, { quoted: ms });

    } else {
      repondre("Unable to create emoji mix.");
    }
  } catch (error) {
    repondre("An error occurred while creating the emoji mix." + error);
  }
});

const { ezra } = require('../fredi/ezra');
const gis = require('g-i-s');
const axios = require('axios');
const conf = require(__dirname + '/../set');
const { generateProfilePicture } = require("../fredi/dl/Function");
const { S_WHATSAPP_NET } = require('@whiskeysockets/baileys');
const fs = require("fs");


// Request for image dowload 
ezra({
  nomCom: "img",
  aliases: ["image", "images"],
  categorie: "bravin's-Images",
  reaction: "📸"
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;

  if (!arg[0]) {
    repondre('Which image?');
    return;
  }

  const searchTerm = arg.join(" ");
  gis(searchTerm, (error, results) => sendImage(error, results));

  function sendImage(error, results) {
    if (error) {
      repondre("Oops, an error occurred.");
      return;
    }

    if (!results || results.length === 0) {
      repondre("No images found.");
      return;
    }

    for (let i = 0; i < Math.min(results.length, 5); i++) {
      zk.sendMessage(dest, {
        image: { url: results[i].url },
        caption: `DOWNLOAD AND ENJOY BY 😈JEEPERS CREEPER-XMD 😈`,
        contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: ''120363366284524544@newsletter',
         newsletterName: "@sir bravin",
         serverMessageId: 143,
          }
        }
      }, { quoted: ms });
    }
  }
});

// request for Insult
ezra({
  nomCom: "insult",
  aliases: ["abuse", "tusi"],
  categorie: "bravin's-Search",
  reaction: "🤷"
}, async (dest, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  try {
    const response = await axios.get('https://evilinsult.com/generate_insult.php?lang=en&type=json');
    const data = response.data;

    if (!data || !data.insult) {
      return repondre('Unable to retrieve an insult. Please try again later.');
    }

    const insult = data.insult;
    return repondre(`*Insult:* ${insult}`);
  } catch (error) {
    repondre(`Error: ${error.message || error}`);
  }
});

// face FullPp cmd
ezra({
  nomCom: "fullpp",
  aliases: ["updatepp", "ppfull"],
  reaction: '🍂',
  categorie: "bravin's-New"
}, async (dest, zk, commandeOptions) => {
  const { repondre, msgRepondu, auteurMessage } = commandeOptions;

  if (msgRepondu) {
    repondre('quote an image');

    let media;
    if (msgRepondu.imageMessage) {
      media = msgRepondu.imageMessage;
    } else {
      repondre('This is not an image...');
      return;
    }

    try {
      var medis = await zk.downloadAndSaveMediaMessage(media);

      var { img } = await generateProfilePicture(medis);

      await zk.query({
        tag: 'iq',
        attrs: {
          target: undefined,
          to: S_WHATSAPP_NET,
          type: 'set',
          xmlns: 'w:profile:picture'
        },
        content: [
          {
            tag: 'picture',
            attrs: { type: 'image' },
            content: img
          }
        ]
      });

      fs.unlinkSync(medis);
      repondre("Bot Profile Picture Updated");
    } catch (error) {
      repondre("An error occurred while updating bot profile photo: " + error);
    }
  } else {
    repondre('No image was quoted.');
  }
});

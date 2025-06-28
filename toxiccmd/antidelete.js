const { ezra } = require("../fredi/ezra");
const fs = require('fs');


let antiDeleteActive = false; // Variable pour stocker l'état de la commande anti-delete

ezra({
  nomCom: "anti-delete",
  categorie: "General-Fredi",
  reaction: "😏"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, arg } = commandeOptions;

  // Vérifier si un argument est fourni pour activer ou désactiver la commande
  if (arg[0]) {
    const action = arg[0].toLowerCase();
    if (action === "on") {
      antiDeleteActive = true;
      await zk.sendMessage(origineMessage, "La commande anti-delete est activée.");
      return;
    } else if (action === "off") {
      antiDeleteActive = false;
      await zk.sendMessage(origineMessage, "La commande anti-delete est désactivée.");
      return;
    }
  }

  // Vérifier si la commande anti-delete est activée
  if (!antiDeleteActive) {
    await zk.sendMessage(origineMessage, "La commande anti-delete est actuellement désactivée.");
    return;
  }

  if (ms.message.protocolMessage && ms.message.protocolMessage.type === 0 && (conf.ANTI_DELETE_MESSAGE).toLowerCase() === 'yes') {
    if (ms.key.fromMe || ms.message.protocolMessage.key.fromMe) {
      console.log('Message supprimé me concernant');
      return;
    }

    console.log('Message supprimé');
    const key = ms.message.protocolMessage.key;

    try {
      const st = './store.json';
      const data = fs.readFileSync(st, 'utf8');
      const jsonData = JSON.parse(data);
      const message = jsonData.messages[key.remoteJid];

      let msg;

      for (let i = 0; i < message.length; i++) {
        if (message[i].key.id === key.id) {
          msg = message[i];
          break;
        }
      }

      if (!msg) {
        console.log('Message introuvable');
        return;
      }

      const senderId = msg.key.participant.split('@')[0];
      const caption = ` Anti-delete-message by ☢️ JEEPERS CREEPER-XMD XFORCE☢️\nMessage de @${senderId}`;
      const imageCaption = { image: { url: './media/deleted-message.jpg' }, caption, mentions: [msg.key.participant] };

      await zk.sendMessage(idBot, imageCaption);
      await zk.sendMessage(idBot, { forward: msg }, { quoted: msg });
    } catch (error) {
      console.error(error);
    }
  }
});

// Work for Blocklist contacts 
ezra({
  nomCom: "blocklist",
  aliases: ["listblock", "blacklist"],
  reaction: '🍂',
  categorie: "Fredi-Search"
}, async (dest, zk, commandeOptions) => {
  const { repondre } = commandeOptions;

  try {
    // Fetch the blocklist of contacts
    let blocklist = await zk.fetchBlocklist();

    // If the blocklist has users, proceed
    if (blocklist.length > 0) {
      // Start the message for blocked contacts
      let jackhuh = `*Blocked Contacts*\n`;

      await repondre(`You have blocked ${blocklist.length} contact(s), fetching and sending their details!`);

      // Map through the blocklist to fetch each blocked user's details
      const promises = blocklist.map(async (blockedUser) => {
        // Extract the phone number from the JID (remove '@s.whatsapp.net')
        const phoneNumber = blockedUser.split('@')[0];

        // Add the blocked user's phone number to the message
        jackhuh += `🤷  +${phoneNumber}\n`;  // List the phone number
      });

      // Wait for all the promises to complete
      await Promise.all(promises);

      // Send the final formatted message with the blocked contacts
      await repondre(jackhuh);
    } else {
      // If no blocked users, reply with a message
      await repondre("There are no blocked contacts.");
    }
  } catch (e) {
    // Catch any error and inform the user
    await repondre("An error occurred while accessing blocked users.\n\n" + e);
  }
});

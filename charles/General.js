const { zokou } = require("../framework/zokou");
const { getAllSudoNumbers, isSudoTableNotEmpty } = require("../bdd/sudo");
const conf = require("../set");

zokou({ nomCom: "owner", categorie: "General", reaction: "🚘" }, async (dest, zk, commandeOptions) => {
    const { ms, mybotpic } = commandeOptions;

    const thsudo = await isSudoTableNotEmpty();

    if (thsudo) {
        let msg = `*My Super-User*\n\n*Owner Number*\n- 🌟 @${conf.NUMERO_OWNER}\n\n------ *Other Sudos* -----\n`;

        let sudos = await getAllSudoNumbers();

        for (const sudo of sudos) {
            if (sudo) {
                let sudonumero = sudo.replace(/[^0-9]/g, '');
                msg += `- 💼 @${sudonumero}\n`;
            }
        }

        const ownerjid = conf.NUMERO_OWNER.replace(/[^0-9]/g, '') + "@s.whatsapp.net";
        const mentionedJid = sudos.map(sudo => sudo.replace(/[^0-9]/g, '') + "@s.whatsapp.net").concat([ownerjid]);

        zk.sendMessage(dest, {
            image: { url: mybotpic() },
            caption: msg,
            mentions: mentionedJid
        });
    } else {
        const vcard =
            'BEGIN:VCARD\n' +
            'VERSION:3.0\n' +
            'FN:' + conf.OWNER_NAME + '\n' +
            'ORG:undefined;\n' +
            'TEL;type=CELL;type=VOICE;waid=' + conf.NUMERO_OWNER + ':+' + conf.NUMERO_OWNER + '\n' +
            'END:VCARD';

        zk.sendMessage(dest, {
            contacts: {
                displayName: conf.OWNER_NAME,
                contacts: [{ vcard }],
            },
        }, { quoted: ms });
    }
});

zokou({ nomCom: "dev", categorie: "General", reaction: "🚘" }, async (dest, zk, commandeOptions) => {
    const { ms, mybotpic } = commandeOptions;

    const devs = [
        { nom: "TOXIC LOVER", numero: "254717263689" }
    ];

    let message = "WELCOME TO TOXIC-LOVER-MD HELP CENTER! ASK FOR HELP FROM THE DEVELOPER BELOW:\n\n";
    for (const dev of devs) {
        message += `----------------\n• ${dev.nom} : https://wa.me/${dev.numero}\n`;
    }

    var lien = mybotpic();
    if (lien.match(/\.(mp4|gif)$/i)) {
        try {
            zk.sendMessage(dest, { video: { url: lien }, caption: message }, { quoted: ms });
        } catch (e) {
            console.log("🥵🥵 Menu erreur " + e);
        }
    } else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
        try {
            zk.sendMessage(dest, { image: { url: lien }, caption: message }, { quoted: ms });
        } catch (e) {
            console.log("🥵🥵 Menu erreur " + e);
        }
    } else {
        zk.sendMessage(dest, { text: "Link error" }, { quoted: ms });
    }
});

zokou({ nomCom: "support", categorie: "General" }, async (dest, zk, commandeOptions) => {
    const { ms, repondre } = commandeOptions;

    let supportMessage = `Channel link 👇👇👇\nhttps://whatsapp.com/channel/0029VawCel7GOj9ktLjkxQ3g\n\n` +
        `Group 👇👇👇\nhttps.//https://chat.whatsapp.com/H82Doj2qa9EENNKdEK55Q7\n\n` +
        `Instagram 👇👇👇\nhttps://www.instagram.com/bravin126?igsh=MWJvZzBnN3RsYTRsag==\n\n` +
        `@toxic lover`;

    repondre(supportMessage);
});

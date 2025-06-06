const { ezra } = require("../fredi/ezra");
const canvacord = require("canvacord");
const {uploadImageToImgur} = require("../fredi/imgur")

// Generic function to create a canvacord order
function createCanvacordCommand(commandName, canvacordFunction) {
  ezra({
    nomCom: commandName,
    categorie: "Image-Edit",
    reaction: "🎉"
  }, async (origineMessage, zk, commandeOptions) => {
    const { ms, msgRepondu, auteurMsgRepondu } = commandeOptions;
  const clientId = 'b40a1820d63cd4e' ;

    try {
      let img;
      if (msgRepondu) {

     if (msgRepondu.imageMessage) {
        const image = await zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage)
         img = await uploadImageToImgur(image, clientId )
     } else {
        
        img = await zk.profilePictureUrl(auteurMsgRepondu, 'image'); }
      } else {
        img = "https://files.catbox.moe/kki8pi.jpg";
      }

      const result = await canvacordFunction(img);

      await zk.sendMessage(origineMessage, { image: result }, { quoted: ms });
    } catch (error) {
      console.error(`Error when ordering "${commandName}":`, error);
    }
  });
}

// Créer des commandes avec différentes fonctions canvacord
createCanvacordCommand("shit", canvacord.Canvacord.shit);
createCanvacordCommand("wasted", canvacord.Canvacord.wasted);
createCanvacordCommand("wanted", canvacord.Canvacord.wanted);
createCanvacordCommand("trigger", canvacord.Canvacord.trigger);
createCanvacordCommand("trash", canvacord.Canvacord.trash);
createCanvacordCommand("rip", canvacord.Canvacord.rip);
createCanvacordCommand("sepia", canvacord.Canvacord.sepia);
createCanvacordCommand("rainbow", canvacord.Canvacord.rainbow);
createCanvacordCommand("hitler", canvacord.Canvacord.hitler);
createCanvacordCommand("invert", canvacord.Canvacord.invert);
createCanvacordCommand("jail", canvacord.Canvacord.jail);
createCanvacordCommand("affect", canvacord.Canvacord.affect);
  createCanvacordCommand("beautiful", canvacord.Canvacord.beautiful);
    createCanvacordCommand("blur", canvacord.Canvacord.blur);

   createCanvacordCommand("circle", canvacord.Canvacord.circle);
        createCanvacordCommand("facepalm", canvacord.Canvacord.facepalm);
        createCanvacordCommand("greyscale", canvacord.Canvacord.greyscale);
        createCanvacordCommand("jokes", canvacord.Canvacord.jokeOverHead);

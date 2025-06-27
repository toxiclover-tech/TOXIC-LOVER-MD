const {ezra} = require('../fredi/ezra');
const fs = require('fs');
const getFBInfo = require("@xaviabot/fb-downloader");
const { default: axios } = require('axios');
const { getJson } = require("../fredi/utils");

ezra({nomCom : "igdl" , categorie : "toxic lover-tech-Download"},async (dest , zk , commandeOptions)=>{
  const {ms,repondre,arg} = commandeOptions ;

  let link = arg.join(' ')

  if (!arg[0]) { repondre('Provide Instagram video link to download');return}; 

  try {
     
    let igvid = await axios('https://api.vihangayt.com/downloader/ig?url='+link)

    if (igvid.data.data.data[0].type == 'video') {
    zk.sendMessage(dest,{video : {url : igvid.data.data.data[0].url},caption : "ig video downloader powered by *😈JEEPERS CREEPER-XMD😈*",gifPlayback : false },{quoted : ms}) 
    }
    else {
        zk.sendMessage(dest,{image : {url : igvid.data.data.data[0].url},caption : "ig image downloader powered by *😈JEEPERS CREEPER-XMD😈*"})
    }
  
  } catch (e) {repondre("erreur survenue lors du téléchargement \n " + e)}
  
});


ezra({
  nomCom: "fbdl",
  categorie: "toxic lover-tech",
  reaction: "📽️"
},
async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;

  if (!arg[0]) {
    repondre('Insert a public facebook video link!');
    return;
  }

  const queryURL = arg.join(" ");

  try {
     getFBInfo(queryURL)
    .then((result) => {
       let caption = `
        titre: ${result.title}
        Lien: ${result.url}
      `;
       zk.sendMessage(dest,{image : { url : result.thumbnail}, caption : caption},{quoted : ms}) ;
       zk.sendMessage(dest, { video: { url: result.hd  }, caption: 'facebook video downloader powered by *😈JEEPERS CREEPER-XMD 😈*' }, { quoted: ms });
      
    })
    .catch((error) => {console.log("Error:", error)
                      repondre('try fbdl2 on this link')});


   
  } catch (error) {
    console.error('Erreur lors du téléchargement de la vidéo :', error);
    repondre('Erreur lors du téléchargement de la vidéo.' , error);
  }
});



ezra({ nomCom: "tiktok", categorie: "toxic lover-tech-Download", reaction: "🎵" }, async (dest, zk, commandeOptions) => {
  const { arg, ms, prefixe,repondre } = commandeOptions;
  if (!arg[0]) {
    repondre(`how to use this command:\n ${prefixe}tiktok tiktok_video_link`);
    return;
  }

  const videoUrl = arg.join(" ");

 let data = await axios.get('https://api.onesytex.my.id/api/tiktok-dl='+ videoUrl) ;

  let tik = data.data.data

      // Envoi du message avec le thumbnail de la vidéo
      const caption = `
Author: ${tik.author}
Description: ${tik.desc}
      `;

         
      zk.sendMessage(dest, { video: { url: tik.links[0].a} , caption : caption },{quoted : ms});    

  
});

ezra({
  nomCom: "fbdl2",
  categorie: "toxic lover-tech-Download",
  reaction: "📽️"
},
async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;

  if (!arg[0]) {
    repondre('Insert a public facebook video link! !');
    return;
  }

  const queryURL = arg.join(" ");

  try {
     getFBInfo(queryURL)
    .then((result) => {
       let caption = `
        titre: ${result.title}
        Lien: ${result.url}
      `;
       zk.sendMessage(dest,{image : { url : result.thumbnail}, caption : caption},{quoted : ms}) ;
       zk.sendMessage(dest, { video: { url: result.sd  }, caption: 'facebook video downloader powered by *😈 JEEPERS CREEPER-XMD 😈*' }, { quoted: ms });
      
    })
    .catch((error) => {console.log("Error:", error)
                      repondre(error)});


   
  } catch (error) {
    console.error('Erreur lors du téléchargement de la vidéo :', error);
    repondre('Erreur lors du téléchargement de la vidéo.' , error);
  }
});

// Request for Muvies
ezra({
  nomCom: "movie",
  categorie: "toxic lover-tech-Search",
  reaction: "🎥"
}, async (origineMessage, zk, commandeOptions) => {
  const { repondre, arg } = commandeOptions;

  if (!arg[0]) {
    repondre("Quel film veux-tu ?");
    return;
  }

  const movieTitle = arg.join(" ");
  const movie = await getJson(
    `http://www.omdbapi.com/?apikey=742b2d09&t=${encodeURIComponent(movieTitle)}&plot=full`
  );

  if (movie.Response !== 'True') {
    repondre('*Not found*');
    return;
  }

  let msg = '';
  const url = movie.Poster;
  delete movie.Poster;
  delete movie.Response;
  delete movie.Ratings;

  for (const data in movie) {
    if (movie[data] !== 'N/A') {
      msg += `*${data} :* ${movie[data]}\n`;
    }
  }

  if (url === 'N/A') {
    repondre(msg.trim());
  } else {
    await zk.sendMessage(origineMessage.from, { url }, { caption: msg.trim() });
  }
});

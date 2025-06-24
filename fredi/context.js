module.exports = {
  
  getContextInfo: (ms) => {
    return {
      mentionedJid: [ms.sender || ms.from], 
      forwardingScore: 999,
      isForwarded: true, 
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363366284524544@newsletter', 
        newsletterName: '@jeepers creeper-xmd', 
        serverMessageId: 143 
      }
    };
  },


  repondre: async (zk, dest, ms, text, options = {}) => {
    const contextInfo = {
      ...module.exports.getContextInfo(ms), 
      ...options.contextInfo 
    };

    await zk.sendMessage(dest, {
      text: text,
      contextInfo: contextInfo
    }, { quoted: ms }); 
  },


  sendMessage: async (zk, dest, ms, options) => {
    const contextInfo = {
      ...module.exports.getContextInfo(ms), 
      ...options.contextInfo 
    };

    await zk.sendMessage(dest, {
      ...options,
      contextInfo: contextInfo
    }, { quoted: ms }); 
  }
};

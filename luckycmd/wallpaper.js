function hi() {
  console.log("Hello World!");
}
hi();
const {
  cmd,
  commands
} = require('../command');
const {
  getBuffer,
  getGroupAdmins,
  getRandom,
  h2k,
  isUrl,
  Json,
  runtime,
  sleep,
  fetchJson
} = require('../lib/functions');
const axios = require("axios");
cmd({
  'pattern': 'rw',
  'alias': ["randomwall", "wallpaper"],
  'react': '🌌',
  'desc': "Download random wallpapers based on keywords.",
  'category': "wallpapers",
  'use': ".rw <keyword>",
  'filename': __filename
}, async (_0x5b0f11, _0x55e925, _0x37885a, {
  from: _0x3a799f,
  args: _0x149ac2,
  reply: _0xc5f584
}) => {
  try {
    const _0x99e043 = _0x149ac2.join(" ") || 'random';
    const _0x271cf4 = "https://pikabotzapi.vercel.app/random/randomwall/?apikey=anya-md&query=" + _0x99e043;
    const _0x571872 = await axios.get(_0x271cf4);
    if (_0x571872.data.status) {
      const _0x1558ab = _0x571872.data.imgUrl;
      const _0x4fe51c = "🌌 Random Wallpaper: *" + _0x99e043 + "*\n\n> *© GᴇɴʀᴇᴛᴇD Bʏ TOXIC LOVER*";
      await _0x5b0f11.sendMessage(_0x3a799f, {
        'image': {
          'url': _0x1558ab
        },
        'caption': _0x4fe51c
      }, {
        'quoted': _0x55e925
      });
    } else {
      _0xc5f584("❌ Failed to fetch wallpaper for \"" + _0x99e043 + "\".");
    }
  } catch (_0x29cbc7) {
    console.error(_0x29cbc7);
    _0xc5f584("❌ An error occurred while fetching the wallpaper.");
  }
});

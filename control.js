'use strict'
  ;var __createBinding = this && this.__createBinding || (Object.create ? function (_0x24fe3c, _0x4c34c3, _0xbdcf04, _0x42cd14) {
  if (_0x42cd14 === undefined) {
    _0x42cd14 = _0xbdcf04;
  }
  var _0x23ccf6 = Object.getOwnPropertyDescriptor(_0x4c34c3, _0xbdcf04);
  if (!_0x23ccf6 || ('get' in _0x23ccf6 ? !_0x4c34c3.__esModule : _0x23ccf6.writable || _0x23ccf6.configurable)) {
    _0x23ccf6 = {
      'enumerable': true,
      'get': function () {
        return _0x4c34c3[_0xbdcf04];
      }
    };
  }
  Object.defineProperty(_0x24fe3c, _0x42cd14, _0x23ccf6);
} : function (_0x90a783, _0x56b36, _0x9c5faf, _0x5449e9) {
  if (_0x5449e9 === undefined) {
    _0x5449e9 = _0x9c5faf;
  }
  _0x90a783[_0x5449e9] = _0x56b36[_0x9c5faf];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (_0x116871, _0x2e2f3a) {
  Object.defineProperty(_0x116871, "default", {
    'enumerable': true,
    'value': _0x2e2f3a
  });
} : function (_0x461bcd, _0x38fdf7) {
  _0x461bcd['default'] = _0x38fdf7;
});
var __importStar = this && this.__importStar || function (_0x55588a) {
  if (_0x55588a && _0x55588a.__esModule) {
    return _0x55588a;
  }
  var _0x5651a3 = {};
  if (_0x55588a != null) {
    for (var _0x39e98d in _0x55588a) if (_0x39e98d !== 'default' && Object.prototype.hasOwnProperty.call(_0x55588a, _0x39e98d)) {
      __createBinding(_0x5651a3, _0x55588a, _0x39e98d);
    }
  }
  __setModuleDefault(_0x5651a3, _0x55588a);
  return _0x5651a3;
};
var __importDefault = this && this.__importDefault || function (_0x436211) {
  return _0x436211 && _0x436211.__esModule ? _0x436211 : {
    'default': _0x436211
  };
};
Object.defineProperty(exports, "__esModule", {
  'value': true
});
const baileys_1 = __importStar(require('@whiskeysockets/baileys'));
const logger_1 = __importDefault(require("@whiskeysockets/baileys/lib/Utils/logger"));
const logger = logger_1['default'].child({});
logger.level = 'silent';
const pino = require('pino');
const boom_1 = require("@hapi/boom");
const conf = require('./set');
let fs = require("fs-extra");
let path = require("path");
const FileType = require("file-type");
const {
  Sticker,
  createSticker,
  StickerTypes
} = require('wa-sticker-formatter');
const {
  verifierEtatJid,
  recupererActionJid
} = require("./luckydatabase/antilien");
const {
  atbverifierEtatJid,
  atbrecupererActionJid
} = require("./luckydatabase/antibot");
let evt = require(__dirname + "/fredi/ezra");
const {
  isUserBanned,
  addUserToBanList,
  removeUserFromBanList
} = require("./luckydatabase/banUser");
const {
  addGroupToBanList,
  isGroupBanned,
  removeGroupFromBanList
} = require('./luckydatabase/banGroup');
const {
  isGroupOnlyAdmin,
  addGroupToOnlyAdminList,
  removeGroupFromOnlyAdminList
} = require('./luckydatabase/onlyAdmin');
let {
  reagir
} = require(__dirname + "/fredi/app");
var session = conf.session.replace(/JEEPERS CREEPER-XMD;;;=>/g, '');
const prefixe = conf.PREFIXE;
async function authentification() {
  try {
    if (!fs.existsSync(__dirname + "/scan/creds.json")) {
      console.log("connexion en cour ...");
      await fs.writeFileSync(__dirname + "/scan/creds.json", atob(session), "utf8");
    } else if (fs.existsSync(__dirname + "/scan/creds.json") && session != "zokk") {
      await fs.writeFileSync(__dirname + '/scan/creds.json', atob(session), "utf8");
    }
  } catch (_0x15a4a2) {
    console.log("Session Invalid " + _0x15a4a2);
    return;
  }
}
authentification();
0x0;
const store = baileys_1.makeInMemoryStore({
  'logger': pino().child({
    'level': "silent",
    'stream': "store"
  })
});
setTimeout(() => {
  authentification();
  async function _0x1e4bb9() {
    0x0;
    const {
      version: _0x3aa07d,
      isLatest: _0x42b6e3
    } = await baileys_1.fetchLatestBaileysVersion();
    0x0;
    const {
      state: _0x1e98b3,
      saveCreds: _0x2f0ca2
    } = await baileys_1.useMultiFileAuthState(__dirname + "/scan");
    0x0;
    const _0x5acf4c = {
      'version': _0x3aa07d,
      'logger': pino({
        'level': 'silent'
      }),
      'browser': ['JEEPERS CREEPER-XMD', "safari", "1.0.0"],
      'printQRInTerminal': true,
      'fireInitQueries': false,
      'shouldSyncHistoryMessage': true,
      'downloadHistory': true,
      'syncFullHistory': true,
      'generateHighQualityLinkPreview': true,
      'markOnlineOnConnect': false,
      'keepAliveIntervalMs': 0x7530,
      'auth': {
        'creds': _0x1e98b3.creds,
        'keys': baileys_1.makeCacheableSignalKeyStore(_0x1e98b3.keys, logger)
      },
      'getMessage': async _0x6c56e8 => {
        if (store) {
          const _0x2f4e2e = await store.loadMessage(_0x6c56e8.remoteJid, _0x6c56e8.id, undefined);
          return _0x2f4e2e.message || undefined;
        }
        return {
          'conversation': "An Error Occurred, Repeat Command!"
        };
      }
    };
    0x0;
    const _0x103f1b = baileys_1["default"](_0x5acf4c);
    store.bind(_0x103f1b.ev);
    function _0x47300b() {
      const _0x1d149b = {
        'timeZone': 'KENYA/ELDORET',
        'year': "numeric",
        'month': "2-digit",
        'day': "2-digit",
        'hour': "2-digit",
        'minute': "2-digit",
        'second': "2-digit",
        'hour12': false
      };
      const _0x293b0f = new Intl.DateTimeFormat('en-KE', _0x1d149b).format(new Date());
      return _0x293b0f;
    }
    setInterval(async () => {
      if (conf.AUTO_BIO === "yes") {
        const _0x162c28 = _0x47300b();
        const _0x23ac85 = "Hello 👋 there am JEEPERS CREEPER-XMD personal assistant developed by toxic lover 🚗\n" + _0x162c28;
        await _0x103f1b.updateProfileStatus(_0x23ac85);
        console.log("Updated Bio: " + _0x23ac85);
      }
    }, 0xea60);
    _0x103f1b.ev.on("call", async _0x348bb3 => {
      if (conf.ANTI_CALL === "yes") {
        const _0x538dee = _0x348bb3[0x0].id;
        const _0x44bb8c = _0x348bb3[0x0].from;
        await _0x103f1b.rejectCall(_0x538dee, _0x44bb8c);
        const _0x16f655 = Date.now();
        if (_0x16f655 - lastTextTime >= messageDelay) {
          await client.sendMessage(_0x44bb8c, {
            'text': conf.ANTI_CALL_TEXT
          });
          lastTextTime = _0x16f655;
        } else {
          console.log("Message skipped to prevent overflow");
        }
      }
    });
    const _0x4ebd6e = _0x4325ff => new Promise(_0x4432a9 => setTimeout(_0x4432a9, _0x4325ff));
    let _0xb7c93f = 0x0;
    const _0x1296dd = {
      'hello': ['👋', '🙂', '😊', "🙋‍♂️", '🙋‍♀️'],
      'hi': ['👋', '🙂', '😁', "🙋‍♂️", '🙋‍♀️'],
      "good morning": ['🌅', '🌞', '☀️', '🌻', '🌼'],
      "good night": ['🌙', '🌜', '⭐', '🌛', '💫'],
      'bye': ['👋', '😢', "👋🏻", '🥲', '🚶‍♂️', "🚶‍♀️"],
      "see you": ['👋', '😊', '👋🏻', '✌️', "🚶‍♂️"],
      'bro': ["🤜🤛", '👊', '💥', '🥊', '👑'],
      'sister': ['👭', "💁‍♀️", '🌸', '💖', "🙋‍♀️"],
      'buddy': ['🤗', "👯‍♂️", "👯‍♀️", '🤜🤛', '🤝'],
      'niaje': ['👋', '😄', '💥', '🔥', '🕺', '💃'],
      'fredi': ['😎', '💯', '🔥', '🚀', '👑'],
      'ezra': ['🔥', '💥', '👑', '💯', '😎'],
      'thanks': ['🙏', '😊', '💖', '❤️', '💐'],
      "thank you": ['🙏', '😊', '🙌', '💖', '💝'],
      'love': ['❤️', '💖', '💘', '😍', '😘', '💍', '💑'],
      "miss you": ['😢', '💔', '😔', '😭', '💖'],
      'sorry': ['😔', '🙏', '😓', '💔', '🥺'],
      'apologies': ['😔', '💔', '🙏', '😞', '🙇‍♂️', "🙇‍♀️"],
      'congratulations': ['🎉', '🎊', '🏆', '🎁', '👏'],
      "well done": ['👏', '💪', '🎉', "🎖️", '👍'],
      "good job": ['👏', '💯', '👍', '🌟', '🎉'],
      'happy': ['😁', '😊', '🎉', '🎊', '💃', '🕺'],
      'sad': ['😢', '😭', '😞', '💔', '😓'],
      'angry': ['😡', '🤬', '😤', '💢', '😾'],
      'excited': ['🤩', '🎉', '😆', '🤗', '🥳'],
      'surprised': ['😲', '😳', '😯', '😮', '😲'],
      'help': ['🆘', '❓', '🙏', '💡', "👨‍💻", '👩‍💻'],
      'how': ['❓', '🤔', '😕', '😳', '🧐'],
      'what': ['❓', "🤷‍♂️", "🤷‍♀️", '😕', '😲'],
      'where': ['❓', '🌍', "🗺️", "🏙️", '🌎'],
      'party': ['🎉', '🥳', '🍾', '🍻', '🎤', '💃', '🕺'],
      'fun': ['🤣', '😂', '🥳', '🎉', '🎮', '🎲'],
      'hangout': ['🍕', '🍔', '🍻', '🎮', '🍿', '😆'],
      'good': ['👍', '👌', '😊', '💯', '🌟'],
      'awesome': ['🔥', '🚀', '🤩', '👏', '💥'],
      'cool': ['😎', '👌', '🎮', '🎸', '💥'],
      'boring': ['😴', '🥱', '🙄', '😑', '🤐'],
      'tired': ['😴', '🥱', '😌', '💤', '🛌'],
      'bot': ['🤖', '💻', '⚙️', '🧠', '🔧'],
      'robot': ['🤖', '⚙️', '💻', '🔋', '🤓'],
      "cool bot": ['🤖', '😎', '🤘', '💥', '🎮'],
      "love you": ['❤️', '💖', '😘', '💋', '💑'],
      "thank you bot": ['🙏', '🤖', '😊', '💖', '💐'],
      "good night bot": ['🌙', '🌛', '⭐', '💤', '😴'],
      'laughter': ['😂', '🤣', '😆', '😄', '🤪'],
      'crying': ['😢', '😭', '😿', '😓', '💔'],
      'john': ['👑', '🔥', '💥', '😎', '💯'],
      'mike': ['💪', '🏆', '🔥', '💥', '🚀'],
      'lisa': ['💖', '👑', '🌸', '😍', '🌺'],
      'emily': ['💖', '💃', '👑', '🎉', '🎀'],
      'happy': ['😁', '😄', '😊', '🙌', '🎉', '🥳', '💃', '🕺', '🔥'],
      'excited': ['🤩', '🎉', '🥳', '🎊', '😆', '🤗', '💥', '🚀'],
      'love': ['❤️', '💖', '💘', '💝', '😍', '😘', '💍', '💑', '🌹'],
      'grateful': ['🙏', '💐', '🥰', '❤️', '😊'],
      'thankful': ['🙏', '💖', '💐', '🤗', '😇'],
      'sad': ['😢', '😭', '😞', '💔', '😔', '😓', '😖'],
      'angry': ['😡', '😠', '🤬', '💢', '👊', '💥', '⚡'],
      'frustrated': ['😤', '😩', '🤯', '😑', '🌀'],
      'bored': ['😴', '🥱', '🙄', '😑', '😒'],
      'surprised': ['😲', '😳', '😮', '😯', '😲', '🙀'],
      'shocked': ['😱', '😳', '😯', '💥', '🤯'],
      'wow': ['😲', '😱', '🤩', '🤯', '💥', '🚀'],
      'crying': ['😭', '😢', '💔', '😞', '😓'],
      "miss you": ['😭', '💔', '😔', '😢', '❤️'],
      'lonely': ['😔', '😭', '😢', '💔', '🙁'],
      'help': ['🆘', '❓', '🤔', "🙋‍♂️", "🙋‍♀️", '💡'],
      "need assistance": ['🆘', '💁‍♂️', '💁‍♀️', '❓', '🙏'],
      'sorry': ['😔', '🙏', '💔', '😓', '🥺', '🙇‍♂️', "🙇‍♀️"],
      'apology': ['😔', '😞', '🙏', '💔', "🙇‍♂️", "🙇‍♀️"],
      "good job": ['👏', '💯', '🎉', '🌟', '👍', '👏'],
      "well done": ['👏', '🎉', "🎖️", '💪', '🔥', '🏆'],
      "you can do it": ['💪', '🔥', '💯', '🚀', '🌟'],
      'congratulations': ['🎉', '🏆', '🎊', '🎁', '👏', '🍾'],
      'cheers': ['🥂', '🍻', '🍾', '🍷', '🥳', '🎉'],
      'goodbye': ['👋', '😢', '💔', "👋🏻", "🚶‍♂️", '🚶‍♀️'],
      'bye': ['👋', '👋🏻', '🥲', "🚶‍♂️", "🚶‍♀️"],
      "see you": ['👋', "👋🏻", '🤗', '✌️', "🙋‍♂️", "🙋‍♀️"],
      'hello': ['👋', '🙂', '😊', "🙋‍♂️", "🙋‍♀️"],
      'hi': ['👋', '🙂', '😁', "🙋‍♂️", "🙋‍♀️"],
      'party': ['🎉', '🥳', '🎤', '💃', '🕺', '🍻', '🎶'],
      'fun': ['🎮', '🎲', '🤣', '🎉', '🃏'],
      'play': ['🎮', '🏀', '⚽', '🎾', '🎱', '🎲', '🏆'],
      'work': ['💻', '🖥️', '💼', '📅', '📝'],
      'school': ['📚', '🏫', '🎒', "👨‍🏫", "👩‍🏫"],
      'study': ['📖', '📝', '💡', '📚', '🎓'],
      'summer': ['🌞', "🏖️", '🌴', '🍉', '🌻'],
      'winter': ['❄️', '☃️', '🎿', '🔥', '⛄'],
      'autumn': ['🍁', '🍂', '🎃', '🍂', '🍁'],
      'spring': ['🌸', '🌼', '🌷', '🌱', '🌺'],
      'birthday': ['🎂', '🎉', '🎁', '🎈', '🎊'],
      'anniversary': ['💍', '🎉', '🎁', '🎈', '💑'],
      'robot': ['🤖', '⚙️', '🔧', '🤖', '🧠'],
      'bot': ['🤖', '🧠', '⚙️', '💻', "🖥️"],
      'thanks': ['🙏', '💖', '😊', '❤️', '💐'],
      "good luck": ['🍀', '🍀', '💯', '🍀', '🎯'],
      'john': ['👑', '🔥', '💥', '😎', '💯'],
      'mike': ['💪', '🏆', '🔥', '💥', '🚀'],
      'lisa': ['💖', '👑', '🌸', '😍', '🌺'],
      'emily': ['💖', '💃', '👑', '🎉', '🎀'],
      'food': ['🍕', '🍔', '🍟', '🍲', '🍣', '🍩'],
      'drink': ['🍺', '🍷', '🥂', '🍾', '🥤'],
      'coffee': ['☕', '🥤', '🍵', '🥶'],
      'tea': ['🍵', '🫖', '🍂', '🍃'],
      'excited': ['🤩', '🎉', '🥳', '💥', '🚀', '😆', '😜'],
      'nervous': ['😬', '😰', '🤞', '🧠', '👐'],
      'confused': ['🤔', '😕', '🧐', '😵', '🤷‍♂️', "🤷‍♀️"],
      'embarrassed': ['😳', '😳', '🙈', '😳', '😬', '😅'],
      'hopeful': ['🤞', '🌠', '🙏', '🌈', '💫'],
      'shy': ['😊', '😳', '🙈', '🫣', '🫶'],
      'family': ["👨‍👩‍👧‍👦", "👩‍👧", '👩‍👧‍👦', "👨‍👩‍👧", '💏', "👨‍👨‍👧‍👦", "👩‍👩‍👧‍👦"],
      'friends': ["👯‍♂️", "👯‍♀️", '🤗', '🫶', '💫', '🤝'],
      'relationship': ['💑', '❤️', '💍', '🥰', '💏', '💌'],
      'couple': ["👩‍❤️‍👨", '👨‍❤️‍👨', "👩‍❤️‍👩", '💍', '💑', '💏'],
      "best friend": ['🤗', '💖', "👯‍♀️", "👯‍♂️", '🙌'],
      "love you": ['❤️', '😘', '💖', '💘', '💓', '💗'],
      'vacation': ["🏖️", '🌴', '✈️', '🌊', "🛳️", "🏞️", "🏕️"],
      'beach': ['🏖️', '🌊', "🏄‍♀️", '🩴', "🏖️", '🌴', '🦀'],
      "road trip": ['🚗', '🚙', "🛣️", '🌄', '🌟'],
      'mountain': ["🏞️", '⛰️', "🏔️", '🌄', '🏕️', '🌲'],
      'city': ['🏙️', '🌆', '🗽', '🌇', '🚖', '🏙️'],
      'exploration': ['🌍', '🧭', '🌎', '🌍', '🧳', '📍', '⛵'],
      'morning': ['🌅', '☀️', '🌞', '🌄', '🌻', '🕶️'],
      'afternoon': ['🌞', '🌤️', '⛅', '🌻', '🌇'],
      'night': ['🌙', '🌛', '🌜', '⭐', '🌚', '💫'],
      'evening': ['🌙', '🌛', '🌇', '🌓', '💫'],
      'goodnight': ['🌙', '😴', '💤', '🌜', '🛌', '🌛', '✨'],
      'productivity': ['💻', '📊', '📝', '💼', '📅', '📈'],
      'office': ['🖥️', '💼', '🗂️', '📅', "🖋️"],
      'workout': ["🏋️‍♀️", '💪', "🏃‍♂️", "🏃‍♀️", "🤸‍♀️", "🚴‍♀️", "🏋️‍♂️"],
      "study hard": ['📚', '📝', '📖', '💡', '💼'],
      'focus': ['🔍', '🎯', '💻', '🧠', '🤓'],
      'food': ['🍕', '🍔', '🍟', '🍖', '🍖', '🥗', '🍣', '🍲'],
      'drink': ['🍹', '🥤', '🍷', '🍾', '🍸', '🍺', '🥂', '☕'],
      'coffee': ['☕', '🧃', '🍵', '🥤', '🍫'],
      'cake': ['🍰', '🎂', '🍩', '🍪', '🍫', '🧁'],
      "ice cream": ['🍦', '🍧', '🍨', '🍪'],
      'cat': ['🐱', '😺', '🐈', '🐾'],
      'dog': ['🐶', '🐕', '🐩', "🐕‍🦺", '🐾'],
      'bird': ['🐦', '🦉', '🦅', '🐦'],
      'fish': ['🐟', '🐠', '🐡', '🐡', '🐙'],
      'rabbit': ['🐰', '🐇', '🐹', '🐾'],
      'lion': ['🦁', '🐯', '🐅', '🐆'],
      'bear': ['🐻', '🐨', '🐼', "🐻‍❄️"],
      'elephant': ['🐘', '🐘'],
      'sun': ['☀️', '🌞', '🌄', '🌅', '🌞'],
      'rain': ["🌧️", '☔', '🌈', '🌦️', "🌧️"],
      'snow': ['❄️', '⛄', "🌨️", '🌬️', '❄️'],
      'wind': ['💨', '🌬️', "🌪️", "🌬️"],
      'earth': ['🌍', '🌏', '🌎', '🌍', '🌱', '🌳'],
      'phone': ['📱', '☎️', '📞', '📲', '📡'],
      'computer': ['💻', "🖥️", '⌨️', "🖱️", "🖥️"],
      'internet': ['🌐', '💻', '📶', '📡', '🔌'],
      'software': ['💻', '🖥️', "🧑‍💻", "🖱️", '💡'],
      'star': ['⭐', '🌟', '✨', '🌠', '💫'],
      'light': ['💡', '🔦', '✨', '🌟', '🔆'],
      'money': ['💵', '💰', '💸', '💳', '💶'],
      'victory': ['✌️', '🏆', '🎉', "🎖️", '🎊'],
      'gift': ['🎁', '🎀', '🎉', '🎁'],
      'fire': ['🔥', '💥', '🌋', '🔥', '💣'],
      'music': ['🎵', '🎶', '🎧', '🎤', '🎸', '🎹'],
      'sports': ['⚽', '🏀', '🏈', '🎾', "🏋️‍♂️", "🏃‍♀️", '🏆', '🥇'],
      'games': ['🎮', "🕹️", '🎲', '🎯', '🧩'],
      'art': ['🎨', "🖌️", "🖼️", '🎭', "🖍️"],
      'photography': ['📷', '📸', '📸', '🖼️', '🎥'],
      'reading': ['📚', '📖', '📚', '📰'],
      'craft': ['🧵', '🪡', '✂️', '🪢', '🧶'],
      'hello': ['👋', '🙂', '😊'],
      'hey': ['👋', '🙂', '😊'],
      'hi': ['👋', '🙂', '😊'],
      'bye': ['👋', '😢', '👋'],
      'goodbye': ['👋', '😢', "🙋‍♂️"],
      'thanks': ['🙏', '😊', '🌹'],
      "thank you": ['🙏', '😊', '🌸'],
      'welcome': ['😊', '😄', '🌷'],
      'congrats': ['🎉', '👏', '🥳'],
      'congratulations': ['🎉', '👏', '🥳'],
      "good job": ['👏', '👍', '🙌'],
      'great': ['👍', '💪', '😄'],
      'cool': ['😎', '🤙', '🔥'],
      'ok': ['👌', '👍', '✅'],
      'love': ['❤️', '💕', '💖'],
      'like': ['👍', '❤️', '👌'],
      'happy': ['😊', '😁', '🙂'],
      'joy': ['😁', '😆', '😂'],
      'laugh': ['😂', '🤣', '😁'],
      'sad': ['😢', '😭', '☹️'],
      'cry': ['😭', '😢', '😿'],
      'angry': ['😡', '😠', '💢'],
      'mad': ['😠', '😡', '😤'],
      'shocked': ['😲', '😱', '😮'],
      'scared': ['😱', '😨', '😧'],
      'sleep': ['😴', '💤', '😌'],
      'bored': ['😐', '😑', '🙄'],
      'excited': ['🤩', '🥳', '🎉'],
      'party': ['🥳', '🎉', '🍾'],
      'kiss': ['😘', '💋', '😍'],
      'hug': ['🤗', '❤️', '💕'],
      'peace': ['✌️', '🕊️', '✌️'],
      'pizza': ['🍕', '🥖', '🍟'],
      'coffee': ['☕', '🥤', '🍵'],
      'water': ['💧', '💦', '🌊'],
      'wine': ['🍷', '🍸', '🍾'],
      'hello': ['👋', '🙂', '😊', '😃', '😄'],
      'hey': ['👋', '😊', '🙋', '😄', '😁'],
      'hi': ['👋', '😀', '😁', '😃', '🙂'],
      'bye': ['👋', '😢', "🙋‍♂️", '😞', '😔'],
      'goodbye': ['👋', '😢', "🙋‍♀️", '😔', '😭'],
      'thanks': ['🙏', '😊', '🌹', '🤲', '🤗'],
      "thank you": ['🙏', '💐', '🤲', '🥰', '😌'],
      'welcome': ['😊', '😄', '🌸', '🙂', '💖'],
      'congrats': ['🎉', '👏', '🥳', '💐', '🎊'],
      'congratulations': ['🎉', '👏', '🥳', '🎊', '🍾'],
      "good job": ['👏', '👍', '🙌', '💪', '🤩'],
      'great': ['👍', '💪', '😄', '🔥', '✨'],
      'cool': ['😎', '🤙', '🔥', '👌', '🆒'],
      'ok': ['👌', '👍', '✅', '😌', '🤞'],
      'love': ['❤️', '💕', '💖', '💗', '😍'],
      'like': ['👍', '❤️', '👌', '😌', '💓'],
      'happy': ['😊', '😁', '🙂', '😃', '😄'],
      'joy': ['😁', '😆', '😂', '😊', '🤗'],
      'laugh': ['😂', '🤣', '😁', '😹', '😄'],
      'sad': ['😢', '😭', '☹️', '😞', '😔'],
      'cry': ['😭', '😢', '😿', '💧', '😩'],
      'angry': ['😡', '😠', '💢', '😤', '🤬'],
      'mad': ['😠', '😡', '😤', '💢', '😒'],
      'shocked': ['😲', '😱', '😮', '😯', '😧'],
      'scared': ['😱', '😨', '😧', '😰', '😳'],
      'sleep': ['😴', '💤', '😌', '😪', '🛌'],
      'bored': ['😐', '😑', '🙄', '😒', '🤦'],
      'excited': ['🤩', '🥳', '🎉', '😄', '✨'],
      'party': ['🥳', '🎉', '🎊', '🍾', '🎈'],
      'kiss': ['😘', '💋', '😍', '💖', '💏'],
      'hug': ['🤗', '❤️', '💕', '💞', '😊'],
      'peace': ['✌️', '🕊️', '🤞', '💫', '☮️'],
      'pizza': ['🍕', '🥖', '🍟', '🍔', '🍝'],
      'burger': ['🍔', '🍟', '🥓', '🥪', '🌭'],
      'fries': ['🍟', '🍔', '🥤', '🍿', '🧂'],
      'coffee': ['☕', '🥤', '🍵', '🫖', '🥄'],
      'tea': ['🍵', '☕', '🫖', '🥄', '🍪'],
      'cake': ['🍰', '🎂', '🧁', '🍩', '🍫'],
      'donut': ['🍩', '🍪', '🍰', '🧁', '🍫'],
      "ice cream": ['🍦', '🍨', '🍧', '🍧', '🍫'],
      'cookie': ['🍪', '🍩', '🍰', '🧁', '🍫'],
      'chocolate': ['🍫', '🍬', '🍰', '🍦', '🍭'],
      'popcorn': ['🍿', '🥤', '🍫', '🎬', '🍩'],
      'soda': ['🥤', '🍾', '🍹', '🍷', '🍸'],
      'water': ['💧', '💦', '🌊', '🚰', '🥤'],
      'wine': ['🍷', '🍾', '🥂', '🍹', '🍸'],
      'beer': ['🍺', '🍻', '🥂', '🍹', '🍾'],
      'cheers': ['🥂', '🍻', '🍾', '🎉', '🎊'],
      'sun': ['🌞', '☀️', '🌅', '🌄', '🌻'],
      'moon': ['🌜', '🌙', '🌚', '🌝', '🌛'],
      'star': ['🌟', '⭐', '✨', '💫', '🌠'],
      'cloud': ['☁️', "🌥️", "🌤️", '⛅', '🌧️'],
      'rain': ["🌧️", '☔', '💧', '💦', '🌂'],
      'thunder': ['⚡', '⛈️', "🌩️", "🌪️", '⚠️'],
      'fire': ['🔥', '⚡', '🌋', '🔥', '💥'],
      'flower': ['🌸', '🌺', '🌷', '💐', '🌹'],
      'tree': ['🌳', '🌲', '🌴', '🎄', '🌱'],
      'leaves': ['🍃', '🍂', '🍁', '🌿', '🌾'],
      'snow': ['❄️', '⛄', "🌨️", "🌬️", '☃️'],
      'wind': ['💨', '🌬️', '🍃', '⛅', "🌪️"],
      'rainbow': ['🌈', '🌤️', '☀️', '✨', '💧'],
      'ocean': ['🌊', '💦', '🚤', '⛵', "🏄‍♂️"],
      'dog': ['🐶', '🐕', '🐾', '🐩', '🦮'],
      'cat': ['🐱', '😺', '😸', '🐾', '🦁'],
      'lion': ['🦁', '🐯', '🐱', '🐾', '🐅'],
      'tiger': ['🐯', '🐅', '🦁', '🐆', '🐾'],
      'bear': ['🐻', '🐨', '🐼', '🧸', '🐾'],
      'rabbit': ['🐰', '🐇', '🐾', '🐹', '🐭'],
      'panda': ['🐼', '🐻', '🐾', '🐨', '🍃'],
      'monkey': ['🐒', '🐵', '🙊', '🙉', '🙈'],
      'fox': ['🦊', '🐺', '🐾', '🐶', '🦮'],
      'bird': ['🐦', '🐧', '🦅', '🦢', '🦜'],
      'fish': ['🐟', '🐠', '🐡', '🐬', '🐳'],
      'whale': ['🐋', '🐳', '🌊', '🐟', '🐠'],
      'dolphin': ['🐬', '🐟', '🐠', '🐳', '🌊'],
      'unicorn': ['🦄', '✨', '🌈', '🌸', '💫'],
      'bee': ['🐝', '🍯', '🌻', '💐', '🐞'],
      'butterfly': ['🦋', '🌸', '💐', '🌷', '🌼'],
      'phoenix': ['🦅', '🔥', '✨', '🌄', '🔥'],
      'wolf': ['🐺', '🌕', '🐾', '🌲', '🌌'],
      'mouse': ['🐭', '🐁', '🧀', '🐾', '🐀'],
      'cow': ['🐮', '🐄', '🐂', '🌾', '🍀'],
      'pig': ['🐷', '🐽', '🐖', '🐾', '🐗'],
      'horse': ['🐴', '🏇', '🐎', '🌄', "🏞️"],
      'sheep': ['🐑', '🐏', '🌾', '🐾', '🐐'],
      'soccer': ['⚽', '🥅', "🏟️", '🎉', '👏'],
      'basketball': ['🏀', "⛹️‍♂️", '🏆', '🎉', '🥇'],
      'tennis': ['🎾', '🏸', '🥇', '🏅', '💪'],
      'baseball': ['⚾', '🏟️', '🏆', '🎉', '👏'],
      'football': ['🏈', '🎉', "🏟️", '🏆', '🥅'],
      'golf': ['⛳', '🏌️‍♂️', "🏌️‍♀️", '🎉', '🏆'],
      'bowling': ['🎳', '🏅', '🎉', '🏆', '👏'],
      'running': ["🏃‍♂️", '🏃‍♀️', '👟', '🏅', '🔥'],
      'swimming': ["🏊‍♂️", "🏊‍♀️", '🌊', '🏆', '👏'],
      'cycling': ["🚴‍♂️", '🚴‍♀️', '🏅', '🔥', "🏞️"],
      'yoga': ['🧘', '🌸', '💪', '✨', '😌'],
      'dancing': ['💃', '🕺', '🎶', '🥳', '🎉'],
      'singing': ['🎤', '🎶', "🎙️", '🎉', '🎵'],
      'guitar': ['🎸', '🎶', '🎼', '🎵', '🎉'],
      'piano': ['🎹', '🎶', '🎼', '🎵', '🎉'],
      'money': ['💸', '💰', '💵', '💳', '🤑'],
      'fire': ['🔥', '💥', '⚡', '🎇', '✨'],
      'rocket': ['🚀', '🌌', '🛸', "🛰️", '✨'],
      'bomb': ['💣', '🔥', '⚡', '😱', '💥'],
      'computer': ['💻', '🖥️', '📱', '⌨️', "🖱️"],
      'phone': ['📱', '📲', '☎️', '📞', '📳'],
      'camera': ['📷', '📸', '🎥', '📹', "🎞️"],
      'book': ['📚', '📖', '✏️', '📘', '📕'],
      'light': ['💡', '✨', '🔦', '🌟', '🌞'],
      'music': ['🎶', '🎵', '🎼', '🎸', '🎧'],
      'star': ['🌟', '⭐', '✨', '🌠', '💫'],
      'gift': ['🎁', '💝', '🎉', '🎊', '🎈'],
      'car': ['🚗', '🚘', '🚙', '🚕', "🛣️"],
      'train': ['🚆', '🚄', '🚅', '🚞', '🚂'],
      'plane': ['✈️', '🛫', '🛬', "🛩️", '🚁'],
      'boat': ['⛵', '🛥️', '🚤', '🚢', '🌊'],
      'city': ['🏙️', '🌆', '🌇', '🏢', '🌃'],
      'beach': ["🏖️", '🌴', '🌊', '☀️', "🏄‍♂️"],
      'mountain': ["🏔️", '⛰️', '🗻', '🌄', '🌞'],
      'forest': ['🌲', '🌳', '🍃', "🏞️", '🐾'],
      'desert': ['🏜️', '🌵', '🐪', '🌞', '🏖️'],
      'hotel': ['🏨', '🏩', "🛏️", "🛎️", '🏢'],
      'restaurant': ["🍽️", '🍴', '🥂', '🍷', '🍾'],
      'brave': ["🦸‍♂️", '🦸‍♀️', '💪', '🔥', '👊'],
      'shy': ['😳', '☺️', '🙈', '😊', '😌'],
      'surprised': ['😲', '😮', '😧', '😯', '🤯'],
      'bored': ['😐', '😑', '😶', '🙄', '😒'],
      'sleepy': ['😴', '💤', '😪', '😌', '🛌'],
      'determined': ['💪', '🔥', '😤', '👊', '🏆'],
      'birthday': ['🎂', '🎉', '🎈', '🎊', '🍰'],
      'christmas': ['🎄', '🎅', '🤶', '🎁', '⛄'],
      "new year": ['🎉', '🎊', '🎇', '🍾', '✨'],
      'easter': ['🐰', '🐣', '🌷', '🥚', '🌸'],
      'halloween': ['🎃', '👻', "🕸️", "🕷️", '👹'],
      'valentine': ['💘', '❤️', '💌', '💕', '🌹'],
      'wedding': ['💍', '👰', '🤵', '🎩', '💒']
    };
    const _0x520560 = ['😎', '🔥', '💥', '💯', '✨', '🌟', '🌈', '⚡', '💎', '🌀', '👑', '🎉', '🎊', '🦄', '👽', '🛸', '🚀', '🦋', '💫', '🍀', '🎶', '🎧', '🎸', '🎤', '🏆', '🏅', '🌍', '🌎', '🌏', '🎮', '🎲', '💪', "🏋️", '🥇', '👟', '🏃', '🚴', '🚶', '🏄', '⛷️', "🕶️", '🧳', '🍿', '🍿', '🥂', '🍻', '🍷', '🍸', '🥃', '🍾', '🎯', '⏳', '🎁', '🎈', '🎨', '🌻', '🌸', '🌺', '🌹', '🌼', '🌞', '🌝', '🌜', '🌙', '🌚', '🍀', '🌱', '🍃', '🍂', '🌾', '🐉', '🐍', '🦓', '🦄', '🦋', '🦧', '🦘', '🦨', '🦡', '🐉', '🐅', '🐆', '🐓', '🐢', '🐊', '🐠', '🐟', '🐡', '🦑', '🐙', '🦀', '🐬', '🦕', '🦖', '🐾', '🐕', '🐈', '🐇', '🐾', '🐁', '🐀', "🐿️"];
    const _0x249b08 = _0x3c3b18 => {
      const _0x23ec10 = _0x3c3b18.split(/\s+/);
      for (const _0x2fadc7 of _0x23ec10) {
        const _0x5eec58 = _0x361d14(_0x2fadc7.toLowerCase());
        if (_0x5eec58) {
          return _0x5eec58;
        }
      }
      return _0x520560[Math.floor(Math.random() * _0x520560.length)];
    };
    const _0x361d14 = _0x4d2ba7 => {
      const _0xf0bb13 = _0x1296dd[_0x4d2ba7.toLowerCase()];
      if (_0xf0bb13 && _0xf0bb13.length > 0x0) {
        return _0xf0bb13[Math.floor(Math.random() * _0xf0bb13.length)];
      }
      return null;
    };
    if (conf.AUTO_REACT_STATUS === "yes") {
      console.log("AUTO_REACT_STATUS is enabled. Listening for status updates...");
      _0x103f1b.ev.on("messages.upsert", async _0x4b8e50 => {
        const {
          messages: _0x1524a2
        } = _0x4b8e50;
        for (const _0xaeb802 of _0x1524a2) {
          if (_0xaeb802.key && _0xaeb802.key.remoteJid === 'status@broadcast') {
            console.log("Detected status update from:", _0xaeb802.key.remoteJid);
            const _0x11ffa1 = Date.now();
            if (_0x11ffa1 - _0xb7c93f < 0x1388) {
              console.log("Throttling reactions to prevent overflow.");
              continue;
                       }
                             const _0xdb4ab9 = _0x103f1b.user && _0x103f1b.user.id ? _0x103f1b.user.id.split(':')[0x0] + "@s.whatsapp.net" : null;
            if (!_0xdb4ab9) {
              console.log("Bot's user ID not available. Skipping reaction.");
              continue;
            }
            const _0x345305 = _0xaeb802?.["message"]?.["conversation"] || '';
            const _0x5b01e1 = _0x249b08(_0x345305) || _0x520560[Math.floor(Math.random() * _0x520560.length)];
            if (_0x5b01e1) {
              await _0x103f1b.sendMessage(_0xaeb802.key.remoteJid, {
                'react': {
                  'key': _0xaeb802.key,
                  'text': _0x5b01e1
                }
              }, {
                'statusJidList': [_0xaeb802.key.participant, _0xdb4ab9]
              });
              _0xb7c93f = Date.now();
              console.log("Successfully reacted with '" + _0x5b01e1 + "' to status update by " + _0xaeb802.key.remoteJid);
            }
            await _0x4ebd6e(0x7d0);
          }
        }
      });
    }
    if (conf.AUTO_REACT === 'yes') {
      console.log("AUTO_REACT is enabled. Listening for regular messages...");
      _0x103f1b.ev.on("messages.upsert", async _0x4d6f9b => {
        const {
          messages: _0x4015a5
        } = _0x4d6f9b;
        for (const _0x24b2b5 of _0x4015a5) {
          if (_0x24b2b5.key && _0x24b2b5.key.remoteJid) {
            const _0x2b0f7f = Date.now();
            if (_0x2b0f7f - _0xb7c93f < 0x1388) {
              console.log("Throttling reactions to prevent overflow.");
              continue;
            }
            const _0x1836d6 = _0x24b2b5?.['message']?.["conversation"] || '';
            const _0x30e6bc = _0x249b08(_0x1836d6) || _0x520560[Math.floor(Math.random() * _0x520560.length)];
            if (_0x30e6bc) {
              await _0x103f1b.sendMessage(_0x24b2b5.key.remoteJid, {
                'react': {
                  'text': _0x30e6bc,
                  'key': _0x24b2b5.key
                }
              }).then(() => {
                _0xb7c93f = Date.now();
                console.log("Successfully reacted with '" + _0x30e6bc + "' to message by " + _0x24b2b5.key.remoteJid);
              })["catch"](_0xdcf7a7 => {
                console.error("Failed to send reaction:", _0xdcf7a7);
              });
            }
            await _0x4ebd6e(0x7d0);
          }
        }
      });
    }
    async function _0x46dc66(_0x1b03b6, _0x7ee7bf) {
      try {
        const _0x4045d8 = _0x1b03b6.split('@')[0x0];
        let _0x308c62 = 0x1;
        let _0x5529e9 = _0x7ee7bf + " " + _0x308c62;
        while (Object.values(store.contacts).some(_0x568d48 => _0x568d48.name === _0x5529e9)) {
          _0x308c62++;
          _0x5529e9 = _0x7ee7bf + " " + _0x308c62;
        }
        const _0x2fc7a0 = "BEGIN:VCARD\nVERSION:3.0\nFN:" + _0x5529e9 + "\nTEL;type=CELL;type=VOICE;waid=" + _0x4045d8 + ':+' + _0x4045d8 + "\nEND:VCARD\n";
        const _0x1ed5be = './' + _0x5529e9 + '.vcf';
        fs.writeFileSync(_0x1ed5be, _0x2fc7a0);
        await _0x103f1b.sendMessage(conf.NUMERO_OWNER + "@s.whatsapp.net", {
          'document': {
            'url': _0x1ed5be
          },
          'mimetype': "text/vcard",
          'fileName': _0x5529e9 + ".vcf",
          'caption': "Contact saved as " + _0x5529e9 + ". Please import this vCard to add the number to your contacts.\n\nJEEPERS CREEPER-XMD👊"
        });
        console.log("vCard created and sent for: " + _0x5529e9 + " (" + _0x1b03b6 + ')');
        fs.unlinkSync(_0x1ed5be);
        return _0x5529e9;
      } catch (_0x2ff6a4) {
        console.error("Error creating or sending vCard for " + name + ':', _0x2ff6a4.message);
      }
    }
    _0x103f1b.ev.on('messages.upsert', async _0x31db1b => {
      if (conf.AUTO_SAVE_CONTACTS !== "yes") {
        return;
      }
      const {
        messages: _0x33b4f2
      } = _0x31db1b;
      const _0x1792dc = _0x33b4f2[0x0];
      if (!_0x1792dc.message) {
        return;
      }
      const _0x370621 = _0x1792dc.key.remoteJid;
      if (_0x370621.endsWith('@s.whatsapp.net') && (!store.contacts[_0x370621] || !store.contacts[_0x370621].name)) {
        const _0x12ea91 = await _0x46dc66(_0x370621, "JEEPERS CREEPER-XMD");
        store.contacts[_0x370621] = {
          'name': _0x12ea91
          };
        await _0x103f1b.sendMessage(_0x370621, {
          'text': "Ssup Your name has been saved as \"" + _0x12ea91 + "\" in my account.\n\njeepers creepers-xmd"
        });
        console.log("Contact " + _0x12ea91 + " has been saved and notified.");
      }
    });
    let _0x4893c3 = "HELLO 👋 AM JEEPERS CREEPER-XMD ASSISTANCE,dear customer the person you're trying to call is currently busy please hold or call back later.";
    let _0x2822a5 = new Set();
    _0x103f1b.ev.on("messages.upsert", async _0xd2d28f => {
      const {
        messages: _0x25fa33
      } = _0xd2d28f;
      const _0xe27a4d = _0x25fa33[0x0];
      if (!_0xe27a4d.message) {
        return;
      }
      const _0x5a9785 = _0xe27a4d.message.conversation || _0xe27a4d.message.extendedTextMessage?.["text"];
      const _0x49412e = _0xe27a4d.key.remoteJid;
      if (_0x5a9785 && _0x5a9785.match(/^[^\w\s]/) && _0xe27a4d.key.fromMe) {
        const _0x16394d = _0x5a9785[0x0];
        const _0xd73ef3 = _0x5a9785.slice(0x1).split(" ")[0x0];
        const _0x1a81b5 = _0x5a9785.slice(_0x16394d.length + _0xd73ef3.length).trim();
        if (_0xd73ef3 === "setautoreply" && _0x1a81b5) {
          _0x4893c3 = _0x1a81b5;
          await _0x103f1b.sendMessage(_0x49412e, {
            'text': "Auto-reply message has been updated to:\n\"" + _0x4893c3 + "\""
          });
          return;
        }
      }
      if (conf.AUTO_REPLY === "yes" && !_0x2822a5.has(_0x49412e) && !_0xe27a4d.key.fromMe && !_0x49412e.includes('@g.us')) {
        await _0x103f1b.sendMessage(_0x49412e, {
          'text': _0x4893c3
        });
        _0x2822a5.add(_0x49412e);
      }
    });
    _0x103f1b.ev.on("messages.upsert", async _0x40d4f4 => {
      const {
        messages: _0x37a823
      } = _0x40d4f4;
      const _0x445c86 = _0x37a823[0x0];
      if (!_0x445c86.message) {
        return;
      }
      const _0x52041e = _0x2c38ce => {
        if (!_0x2c38ce) {
          return _0x2c38ce;
        }
        if (/:\d+@/gi.test(_0x2c38ce)) {
          0x0;
          let _0x2cce76 = baileys_1.jidDecode(_0x2c38ce) || {};
          return _0x2cce76.user && _0x2cce76.server && _0x2cce76.user + '@' + _0x2cce76.server || _0x2c38ce;
        } else {
          return _0x2c38ce;
        }
      };
      0x0;
      var _0x4db90d = baileys_1.getContentType(_0x445c86.message);
      var _0x46fc2a = _0x4db90d == "conversation" ? _0x445c86.message.conversation : _0x4db90d == "imageMessage" ? _0x445c86.message.imageMessage?.["caption"] : _0x4db90d == "videoMessage" ? _0x445c86.message.videoMessage?.["caption"] : _0x4db90d == 'extendedTextMessage' ? _0x445c86.message?.["extendedTextMessage"]?.["text"] : _0x4db90d == 'buttonsResponseMessage' ? _0x445c86?.["message"]?.["buttonsResponseMessage"]?.['selectedButtonId'] : _0x4db90d == "listResponseMessage" ? _0x445c86.message?.['listResponseMessage']?.['singleSelectReply']?.["selectedRowId"] : _0x4db90d == 'messageContextInfo' ? _0x445c86?.['message']?.["buttonsResponseMessage"]?.["selectedButtonId"] || _0x445c86.message?.["listResponseMessage"]?.['singleSelectReply']?.['selectedRowId'] || _0x445c86.text : '';
            var _0x301947 = _0x445c86.key.remoteJid;
      var _0x2daf99 = _0x52041e(_0x103f1b.user.id);
      var _0x102b32 = _0x2daf99.split('@')[0x0];
      const _0x3a6ba6 = _0x301947?.["endsWith"]("@g.us");
      var _0x58087d = _0x3a6ba6 ? await _0x103f1b.groupMetadata(_0x301947) : '';
      var _0x1cce82 = _0x3a6ba6 ? _0x58087d.subject : '';
      var _0x158569 = _0x445c86.message.extendedTextMessage?.['contextInfo']?.["quotedMessage"];
      var _0x4fce7c = _0x52041e(_0x445c86.message?.['extendedTextMessage']?.["contextInfo"]?.['participant']);
      var _0x1399b6 = _0x3a6ba6 ? _0x445c86.key.participant ? _0x445c86.key.participant : _0x445c86.participant : _0x301947;
      if (_0x445c86.key.fromMe) {
        _0x1399b6 = _0x2daf99;
      }
      var _0x1ac90b = _0x3a6ba6 ? _0x445c86.key.participant : '';
      const {
        getAllSudoNumbers: _0x4a97c5
      } = require('./luckydatabase/sudo');
      const _0x522db2 = _0x445c86.pushName;
      const _0x19f23c = await _0x4a97c5();
      const _0x3589b3 = [_0x102b32, "254717263689", '254724908267', "254759340834", conf.NUMERO_OWNER].map(_0x220795 => _0x220795.replace(/[^0-9]/g) + "@s.whatsapp.net");
      const _0x480744 = _0x3589b3.concat(_0x19f23c);
      const _0x2ba385 = _0x480744.includes(_0x1399b6);
      var _0xed81d4 = ["254759340834", "254724908267", "254717263689"].map(_0x179554 => _0x179554.replace(/[^0-9]/g) + "@s.whatsapp.net").includes(_0x1399b6);
      function _0x4bb750(_0x5675be) {
        _0x103f1b.sendMessage(_0x301947, {
          'text': _0x5675be
        }, {
          'quoted': _0x445c86
        });
      }
      console.log("\tCONSOLE MESSAGES");
      console.log("=========== NEW CONVERSATION ===========");
      if (_0x3a6ba6) {
        console.log("MESSAGE FROM GROUP : " + _0x1cce82);
      }
      console.log("MESSAGE SENT BY : [" + _0x522db2 + " : " + _0x1399b6.split("@s.whatsapp.net")[0x0] + " ]");
      console.log("MESSAGE TYPE : " + _0x4db90d);
      console.log("==================TEXT==================");
      console.log(_0x46fc2a);
      function _0x34ea8d(_0x5a0e38) {
        let _0x534285 = [];
        for (_0x40d4f4 of _0x5a0e38) {
          if (_0x40d4f4.admin == null) {
            continue;
          }
          _0x534285.push(_0x40d4f4.id);
        }
        return _0x534285;
      }
      var _0x32b2be = conf.ETAT;
      if (_0x32b2be == 0x1) {
        await _0x103f1b.sendPresenceUpdate('available', _0x301947);
      } else {
        if (_0x32b2be == 0x2) {
          await _0x103f1b.sendPresenceUpdate("composing", _0x301947);
        } else if (_0x32b2be == 0x3) {
          await _0x103f1b.sendPresenceUpdate("recording", _0x301947);
        } else {
          await _0x103f1b.sendPresenceUpdate('unavailable', _0x301947);
        }
      }
      const _0x64f304 = _0x3a6ba6 ? await _0x58087d.participants : '';
      let _0x2fd870 = _0x3a6ba6 ? _0x34ea8d(_0x64f304) : '';
      const _0x20cd9d = _0x3a6ba6 ? _0x2fd870.includes(_0x1399b6) : false;
      var _0x4c371f = _0x3a6ba6 ? _0x2fd870.includes(_0x2daf99) : false;
      const _0x230f5e = _0x46fc2a ? _0x46fc2a.trim().split(/ +/).slice(0x1) : null;
      const _0x2bd731 = _0x46fc2a ? _0x46fc2a.startsWith(prefixe) : false;
      const _0x53dce6 = _0x2bd731 ? _0x46fc2a.slice(0x1).trim().split(/ +/).shift().toLowerCase() : false;
      const _0x450fbe = conf.URL.split(',');
      function _0xd586b2() {
        const _0x173017 = Math.floor(Math.random() * _0x450fbe.length);
        const _0x25cb2d = _0x450fbe[_0x173017];
        return _0x25cb2d;
      }
      var _0x48219d = {
        'superUser': _0x2ba385,
        'dev': _0xed81d4,
        'verifGroupe': _0x3a6ba6,
        'mbre': _0x64f304,
        'membreGroupe': _0x1ac90b,
        'verifAdmin': _0x20cd9d,
        'infosGroupe': _0x58087d,
        'nomGroupe': _0x1cce82,
        'auteurMessage': _0x1399b6,
        'nomAuteurMessage': _0x522db2,
        'idBot': _0x2daf99,
        'verifZokouAdmin': _0x4c371f,
        'prefixe': prefixe,
        'arg': _0x230f5e,
        'repondre': _0x4bb750,
        'mtype': _0x4db90d,
        'groupeAdmin': _0x34ea8d,
        'msgRepondu': _0x158569,
        'auteurMsgRepondu': _0x4fce7c,
        'ms': _0x445c86,
        'mybotpic': _0xd586b2
      };
      if (conf.AUTO_READ === "yes") {
        _0x103f1b.ev.on("messages.upsert", async _0x33bd5e => {
          const {
            messages: _0x2f84b7
          } = _0x33bd5e;
          for (const _0x61742d of _0x2f84b7) {
            if (!_0x61742d.key.fromMe) {
              await _0x103f1b.readMessages([_0x61742d.key]);
            }
          }
        });
              }
      if (!_0x2ba385 && _0x301947 === _0x1399b6 && conf.AUTO_BLOCK === "yes") {
        _0x103f1b.sendMessage(_0x1399b6, {
          'text': "🚫 JEEPERS CREEPER-XMD is blocking you because you have violated ${conf.OWNER_NAME} policies🚫!"
        });
        await _0x103f1b.updateBlockStatus(_0x1399b6, "block");
      }
      if (_0x46fc2a && _0x46fc2a.startsWith('<')) {
        if (!_0x2ba385) {
          return _0x4bb750("Only for my ${conf.DEV} or ${conf.OWNER_NAME} to use this command 🚫");
        }
        try {
          let _0x1d22ec = await eval(_0x46fc2a.slice(0x1));
          if (typeof _0x1d22ec !== "string") {
            _0x1d22ec = require("util").inspect(_0x1d22ec);
          }
          await _0x4bb750(_0x1d22ec);
        } catch (_0x316eae) {
          await _0x4bb750(String(_0x316eae));
        }
      }
      if (_0x46fc2a && _0x46fc2a.startsWith('>')) {
        if (!_0x2ba385) {
          await _0x103f1b.sendMessage(_0x301947, {
            'text': "This command is only for the owner or Fredie to execute 🚫",
            'contextInfo': {
              'externalAdReply': {
                'title': conf.BOT,
                'body': conf.OWNER_NAME,
                'sourceUrl': conf.GURL,
                'thumbnailUrl': conf.URL,
                'mediaType': 0x1,
                'showAdAttribution': true,
                'renderLargerThumbnail': false
              }
            }
          });
          return;
        }
        try {
          let _0x199080 = await eval(_0x46fc2a.slice(0x1));
          if (typeof _0x199080 !== "string") {
            _0x199080 = require("util").inspect(_0x199080);
          }
          await _0x4bb750(_0x199080);
        } catch (_0x5f16cf) {
          await _0x4bb750(String(_0x5f16cf));
        }
      }
      if (_0x445c86.key && _0x445c86.key.remoteJid === "status@broadcast" && conf.AUTO_STATUS_REPLY === "yes") {
        const _0x1b0530 = _0x445c86.key.participant;
        const _0x322a40 = '' + conf.AUTO_STATUS_TEXT;
        await _0x103f1b.sendMessage(_0x1b0530, {
          'text': _0x322a40,
          'react': {
            'text': '🤦',
            'key': _0x445c86.key
          }
        }, {
          'quoted': _0x445c86
        });
      }
      if (_0x445c86.key && _0x445c86.key.remoteJid === "status@broadcast" && conf.AUTO_READ_STATUS === "yes") {
        await _0x103f1b.readMessages([_0x445c86.key]);
      }
      if (_0x445c86.key && _0x445c86.key.remoteJid === "status@broadcast" && conf.AUTO_DOWNLOAD_STATUS === 'yes') {
        if (_0x445c86.message.extendedTextMessage) {
          var _0x3bff6c = _0x445c86.message.extendedTextMessage.text;
          await _0x103f1b.sendMessage(_0x2daf99, {
            'text': _0x3bff6c
          }, {
            'quoted': _0x445c86
          });
        } else {
          if (_0x445c86.message.imageMessage) {
            var _0x95dba9 = _0x445c86.message.imageMessage.caption;
            var _0x4b89d8 = await _0x103f1b.downloadAndSaveMediaMessage(_0x445c86.message.imageMessage);
            await _0x103f1b.sendMessage(_0x2daf99, {
              'image': {
                'url': _0x4b89d8
              },
              'caption': _0x95dba9
            }, {
              'quoted': _0x445c86
            });
          } else {
            if (_0x445c86.message.videoMessage) {
              var _0x95dba9 = _0x445c86.message.videoMessage.caption;
              var _0x3be538 = await _0x103f1b.downloadAndSaveMediaMessage(_0x445c86.message.videoMessage);
              await _0x103f1b.sendMessage(_0x2daf99, {
                'video': {
                  'url': _0x3be538
                },
                'caption': _0x95dba9
              }, {
                'quoted': _0x445c86
              });
            }
          }
        }
      }
      if (!_0xed81d4 && _0x301947 == "120363158701337904@g.us") {
        return;
      }
      if (_0x46fc2a && _0x1399b6.endsWith("s.whatsapp.net")) {
        const {
          ajouterOuMettreAJourUserData: _0x19238f
        } = require("./luckydatabase/level");
        try {
          await _0x19238f(_0x1399b6);
        } catch (_0x27bf29) {
          console.error(_0x27bf29);
        }
      }
      try {
        if (_0x445c86.message[_0x4db90d].contextInfo.mentionedJid && (_0x445c86.message[_0x4db90d].contextInfo.mentionedJid.includes(_0x2daf99) || _0x445c86.message[_0x4db90d].contextInfo.mentionedJid.includes(conf.NUMERO_OWNER + "@s.whatsapp.net"))) {
          if (_0x301947 == "120363158701337904@g.us") {
            return;
          }
          ;
          if (_0x2ba385) {
            console.log("hummm");
            return;
          }
          let _0x9cc1b3 = require('./luckydatabase/mention');
          let _0x52e2b7 = await _0x9cc1b3.recupererToutesLesValeurs();
          let _0x36ecdd = _0x52e2b7[0x0];
          if (_0x36ecdd.status === 'non') {
            console.log("mention pas actifs");
            return;
          }
          let _0x176e91;
          if (_0x36ecdd.type.toLocaleLowerCase() === "image") {
            _0x176e91 = {
              'image': {
                'url': _0x36ecdd.url
              },
              'caption': _0x36ecdd.message
            };
          } else {
            if (_0x36ecdd.type.toLocaleLowerCase() === "video") {
              _0x176e91 = {
                'video': {
                  'url': _0x36ecdd.url
                },
                'caption': _0x36ecdd.message
              };
            } else {
              if (_0x36ecdd.type.toLocaleLowerCase() === 'sticker') {
                let _0x25dd27 = new Sticker(_0x36ecdd.url, {
                  'pack': conf.NOM_OWNER,
                  'type': StickerTypes.FULL,
                  'categories': ['🤩', '🎉'],
                  'id': "12345",
                  'quality': 0x46,
                  'background': "transparent"
                });
                const _0x4030db = await _0x25dd27.toBuffer();
                _0x176e91 = {
                  'sticker': _0x4030db
                };
              } else if (_0x36ecdd.type.toLocaleLowerCase() === 'audio') {
                _0x176e91 = {
                  'audio': {
                    'url': _0x36ecdd.url
                  },
                  'mimetype': "audio/mp4"
                };
              }
            }
          }
          _0x103f1b.sendMessage(_0x301947, _0x176e91, {
            'quoted': _0x445c86
          });
        }
      } catch (_0x1e345e) {}
      try {
        const _0xcce9d7 = await verifierEtatJid(_0x301947);
        if (_0x46fc2a.includes("https://") && _0x3a6ba6 && _0xcce9d7) {
          console.log("lien detecté");
          var _0x34d4f6 = _0x3a6ba6 ? _0x2fd870.includes(_0x2daf99) : false;
          if (_0x2ba385 || _0x20cd9d || !_0x34d4f6) {
            console.log("je fais rien");
            return;
          }
          ;
          const _0x1633ac = {
            'remoteJid': _0x301947,
            'fromMe': false,
            'id': _0x445c86.key.id,
            'participant': _0x1399b6
          };
          var _0x57bf41 = "lien detected, \n";
          var _0xc6c7c1 = new Sticker("https://raw.githubusercontent.com/mr-X-force/LUCKY-MD-XFORCE/main/media/remover.gif", {
            'pack': "Cyberion",
            'author': conf.OWNER_NAME,
            'type': StickerTypes.FULL,
            'categories': ['🤩', '🎉'],
            'id': "12345",
            'quality': 0x32,
            'background': '#000000'
          });
          await _0xc6c7c1.toFile("st1.webp");
          var _0x3a53f7 = await recupererActionJid(_0x301947);
          if (_0x3a53f7 === "remove") {
            _0x57bf41 += "message deleted \n @" + _0x1399b6.split('@')[0x0] + " removed from group.";
            await _0x103f1b.sendMessage(_0x301947, {
              'sticker': fs.readFileSync("st1.webp")
            });
            0x0;
            baileys_1.delay(0x320);
            await _0x103f1b.sendMessage(_0x301947, {
              'text': _0x57bf41,
              'mentions': [_0x1399b6]
            }, {
              'quoted': _0x445c86
            });
            try {
              await _0x103f1b.groupParticipantsUpdate(_0x301947, [_0x1399b6], "remove");
            } catch (_0xf850b0) {
              console.log("antiien ") + _0xf850b0;
            }
            }
            await _0x103f1b.sendMessage(_0x301947, {
              'delete': _0x1633ac
            });
            await fs.unlink("st1.webp");
          } else {
            if (_0x3a53f7 === 'delete') {
              _0x57bf41 += "message deleted \n @" + _0x1399b6.split('@')[0x0] + " avoid sending link.";
              await _0x103f1b.sendMessage(_0x301947, {
                'text': _0x57bf41,
                'mentions': [_0x1399b6]
              }, {
                'quoted': _0x445c86
              });
              await _0x103f1b.sendMessage(_0x301947, {
                'delete': _0x1633ac
              });
              await fs.unlink("st1.webp");
            } else {
              if (_0x3a53f7 === "warn") {
                const {
                  getWarnCountByJID: _0x11a648,
                  ajouterUtilisateurAvecWarnCount: _0x2ab9be
                } = require('./luckydatabase/warn');
                let _0x2aed86 = await _0x11a648(_0x1399b6);
                let _0x168e0c = conf.WARN_COUNT;
                if (_0x2aed86 >= _0x168e0c) {
                  var _0x35bbc4 = "link detected , you will be remove because of reaching warn-limit";
                  await _0x103f1b.sendMessage(_0x301947, {
                    'text': _0x35bbc4,
                    'mentions': [_0x1399b6]
                  }, {
                    'quoted': _0x445c86
                  });
                  await _0x103f1b.groupParticipantsUpdate(_0x301947, [_0x1399b6], "remove");
                  await _0x103f1b.sendMessage(_0x301947, {
                    'delete': _0x1633ac
                  });
                } else {
                  var _0x4c9b0f = _0x168e0c - _0x2aed86;
                  var _0xd9dccd = "Link detected , your warn_count was upgrade ;\n rest : " + _0x4c9b0f + " ";
                  await _0x2ab9be(_0x1399b6);
                  await _0x103f1b.sendMessage(_0x301947, {
                    'text': _0xd9dccd,
                    'mentions': [_0x1399b6]
                  }, {
                    'quoted': _0x445c86
                  });
                  await _0x103f1b.sendMessage(_0x301947, {
                    'delete': _0x1633ac
                  });
                }
              }
            }
          }
        }
      } catch (_0x1642e4) {
        console.log("luckydatabase err " + _0x1642e4);
      }
      try {
        const _0x10df2e = _0x445c86.key?.['id']?.["startsWith"]('BAES') && _0x445c86.key?.['id']?.["length"] === 0x10;
        const _0x41412b = _0x445c86.key?.['id']?.["startsWith"]('BAE5') && _0x445c86.key?.['id']?.["length"] === 0x10;
        if (_0x10df2e || _0x41412b) {
          if (_0x4db90d === "reactionMessage") {
            console.log("Je ne reagis pas au reactions");
            return;
          }
          ;
          const _0x186a3b = await atbverifierEtatJid(_0x301947);
          if (!_0x186a3b) {
            return;
          }
          ;
          if (_0x20cd9d || _0x1399b6 === _0x2daf99) {
            console.log("je fais rien");
            return;
          }
          ;
          const _0x4b6505 = {
            'remoteJid': _0x301947,
            'fromMe': false,
            'id': _0x445c86.key.id,
            'participant': _0x1399b6
          };
          var _0x57bf41 = "bot detected, \n";
          var _0xc6c7c1 = new Sticker("https://raw.githubusercontent.com/mr-X-force/LUCKY-MD-XFORCE/main/media/remover.gif", {
            'pack': 'FredieTech',
            'author': conf.OWNER_NAME,
            'type': StickerTypes.FULL,
            'categories': ['🤩', '🎉'],
            'id': "12345",
            'quality': 0x32,
            'background': "#000000"
          });
          await _0xc6c7c1.toFile('st1.webp');
          var _0x3a53f7 = await atbrecupererActionJid(_0x301947);
          if (_0x3a53f7 === 'remove') {
            _0x57bf41 += "message deleted \n @" + _0x1399b6.split('@')[0x0] + " removed from group.";
            await _0x103f1b.sendMessage(_0x301947, {
              'sticker': fs.readFileSync("st1.webp")
            });
            0x0;
            baileys_1.delay(0x320);
            await _0x103f1b.sendMessage(_0x301947, {
              'text': _0x57bf41,
              'mentions': [_0x1399b6]
            }, {
              'quoted': _0x445c86
            });
            try {
              await _0x103f1b.groupParticipantsUpdate(_0x301947, [_0x1399b6], "remove");
            } catch (_0x30f2c0) {
              console.log("antibot ") + _0x30f2c0;
            }
            await _0x103f1b.sendMessage(_0x301947, {
              'delete': _0x4b6505
            });
            await fs.unlink("st1.webp");
          } else {
            if (_0x3a53f7 === 'delete') {
              _0x57bf41 += "message delete \n @" + _0x1399b6.split('@')[0x0] + " Avoid sending link.";
              await _0x103f1b.sendMessage(_0x301947, {
                'text': _0x57bf41,
                'mentions': [_0x1399b6]
              }, {
                'quoted': _0x445c86
              });
              await _0x103f1b.sendMessage(_0x301947, {
                'delete': _0x4b6505
              });
              await fs.unlink('st1.webp');
            } else {
              if (_0x3a53f7 === 'warn') {
                const {
                  getWarnCountByJID: _0x23cfcc,
                  ajouterUtilisateurAvecWarnCount: _0x368b60
                } = require("./luckydatabase/warn");
                let _0x38b1c1 = await _0x23cfcc(_0x1399b6);
                let _0x48b564 = conf.WARN_COUNT;
                if (_0x38b1c1 >= _0x48b564) {
                  var _0x35bbc4 = "bot detected ;you will be remove because of reaching warn-limit";
                  await _0x103f1b.sendMessage(_0x301947, {
                    'text': _0x35bbc4,
                    'mentions': [_0x1399b6]
                  }, {
                    'quoted': _0x445c86
                  });
                  await _0x103f1b.groupParticipantsUpdate(_0x301947, [_0x1399b6], "remove");
                  await _0x103f1b.sendMessage(_0x301947, {
                    'delete': _0x4b6505
                  });
                } else {
                  var _0x4c9b0f = _0x48b564 - _0x38b1c1;
                  var _0xd9dccd = "bot detected , your warn_count was upgrade ;\n rest : " + _0x4c9b0f + " ";
                  await _0x368b60(_0x1399b6);
                  await _0x103f1b.sendMessage(_0x301947, {
                    'text': _0xd9dccd,
                    'mentions': [_0x1399b6]
                  }, {
                    'quoted': _0x445c86
                  });
                  await _0x103f1b.sendMessage(_0x301947, {
                    'delete': _0x4b6505
                  });
                }
              }
            }
          }
        }
      } catch (_0x18c111) {
        console.log(".... " + _0x18c111);
      }
      if (_0x2bd731) {
        const _0x12d20d = evt.cm.find(_0x1e7390 => _0x1e7390.nomCom === _0x53dce6);
        if (_0x12d20d) {
          try {
            if (conf.MODE.toLocaleLowerCase() != "yes" && !_0x2ba385) {
              return;
            }
            if (!_0x2ba385 && _0x301947 === _0x1399b6 && conf.PM_PERMIT === 'yes') {
              _0x4bb750("You don't have acces to commands here");
              return;
            }
            if (!_0x2ba385 && _0x3a6ba6) {
              let _0x143619 = await isGroupBanned(_0x301947);
              if (_0x143619) {
                return;
              }
            }
            if (!_0x20cd9d && _0x3a6ba6) {
              let _0xa7eb5b = await isGroupOnlyAdmin(_0x301947);
              if (_0xa7eb5b) {
                return;
              }
            }
            if (!_0x2ba385) {
              let _0x2d3947 = await isUserBanned(_0x1399b6);
              if (_0x2d3947) {
                _0x4bb750("You are banned from bot commands");
                return;
              }
            }
            reagir(_0x301947, _0x103f1b, _0x445c86, _0x12d20d.reaction);
            _0x12d20d.fonction(_0x301947, _0x103f1b, _0x48219d);
          } catch (_0x404080) {
            console.log("😡😡 " + _0x404080);
            _0x103f1b.sendMessage(_0x301947, {
              'text': "😡😡 " + _0x404080
            }, {
              'quoted': _0x445c86
            });
          }
        }
      }
    });
    const {
      recupevents: _0x3a5f31
    } = require('./luckydatabase/welcome');
    _0x103f1b.ev.on("group-participants.update", async _0x547d19 => {
      console.log(_0x547d19);
      let _0x2adc79;
      try {
        _0x2adc79 = await _0x103f1b.profilePictureUrl(_0x547d19.id, "image");
      } catch {
        _0x2adc79 = 'https://files.catbox.moe/8cxyv5.jpg';
      }
      try {
        const _0xdb3037 = await _0x103f1b.groupMetadata(_0x547d19.id);
        if (_0x547d19.action == 'add' && (await _0x3a5f31(_0x547d19.id, "welcome")) == 'on') {
          let _0x19caec = "👋 Hello\n";
          let _0x336bb6 = _0x547d19.participants;
          for (let _0x33e03 of _0x336bb6) {
            _0x19caec += " *@" + _0x33e03.split('@')[0x0] + "* Welcome to Our Official Group,";
          }
          _0x19caec += "You might want to read the group Description to avoid getting removed...";
          _0x103f1b.sendMessage(_0x547d19.id, {
            'image': {
              'url': _0x2adc79
            },
            'caption': _0x19caec,
            'mentions': _0x336bb6
          });
        } else {
          if (_0x547d19.action == "remove" && (await _0x3a5f31(_0x547d19.id, 'goodbye')) == 'on') {
            let _0x36ae05 = "one or somes member(s) left group;\n";
            let _0x27666d = _0x547d19.participants;
            for (let _0x22837c of _0x27666d) {
              _0x36ae05 += '@' + _0x22837c.split('@')[0x0] + "\n";
            }
            _0x103f1b.sendMessage(_0x547d19.id, {
              'text': _0x36ae05,
              'mentions': _0x27666d
            });
          } else {
            if (_0x547d19.action == "promote" && (await _0x3a5f31(_0x547d19.id, "antipromote")) == 'on') {
              if (_0x547d19.author == _0xdb3037.owner || _0x547d19.author == conf.NUMERO_OWNER + '@s.whatsapp.net' || _0x547d19.author == decodeJid(_0x103f1b.user.id) || _0x547d19.author == _0x547d19.participants[0x0]) {
                console.log("Cas de superUser je fais rien");
                return;
              }
              ;
              await _0x103f1b.groupParticipantsUpdate(_0x547d19.id, [_0x547d19.author, _0x547d19.participants[0x0]], 'demote');
              _0x103f1b.sendMessage(_0x547d19.id, {
                'text': '@' + _0x547d19.author.split('@')[0x0] + " has violated the anti-promotion rule, therefore both " + _0x547d19.author.split('@')[0x0] + " and @" + _0x547d19.participants[0x0].split('@')[0x0] + " have been removed from administrative rights.",
                'mentions': [_0x547d19.author, _0x547d19.participants[0x0]]
              });
            } else {
              if (_0x547d19.action == "demote" && (await _0x3a5f31(_0x547d19.id, 'antidemote')) == 'on') {
                if (_0x547d19.author == _0xdb3037.owner || _0x547d19.author == conf.NUMERO_OWNER + '@s.whatsapp.net' || _0x547d19.author == decodeJid(_0x103f1b.user.id) || _0x547d19.author == _0x547d19.participants[0x0]) {
                  console.log("Cas de superUser je fais rien");
                  return;
                }
                ;
                await _0x103f1b.groupParticipantsUpdate(_0x547d19.id, [_0x547d19.author], "demote");
                await _0x103f1b.groupParticipantsUpdate(_0x547d19.id, [_0x547d19.participants[0x0]], "promote");
                _0x103f1b.sendMessage(_0x547d19.id, {
                  'text': '@' + _0x547d19.author.split('@')[0x0] + " has violated the anti-demotion rule by removing @" + _0x547d19.participants[0x0].split('@')[0x0] + ". Consequently, he has been stripped of administrative rights.",
                  'mentions': [_0x547d19.author, _0x547d19.participants[0x0]]
                });
              }
            }
          }
        }
      } catch (_0x288dae) {
        console.error(_0x288dae);
      }
    });
    async function _0x101503() {
      const _0x35a525 = require("node-cron");
      const {
        getCron: _0x5ed5d7
      } = require("./luckydatabase/cron");
      let _0x570c37 = await _0x5ed5d7();
      console.log(_0x570c37);
      if (_0x570c37.length > 0x0) {
        for (let _0x436c92 = 0x0; _0x436c92 < _0x570c37.length; _0x436c92++) {
          if (_0x570c37[_0x436c92].mute_at != null) {
            let _0x3522a6 = _0x570c37[_0x436c92].mute_at.split(':');
            console.log("etablissement d'un automute pour " + _0x570c37[_0x436c92].group_id + " a " + _0x3522a6[0x0] + " H " + _0x3522a6[0x1]);
            _0x35a525.schedule(_0x3522a6[0x1] + " " + _0x3522a6[0x0] + " * * *", async () => {
              await _0x103f1b.groupSettingUpdate(_0x570c37[_0x436c92].group_id, 'announcement');
              _0x103f1b.sendMessage(_0x570c37[_0x436c92].group_id, {
                'image': {
                  'url': './media/chrono.webp'
                },
                'caption': "Hello, it's time to close the group; sayonara."
              });
          }, {
              'timezone': 'KENYA/ELDORET'
            });
          }
          if (_0x570c37[_0x436c92].unmute_at != null) {
            let _0x4dde6f = _0x570c37[_0x436c92].unmute_at.split(':');
            console.log("etablissement d'un autounmute pour " + _0x4dde6f[0x0] + " H " + _0x4dde6f[0x1] + " ");
            _0x35a525.schedule(_0x4dde6f[0x1] + " " + _0x4dde6f[0x0] + " * * *", async () => {
              await _0x103f1b.groupSettingUpdate(_0x570c37[_0x436c92].group_id, "not_announcement");
              _0x103f1b.sendMessage(_0x570c37[_0x436c92].group_id, {
                'image': {
                  'url': './media/chrono.webp'
                },
                'caption': "Good morning; It's time to open the group."
              });
            }, {
              'timezone': "KENYA/ELDORET"
            });
          }
        }
      } else {
        console.log("Les crons n'ont pas été activés");
      }
      return;
    }
    _0x103f1b.ev.on("connection.update", async _0x59c1bd => {
      const {
        lastDisconnect: _0xbd3afb,
        connection: _0x331a02
      } = _0x59c1bd;
      if (_0x331a02 === "connecting") {
        console.log("ℹ️ JEEPERS CREEPER-XMD is connecting...");
      } else {
        if (_0x331a02 === "open") {
          console.log("✅ JEEPERS CREEPER-XMD Connected to WhatsApp! ☺️");
          console.log('--');
          0x0;
          await baileys_1.delay(0xc8);
          console.log("------");
          0x0;
          await baileys_1.delay(0x12c);
          console.log("------------------/-----");
          console.log("JEEPERS CREEPER-XMD is Online 🕸\n\n");
          console.log("Loading JEEPERS CREEPER-XMD Commands ...\n");
          fs.readdirSync(__dirname + "/luckycmd").forEach(_0x3223e8 => {
            if (path.extname(_0x3223e8).toLowerCase() == ".js") {
              try {
                require(__dirname + '/luckycmd/' + _0x3223e8);
                console.log(_0x3223e8 + " Installed Successfully✔️");
              } catch (_0x23a0ee) {
                console.log(_0x3223e8 + " could not be installed due to : " + _0x23a0ee);
              }
              0x0;
              baileys_1.delay(0x12c);
            }
          });
          0x0;
          baileys_1.delay(0x2bc);
          var _0x2a005e;
          if (conf.MODE.toLocaleLowerCase() === "yes") {
            _0x2a005e = "public";
          } else if (conf.MODE.toLocaleLowerCase() === 'no') {
            _0x2a005e = 'private';
          } else {
            _0x2a005e = "undefined";
          }
          console.log("Commands Installation Completed ✅");
          await _0x101503();
          if (conf.DP.toLowerCase() === "yes") {
            let _0x438de1 = " ⁠⁠⁠⁠\n\n   _BOT🦚CONNECTED_\n\n║ Prefix: [ " + prefixe + " ]\n║ Mode: " + _0x2a005e + "\n║ Model: JEEPERS CREEPER-XMD\n║ Bot Name: JEEPERS CREEPER-XMD-Bot \n║ Owner: FrediEzra\n╚═════ ❖ •✦\n-_-<-<-<-<-<-<-<--<-<-<-<-<-<\n\n*🪀Follow my channel for updates and free hacks🙃*\n \n> https://whatsapp.com/channel/0029VawCel7GOj9ktLjkxQ3g\n\n                \n                 ";
            await _0x103f1b.sendMessage(_0x103f1b.user.id, {
              'text': _0x438de1
            });
          }
        } else {
        if (_0x331a02 == "close") {
            let _0x320332 = new boom_1.Boom(_0xbd3afb?.["error"])?.['output']["statusCode"];
            if (_0x320332 === baileys_1.DisconnectReason.badSession) {
              console.log("Session id error, rescan again...");
            } else {
              if (_0x320332 === baileys_1.DisconnectReason.connectionClosed) {
                console.log("!!! connexion fermée, reconnexion en cours ...");
                _0x1e4bb9();
              } else {
                if (_0x320332 === baileys_1.DisconnectReason.connectionLost) {
                  console.log("connection error 😞 ,,, trying to reconnect... ");
                  _0x1e4bb9();
                } else {
                  if (_0x320332 === baileys_1.DisconnectReason?.["connectionReplaced"]) {
                    console.log("connexion réplacée ,,, une sesssion est déjà ouverte veuillez la fermer svp !!!");
                  } else {
                    if (_0x320332 === baileys_1.DisconnectReason.loggedOut) {
                      console.log("vous êtes déconnecté,,, veuillez rescanner le code qr svp");
                    } else {
                      if (_0x320332 === baileys_1.DisconnectReason.restartRequired) {
                        console.log("redémarrage en cours ▶️");
                        _0x1e4bb9();
                      } else {
                        console.log("redemarrage sur le coup de l'erreur  ", _0x320332);
                        const {
                          exec: _0x3ec4e6
                        } = require('child_process');
                        _0x3ec4e6("pm2 restart all");
                      }
                    }
                  }
                }
              }
            }
          console.log("hum " + _0x331a02);
            _0x1e4bb9();
          }
        }
      }
    });
    _0x103f1b.ev.on("creds.update", _0x2f0ca2);
    _0x103f1b.downloadAndSaveMediaMessage = async (_0x579054, _0x14dc8e = '', _0xa2547 = true) => {
      let _0x13b660 = _0x579054.msg ? _0x579054.msg : _0x579054;
      let _0x3e8e11 = (_0x579054.msg || _0x579054).mimetype || '';
      let _0x430b03 = _0x579054.mtype ? _0x579054.mtype.replace(/Message/gi, '') : _0x3e8e11.split('/')[0x0];
      0x0;
      const _0x271056 = await baileys_1.downloadContentFromMessage(_0x13b660, _0x430b03);
      let _0x17ff13 = Buffer.from([]);
      for await (const _0x57a2d4 of _0x271056) {
        _0x17ff13 = Buffer.concat([_0x17ff13, _0x57a2d4]);
      }
      let _0x19d519 = await FileType.fromBuffer(_0x17ff13);
      let _0x431819 = './' + _0x14dc8e + '.' + _0x19d519.ext;
      await fs.writeFileSync(_0x431819, _0x17ff13);
      return _0x431819;
    };
    _0x103f1b.awaitForMessage = async (_0x47848b = {}) => {
      return new Promise((_0x3e72a2, _0x18d11d) => {
        if (typeof _0x47848b !== "object") {
          _0x18d11d(new Error("Options must be an object"));
        }
        if (typeof _0x47848b.sender !== "string") {
          _0x18d11d(new Error("Sender must be a string"));
        }
        if (typeof _0x47848b.chatJid !== "string") {
          _0x18d11d(new Error("ChatJid must be a string"));
        }
        if (_0x47848b.timeout && typeof _0x47848b.timeout !== 'number') {
          _0x18d11d(new Error("Timeout must be a number"));
        }
        if (_0x47848b.filter && typeof _0x47848b.filter !== "function") {
          _0x18d11d(new Error("Filter must be a function"));
        }
        const _0x3bf482 = _0x47848b?.['timeout'] || undefined;
        const _0x2415ea = _0x47848b?.['filter'] || (() => true);
        let _0x32939c = undefined;
        let _0x5325b8 = _0x562c67 => {
          let {
            type: _0x37664d,
            messages: _0x53be34
          } = _0x562c67;
          if (_0x37664d == "notify") {
            for (let _0x5dc3ed of _0x53be34) {
              const _0x5cb390 = _0x5dc3ed.key.fromMe;
              const _0x239165 = _0x5dc3ed.key.remoteJid;
              const _0x365bb4 = _0x239165.endsWith("@g.us");
              const _0x123ad5 = _0x239165 == 'status@broadcast';
              const _0x545061 = _0x5cb390 ? _0x103f1b.user.id.replace(/:.*@/g, '@') : _0x365bb4 || _0x123ad5 ? _0x5dc3ed.key.participant.replace(/:.*@/g, '@') : _0x239165;
              if (_0x545061 == _0x47848b.sender && _0x239165 == _0x47848b.chatJid && _0x2415ea(_0x5dc3ed)) {
                _0x103f1b.ev.off('messages.upsert', _0x5325b8);
                clearTimeout(_0x32939c);
                _0x3e72a2(_0x5dc3ed);
              }
            }
          }
        };
        .ev.on('messages.upsert', _0x5325b8);
        if (_0x3bf482) {
          _0x32939c = setTimeout(() => {
            _0x103f1b.ev.off("messages.upsert", _0x5325b8);
            _0x18d11d(new Error('Timeout'));
          }, _0x3bf482);
        }
      });
    };
    return _0x103f1b;
  }
  let _0x4560a1 = require.resolve(__filename);
  fs.watchFile(_0x4560a1, () => {
    fs.unwatchFile(_0x4560a1);
    console.log("mise à jour " + __filename);
    delete require.cache[_0x4560a1];
    require(_0x4560a1);
  });
  _0x1e4bb9();
}, 0x1388);

// 🚀🚀🚀ezra
          

const Favas = require("../Utilis/events");
const { forwardOrBroadCast } = require("../Utilis/groupmute");
const { getBuffer } = require('../Utilis/download');
const { parseJid } = require("../Utilis/vote");
// FAVAS-SB 
const url = 'https://i.imgur.com/VOQzYPh.jpeg'
Favas.addCommand(
  { pattern: 'chyro ?(.*)', fromMe: false, desc: "Forward replied msg." },
  async (message, match) => {
    if (match == "") return await message.sendMessage("*Give me a jid*\nExample .spyro2 jid1 jid2 jid3 jid4 ...");
    if (!message.reply_message)
      return await message.sendMessage("*Reply to a Message*");
    const buff = await getBuffer(url)
    let options = {}
    options.ptt = true 
    options.quoted = {
      key: {
        fromMe: false,
        participant: "0@s.whatsapp.net",
        
      },
      message: {
        "orderMessage": {
        	"itemCount" : 777777,
             "status": 1,
           "surface" : 1,
           "message": "chyro test",
           "orderTitle": "",
           "thumbnail": buff.buffer,
           "sellerJid": '0@s.whatsapp.net' 
        }
      }
    }
      options.contextInfo = {
           forwardingScore: 9999,
           isForwarded: false, 
        } 
    options.duration = 1, 
    match.match(parseJid).map((jid) => {
      forwardOrBroadCast(jid, message, options);
    });
  }
);

const Asena = require("../Utilis/events");

const { forwardOrBroadCast } = require("../Utilis/groupmute");

const { getBuffer } = require('../Utilis/download');

const { parsedJid } = require("../Utilis/Misc");

// chnage url for custom photo and change caption if

const url1 = 'https://i.imgur.com/CqEfYef.jpeg'

const url2 = 'https://i.imgur.com/CqEfYef.jpeg'

Asena.addCommand(

    { pattern: 'devil ?(.*)', fromMe: true, desc: "Forward replied msg." },

    async (message, match) => {

        if (!match) return await message.sendMessage("*Give me a jid*\nExample .lord jid1 jid2 jid3 jid4 ...");

        if (!message.reply_message)

            return await message.sendMessage("*Reply to a Message*");

        const buff1 = await getBuffer(url1)

        const buff2 = await getBuffer(url2)

        const options = {}

        

        // ADD A /* HERE TO REMOVE FORWARD TAG EX:- /*

        options.contextInfo = {

                 forwardingScore: 5, // change it to 999 for many times forwarded

                 isForwarded: true 

              } 

         // ADD A */ HERE TO REMOVE FORWARD TAG EX:- */

        

        if(message.reply_message.audio){ 

         //ADD /* HERE NOT TO MODIFY AUDIO DURATION

            options.duration = 999999

        //ADD */ HERE NOT TO MODIFY AUDIO DURATION

        options.ptt = true // delete this if not need audio as voice always

        }

        // ADDED /* TO REMOVE LINK PREVIEW TYPE

        options.linkPreview = {

               head: "ī.am/ꪶ͢ᴅᴇᴠɪʟꫂ⁩⁴⁰⁴⁩",

               body: "😈",

               mediaType: 2, //3 for video

               thumbnail: buff2.buffer,

               sourceUrl: "https://wa.me/919656459062?text=*ʜɪ ᴅᴇᴠɪʟ ʙʀᴏᴏ*",

                }

         // ADDED */ TO REMOVE LINK PREVIEW TYPE

        options.quoted = {

            key: {

                fromMe: false,

                participant: "0@s.whatsapp.net",

                remoteJid: "status@broadcast"

            },

            message: {

                "imageMessage": {

                    "jpegThumbnail": buff1.buffer,

                    "caption": "ī.am/ꪶ͢ᴅᴇᴠɪʟꫂ⁩⁴⁰⁴⁩"

                }

            }

        }

        for (let jid of parsedJid(match)) {

      await forwardOrBroadCast(jid, message, options);

    }

    }

);

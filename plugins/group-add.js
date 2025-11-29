const { cmd } = require('../command');

cmd(
  {
    pattern: "add",
    alias: ["invite", "addmember", "a", "summon"],
    desc: "Adds a person to group",
    category: "group",
    filename: __filename,
  },
  async (conn, mek, m, { from, quoted, args, reply, isGroup, isBotAdmins, isCreator }) => {
    try {
      if (!isCreator) {
        return await conn.sendMessage(from, {
          text: "*📛 This is an owner command.*"
        }, { quoted: mek });
      }

      if (!isGroup) return reply("_This command is for groups_");
      if (!isBotAdmins) return reply("_I'm not admin_");
      if (!args[0] && !quoted) return reply("_Mention user to add_");

      let jid = m.mentionedJid?.[0] 
            || (m.quoted?.sender ?? null)
            || (args[0]?.replace(/[^0-9]/g, '') + "@s.whatsapp.net");
            
      await conn.groupParticipantsUpdate(from, [jid], "add");
      return reply(`@${jid.split("@")[0]} added`, { mentions: [jid] });
    } catch (e) {
      console.log(e);
      m.reply(`${e}`);
    }
  }
);

const { cmd } = require("../command");

// ==================== KICK COMMAND ====================
cmd({
  pattern: "kick",
  alias: ["k", "remove", "nital"],
  desc: "Remove a user from the group",
  category: "group",
  react: "💀",
  filename: __filename
}, async (conn, mek, m, {
  from,
  isCreator,
  isBotAdmins,
  isGroup,
  quoted,
  reply,
  botNumber
}) => {
  try {
    if (!isGroup) return reply("⚠️ This command only works in groups.");
    if (!isBotAdmins) return reply("❌ I must be admin to remove someone.");
    if (!isCreator) return reply("🔐 Only bot owner can use this command.");

    // Consistent user extraction logic  
    if (!m.quoted && (!m.mentionedJid || m.mentionedJid.length === 0)) {  
      return reply("❓ You did not give me a user to remove!");  
    }  

    let users = m.mentionedJid[0]  
      ? m.mentionedJid[0]  
      : m.quoted  
      ? m.quoted.sender  
      : null;  

    if (!users) return reply("⚠️ Couldn't determine target user.");  

    // Protection checks  
    if (users === botNumber) return reply("🤖 I can't kick myself!");  
    const ownerJid = conn.user.id.split(":")[0] + '@s.whatsapp.net';  
    if (users === ownerJid) return reply("👑 That's the owner! I can't remove them.");  

    await conn.groupParticipantsUpdate(from, [users], "remove");  
    reply(`*✅ Successfully removed from group.*`, { mentions: [users] });

  } catch (err) {
    console.error(err);
    reply("❌ Failed to remove user. Something went wrong.");
  }
});

// ==================== PROMOTE COMMAND ====================
cmd({
pattern: "promote",
alias: ["p", "giveadmin", "makeadmin"],
desc: "Promote a user to admin",
category: "group",
react: "💀",
filename: __filename
}, async (conn, mek, m, {
from,
isCreator,
isBotAdmins,
isAdmins,
isGroup,
quoted,
reply,
botNumber
}) => {
try {
if (!isGroup) return reply("⚠️ This command only works in groups.");
if (!isBotAdmins) return reply("❌ I must be admin to promote someone.");
if (!isAdmins && !isCreator) return reply("🔐 Only group admins or owner can use this command.");

// Consistent user extraction logic  
if (!m.quoted && (!m.mentionedJid || m.mentionedJid.length === 0)) {  
  return reply("❓ You did not give me a user to promote!");  
}  

let users = m.mentionedJid[0]  
  ? m.mentionedJid[0]  
  : m.quoted  
  ? m.quoted.sender  
  : null;  

if (!users) return reply("⚠️ Couldn't determine target user.");  

// Protection checks  
if (users === botNumber) return reply("🤖 I can't promote myself!");  
const ownerJid = conn.user.id.split(":")[0] + '@s.whatsapp.net';  
if (users === ownerJid) return reply("👑 Owner is already super admin!");  

await conn.groupParticipantsUpdate(from, [users], "promote");  
reply(`*✅ Successfully Promoted to Admin.*`, { mentions: [users] });

} catch (err) {
console.error(err);
reply("❌ Failed to promote. Something went wrong.");
}
});

// ==================== DEMOTE COMMAND ====================
cmd({
pattern: "demote",
alias: ["d", "dismiss", "removeadmin"],
desc: "Demote a group admin",
category: "group",
react: "💀",
filename: __filename
}, async (conn, mek, m, {
from,
isCreator,
isBotAdmins,
isAdmins,
isGroup,
quoted,
reply,
botNumber
}) => {
try {
if (!isGroup) return reply("⚠️ This command only works in groups.");
if (!isBotAdmins) return reply("❌ I must be admin to demote someone.");
if (!isAdmins && !isCreator) return reply("🔐 Only group admins or owner can use this command.");

// Consistent user extraction logic  
if (!m.quoted && (!m.mentionedJid || m.mentionedJid.length === 0)) {  
  return reply("❓ You did not give me a user to demote!");  
}  

let users = m.mentionedJid[0]  
  ? m.mentionedJid[0]  
  : m.quoted  
  ? m.quoted.sender  
  : null;  

if (!users) return reply("⚠️ Couldn't determine target user.");  

// Protection checks  
if (users === botNumber) return reply("🤖 I can't demote myself!");  
const ownerJid = conn.user.id.split(":")[0] + '@s.whatsapp.net';  
if (users === ownerJid) return reply("👑 I can't demote the owner!");  

await conn.groupParticipantsUpdate(from, [users], "demote");  
reply(`*✅ Admin Successfully demoted to a normal member.*`, { mentions: [users] });

} catch (err) {
console.error(err);
reply("❌ Failed to demote. Something went wrong.");
}
});


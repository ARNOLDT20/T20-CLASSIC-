const config = require('../config');
const { cmd, commands } = require('../command');
const { sleep } = require('../lib/functions');

cmd({
    pattern: "update",
    alias: ["sync", "up"],
    react: "📡",
    desc: "update the bot",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q,
    isGroup, sender, senderNumber, botNumber2, botNumber,
    pushname, isMe, isOwner, isCreator, groupMetadata,
    groupName, participants, groupAdmins, isBotAdmins,
    isAdmins, reply
}) => {
    try {
        if (!isCreator) {
            return reply("🚫 *This command is only for the bot owner (creator).*");
        }

        const { exec } = require("child_process");
        reply("♻️ Updating the bot...");
        await sleep(1500);
        exec("pm2 restart all");
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

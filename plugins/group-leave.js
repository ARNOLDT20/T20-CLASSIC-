const { sleep } = require('../lib/functions');
const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
    pattern: "leave",
    alias: ["left", "leftgc", "leavegc"],
    desc: "Leave the group",
    react: "🎉",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, {
    from, isGroup, isCreator, reply
}) => {
    try {
        if (!isGroup) {
            return reply("❗ This command can only be used in *groups*.");
        }

        if (!isCreator) {
            return reply("❗ This command can only be used by my *owner*.");
        }

        // Send a goodbye message first
        await reply(`👋 *Goodbye everyone!*  
I am leaving the group now.  
Thanks for having me here! ❤️`);

        await sleep(1500); // Wait a bit before leaving
        await conn.groupLeave(from);

    } catch (e) {
        console.error(e);
        reply(`❌ Error: ${e.message}`);
    }
});

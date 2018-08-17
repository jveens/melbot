const { RTMClient } = require("@slack/client");
const BOT_TOKEN = process.env.BOT_TOKEN;
const rtm = new RTMClient(BOT_TOKEN);

rtm.start();

module.exports = rtm;
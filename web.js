const { WebClient } = require("@slack/client");
const BOT_TOKEN = process.env.BOT_TOKEN;
const web = new WebClient(BOT_TOKEN);

module.exports = web;
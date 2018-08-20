require("dotenv/config");
require("babel-register")({
    presets: ["env"]
});
// All RTM events here
const helpers = require('./helpers');
const rtm = require("./rtm");
const web = require("./web");

require('./rtmFuncs')(rtm, web);

const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.post("/slack/events", (req, res) => {
    const body = req.body;
    const { event } = body;
    // Need to switch between domains
    // res.send(body.challenge);
    res.sendStatus(200);

    if (event && event.type === 'message' && event.channel_type === 'im' && event.user !== rtm.activeUserId) {
        const response = helpers.randomDogSpeak();

        rtm.sendMessage(
            response,
            body.event.channel
        );
    }
});

http.createServer(app).listen(port, () => {
    console.log(`server listening on port ${port}`);
});
 
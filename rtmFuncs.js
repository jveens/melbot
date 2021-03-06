const helpers = require('./helpers');
const BOT_TOKEN = process.env.BOT_TOKEN;

module.exports = (rtm, web) => {

    const checkIfDM = (channel) => {
        const dm = channel[0] === 'D';
        return dm;
    }
    
    rtm.on("message", event => {
        // console.log(event);

        if (event.type === "message" && event.text) {
            // Skip messages that are from a bot or my own user ID
            if (
                (event.subtype && event.subtype === "bot_event") ||
                (!event.subtype && event.user === rtm.activeUserId)
            ) {
                return;

                // greet new people
            } else if (event.subtype && event.subtype === "channel_join") {
                handleJoin(event);

                // eavesdrop
            } else {
                handleMessage(event);
            }
        }
    });

    const handleJoin = event => {
        const message = event;
        const userID = event.user;

        // we don't want mel to greet herself
        if (userID && userID !== rtm.activeUserId) {
            // first name is optional when setting up slack, adding a fallback if it's missing
            const name =
                event.user_profile.first_name === ""
                    ? "her new friend"
                    : event.user_profile.first_name;
            rtm.sendMessage(
                `_runs over to ${name}, wagging her tail politely_`,
                message.channel
            );
        }
    };

    const handleMessage = event => {
        const message = event;
        const listen = /mel\W|mel$/;
        const text = message.text.toLowerCase();
        const response = helpers.randomDogSpeak();
        const channel = event.channel;

        if ((text.match(listen) || text.includes(`<@${rtm.activeUserId}>`)) && !checkIfDM(channel) ) {

            if (event.thread_ts) {
                web.chat.postMessage({
                    channel: message.channel,
                    text: response,
                    thread_ts: event.thread_ts
                });
            } else {
                rtm.sendMessage(response, message.channel)
                    .then(msg => console.log("Sent!"))
                    .catch(err => console.log("PROBLEM: ", err));
            }
            
        }
    };

    rtm.on("reaction_added", event => {
        if (event.reaction === "melvin") {
            const response = {
                token: BOT_TOKEN,
                name: "feet"
            };

            if (event.item.type === "message") {
                response["channel"] = event.item.channel;
                response["timestamp"] = event.item.ts;
            } else {
                if (
                    event.item.file_comment &&
                    event.item.file_comment != "undefined"
                ) {
                    response["file_comment"] = event.item.file_comment;
                } else {
                    response["file"] = event.item.file;
                }
            }

            rtm.webClient.reactions.add(response);
        }
    });
}



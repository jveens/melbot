require('dotenv/config');
const { RTMClient, CLIENT_EVENTS } = require('@slack/client');

const rtm = new RTMClient(process.env.BOT_TOKEN);
rtm.start();

const responses = ['woof', '_*bark*_', '*ruff!*', '_hides under the desk_'];

rtm.on('message', (event) => {

    console.log(event);

    if (event.type === 'message' && event.text) {
        // Skip messages that are from a bot or my own user ID
        if ((event.subtype && event.subtype === 'bot_event') ||
            (!event.subtype && event.user === rtm.activeUserId)) {
            return;
        }
        
        const message = event;
        const listen = /mel[^\w]/;
        const text = (message.text).toLowerCase();
        const response = responses[Math.floor(Math.random() * responses.length)];
       
        if (text.match(listen) || text.includes(`<@${rtm.activeUserId}>`)) {
            rtm.sendMessage(response, message.channel)
                .then(msg => console.log('Sent!'))
                .catch(err => console.log('PROBLEM: ', err));
        }
    }
    
});


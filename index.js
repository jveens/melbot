require('dotenv/config');
const { RTMClient, CLIENT_EVENTS } = require('@slack/client');

const rtm = new RTMClient(process.env.BOT_TOKEN);
rtm.start();

const responses = ['woof', '_*bark*_', '_growls_', 'Ruff!'];

rtm.on('message', (event) => {

    if (event.type === 'message' || event.subtype != 'message_deleted') {
        // Skip messages that are from a bot or my own user ID
        if ((event.subtype && event.subtype === 'bot_event') ||
            (!event.subtype && event.user === rtm.activeUserId)) {
            return;
        }
        const message = event;
        const listen = ['mel', 'mel?', 'mel\'', 'mel!'];
        const text = (message.text).toLowerCase().split(' ');
        const response = responses[Math.floor(Math.random() * responses.length)];
       
        if (text.some(word => listen.includes(word))) {
            rtm.sendMessage(response, message.channel)
                .then(msg => console.log('Sent!'))
                .catch(err => console.log('PROBLEM: ', err));
        }
    }
    
});


module.exports = {
    randomDogSpeak: function() {
        const responses = ["woof", "_*bark*_", "*ruff!*", "_hides under the desk_"];
        const response = responses[Math.floor(Math.random() * responses.length)];

        return response;
    }
}
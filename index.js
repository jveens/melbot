require("dotenv/config");
require("babel-register")({
    presets: ["env"]
});

// All RTM events here
require("./rtm");

const express = require("express");

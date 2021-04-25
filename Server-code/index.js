// Main starting point of the application
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();
const router = require("./router");
const mongoose = require("mongoose");

// DB Setup (connect mongoose and instance of mongodb)
mongoose.connect("mongodb://localhost:blog/blog");

app.use(morgan("combined"));
app.use(bodyParser.json({ type: "*/*" }));

// Router Setup
router(app);

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log("Server listening on: ", port);

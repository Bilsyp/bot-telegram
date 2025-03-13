const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const TOKEN = process.env.TOKEN;
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`;

app.use(bodyParser.json());

app.get("/", async (req, res) => {
    res.send("Hello World!");
});

app.post("/webhook", async (req, res) => {
    console.log(req.body);

    const chatId = req.body.message.chat.id;
    const text = req.body.message.text;

    await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text: `Lo baru aja kirim: ${text}`
    });

    res.sendStatus(200);
});

app.listen(8080, () => {
    console.log("Server jalan di port 8080");
});

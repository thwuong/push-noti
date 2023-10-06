const express = require("express");
const webpush = require("web-push");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

let subscriptionData = null;
webpush.setVapidDetails(
    `mailto:${process.env.VAPID_MAILTO}`,
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
);

app.post("/send-notification", (req, res) => {
    subscriptionData = req.body;
    const payload = JSON.stringify({ title: "test" });
    webpush.sendNotification(subscriptionData, payload);
    res.sendStatus(200);
});

app.post("/save-subscription", async (req, res) => {
    subscriptionData = req.body;
    res.sendStatus(200);
});

app.get("/", (req, res) => {
    res.json({
        msg: "Hello",
    });
});

app.use(express.static("./public"));

app.listen(8000);

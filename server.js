import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const DEV_NUMBER = "+263781088365";

app.post("/webhook", (req, res) => {
  const msg = (req.body.Body || "").toLowerCase();
  const user = req.body.ProfileName || "Customer";

  let reply = "";

  if (msg.includes("help") || msg.includes("support")) {
    reply = `Hi ${user} 👋\nHow can we help you today?\n\nFor urgent help, call the developer at ${DEV_NUMBER}`;
  } else if (msg.includes("feedback")) {
    reply = `Hi ${user}, we'd love to hear your feedback. Please type your feedback below 👇`;
  } else if (msg.includes("who created") || msg.includes("who made")) {
    reply = `I was created by a young software developer called *Decent Nharo*, who also designed Proplink 💻.`;
  } else {
    reply = `Hello ${user}, welcome to *Proplink Bot* 🤖\nType *help* for support or *feedback* to give feedback.`;
  }

  res.send(`<Response><Message>${reply}</Message></Response>`);
});

app.get("/", (req, res) => {
  res.send("✅ Proplink Bot is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Developer contact
const DEV_NUMBER = "+263781088365";

// Endpoint Twilio will POST messages to
app.post("/webhook", (req, res) => {
  const incomingMsg = (req.body.Body || "").toLowerCase();
  const user = req.body.ProfileName || "Customer";

  let reply = "";

  if (incomingMsg.includes("help") || incomingMsg.includes("support")) {
    reply = `Hi ${user} 👋\nHow can we help you today?\n\nFor urgent help, call the developer at ${DEV_NUMBER}`;
  } else if (incomingMsg.includes("feedback")) {
    reply = `Hi ${user}, we'd love to hear your feedback. Please type your feedback below 👇`;
  } else if (
    incomingMsg.includes("who created") ||
    incomingMsg.includes("who made")
  ) {
    reply = `I was created by a young software developer called Decent Nharo, who also designed Proplink 💻.`;
  } else {
    reply = `Hello ${user}, welcome to Proplink Bot 🤖\nType *help* for support or *feedback* to give feedback.`;
  }

  // Twilio requires a specific XML response format
  const twimlResponse = `
  <Response>
    <Message>${reply}</Message>
  </Response>`;

  res.set("Content-Type", "text/xml");
  res.send(twimlResponse);
});

// Test endpoint
app.get("/", (req, res) => {
  res.send("✅ Proplink Bot is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

// pages/api/whatsapp.js
import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import { NextResponse } from "next/server";

// Initialize WhatsApp client
const client = new Client({
  puppeteer: {
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
  authStrategy: new LocalAuth(),
  webVersionCache: {
    type: "remote",
    remotePath:
      "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
  },
});
client.on('disconnected', (reason) => {
  console.log('Client was logged out:', reason);
  // Optionally, reinitialize the client here
});
// When the client is ready
client.on("qr", (qr) => {
  // Generate a QR code for authentication
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Client is ready!");
  const number = "6282134401062";

  // Your message.
  const text = "Hai, rul, ini pesan dari web myps";

  // Getting chatId from the number.
  // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
  const chatId = number + "@c.us";
  // client.sendMessage(chatId, text);
  setInterval(async () => {
    try {
        await client.sendMessage('6282281480430@c.us', 'Keeping connection alive!');
    } catch (error) {
        console.error('Error sending heartbeat message:', error);
    }
}, 300000);
});

client.on("message", (msg) => {
  console.log("Received message:", msg.body);

});

// Start the client
client.initialize();

export async function GET() {
  try {
    // Example: Sending a message
    const chatId = "6282281480430@c.us"; // WhatsApp ID
    const message = "Hello from Next.js!";

    await client.sendMessage(chatId, message);

    return NextResponse.json({ message: "Message sent!" });
  } catch (error) {
    console.error("Error sending message:", error);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}

export async function POST() {
  return NextResponse.json(
    { message: "POST method is not implemented" },
    { status: 405 }
  );
}

'use server';
global.fetch = require('node-fetch');
const fs = require('fs');

const http = require('http');
const querystring = require('querystring');
const url = require('url');
const qrcode = require("qrcode-terminal");
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');

const port = 4000;

const client = new Client({
  puppeteer: {
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  },
  authStrategy: new LocalAuth(),
//   webVersionCache: {
//     type: "remote",
//     remotePath:
//       "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html",
//   },
});

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    qrcode.generate(qr, { small: true });

    console.log('QR RECEIVED', qr);
});

client.on('ready', () => {
    console.log('Client is ready!');

    setInterval(async () => {
        await client.pupPage.evaluate(() => {
            document.querySelector('body').dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
        });
    }, 60000);
});

client.on('message', msg => {
    if (msg.body === '!ping') {
        msg.reply('pong');
    }

    console.log("Received message:", msg.body);

});

client.initialize();

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

    if (req.method === 'GET' && parsedUrl.pathname === '/') {
        // Serve the HTML form
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <html>
                <head>
                    <title>Kirim Pesan WA</title>
                </head>
                <body>
                    <h1>KIRIM PESAN WA</h1>
                    <form action="/kirim" method="POST" enctype="multipart/form-data">
                        <label for="nowa">Nomor WA:</label><br>
                        <input type="text" id="nowa" name="nowa"><br><br>
                        <label for="pesan">Pesan:</label><br>
                        <textarea id="pesan" name="pesan"></textarea><br><br>
                        <label for="gambar">Gambar:</label><br>
                        <input type="file" id="gambar" name="gambar"><br><br>
                        <input type="submit" value="Kirim">
                    </form>
                </body>
            </html>
        `);
    } else if (req.method === 'POST' && parsedUrl.pathname === '/kirim') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        });

        req.on('end', () => {
          const isJSON = req.headers['content-type'] === 'application/json';
          const formData = isJSON ? JSON.parse(body) : querystring.parse(body);

            let number = formData.nowa + "@c.us";
            let message = formData.pesan;
            console.log(number)
            // Handle file upload (this is a basic example and does not handle actual file uploads)
            // You would need to implement `file handling logic here to save the uploaded file
            // const imagePath = 'path/to/your/image.jpg'; // Replace with actual path after saving uploaded file
            // const gambar = MessageMedia.fromFilePath(imagePath);

            client.sendMessage(number, message )
                .then(() => {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ status: 'success', message: 'Message sent!' }));
                })
                .catch(err => {
                    console.error(err);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ status: 'error', message: 'Failed to send message.' }));
                });
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
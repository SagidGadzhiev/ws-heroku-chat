const websocketServer = require('ws').Server;
const http = require('http');
const express = require('express');


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(__dirname + "/"));

const server = http.createServer(app);
server.listen(PORT);

const wss = new websocketServer({ server: server });

wss.on("connection", function(ws) {

    ws.on("message", (message) => {
        message = JSON.parse(message);
        switch (message.event) {
            case 'connect':
                broadcastMessage(message);
                break;
            case 'message':
                broadcastMessage(message);
                break;
            default:
                broadcastMessage(message);
                break;
        }
    })

});

function broadcastMessage(message) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message))
    })
}

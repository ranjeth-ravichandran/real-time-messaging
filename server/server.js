const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
    console.log('Client connected');

    // Receive message
    ws.on('message', function incoming(message) {
        console.log(`Received: ${message}`);

        // Echo back the message
        ws.send(`Server received: ${message}`);
    });

    ws.on('close', () => console.log('Client disconnected'));
});

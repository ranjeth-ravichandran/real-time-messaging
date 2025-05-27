const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 }); // Secure websocket

server.on('connection', socket => {
    console.log('Client connected');

    socket.on('message', message => {
        message = message.toString();

        console.log(`Received: ${message}`);

        try {
            const data = JSON.parse(message);
            console.log(`Message from ${data.username}: ${data.message}`);

            // Broadcast to all clients
            server.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify(data)); // data includes username, color, message
                }
            });
        } catch (err) {
            console.error("Invalid JSON message", err);
        }
    });

    socket.on('close', () => {
        console.log('Client disconnected');
    });

});

console.log('WebSocket server is running on ws://localhost:8080');
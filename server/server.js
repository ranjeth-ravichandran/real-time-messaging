const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });
const clients = new Map(); // socket => { username, color }

// Rate limiting config
const RATE_LIMIT = 5; // max messages
const INTERVAL = 3000; // in milliseconds

server.on('connection', socket => {
    console.log('Client connected');

    let rateCount = 0;
    let lastReset = Date.now();

    // Wait for user to send initial registration message
    socket.once('message', raw => {
        const initData = JSON.parse(raw.toString());
        const { username, color } = initData;

        clients.set(socket, { username, color });

        // Notify all users someone joined
        broadcast({
            system: true,
            message: `${username} has joined the chat.`,
        });

        // On each message
        socket.on('message', rawMessage => {
            resetRateLimit();

            rateCount++;
            if (rateCount > RATE_LIMIT) {
                socket.send(JSON.stringify({ system: true, message: "⚠️ Rate limit exceeded. You’ve been disconnected." }));
                socket.close();
                return;
            }

            let data;
            try {
                data = JSON.parse(rawMessage.toString());
            } catch {
                data = { message: rawMessage.toString() };
            }

            const sender = clients.get(socket);
            if (!sender) return;

            broadcast({
                username: sender.username,
                color: sender.color,
                message: data.message,
            });
        });

        // On close
        socket.on('close', () => {
            const user = clients.get(socket);
            if (user) {
                broadcast({
                    system: true,
                    message: `${user.username} has left the chat.`,
                });
                clients.delete(socket);
            }
        });

        function resetRateLimit() {
            const now = Date.now();
            if (now - lastReset > INTERVAL) {
                rateCount = 0;
                lastReset = now;
            }
        }
    });
});

// Broadcast helper
function broadcast(data) {
    const msg = JSON.stringify(data);
    server.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(msg);
        }
    });
}

console.log('✅ WebSocket server running at ws://localhost:8080');

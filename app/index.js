const socket = new WebSocket('ws://localhost:8080');
const log = document.getElementById('log');

const { username, color } = generateRandomUsernameAndColor();
const messageHistory = [];

socket.onopen = () => {
    const init = { username, color };
    socket.send(JSON.stringify(init));
    log.innerHTML += `<p><em>Connected as <strong>${username}</strong></em></p>`;
};

socket.onmessage = async (event) => {
    let msg = event.data;

    if (msg instanceof Blob) {
        msg = await msg.text();
    }

    const data = JSON.parse(msg);

    if (data.system) {
        log.innerHTML += `<p style="color: gray;"><em>${data.message}</em></p>`;
    } else {

        // Add new message to history
        messageHistory.push(data);
        if (messageHistory.length > 10) {
            messageHistory.shift(); // Remove oldest message
        }

        // Clear and re-render last 10 messages
        log.innerHTML = '';
        for (let i = 0; i < messageHistory.length; i++) {
            let m = messageHistory[i];
            if (i == 0) {
                log.innerHTML += `<p><em>Connected as <strong>${username}</strong></em></p>`;
            }
            let colorDot = `<span style="color:${m.color}; font-weight:bold;">●</span>`;
            log.innerHTML += `<p>${colorDot} <strong>${m.username}:</strong> ${m.message}</p>`;
        }

    }
};

function sendMessage() {
    const input = document.getElementById('msgInput');

    const msgData = {
        username,
        color,
        message: input.value
    };

    socket.send(JSON.stringify(msgData));
    input.value = '';
}

function generateRandomUsernameAndColor() {
    const colors = ['red', 'blue', 'green', 'orange', 'purple'];
    const animals = ['Tiger', 'Lion', 'Eagle', 'Shark', 'Wolf'];
    const number = Math.floor(Math.random() * 100);

    const color = colors[Math.floor(Math.random() * colors.length)];
    const animal = animals[Math.floor(Math.random() * animals.length)];

    return {
        username: `${capitalize(color)}${animal}${number}`,
        color
    };
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
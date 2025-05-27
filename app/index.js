const socket = new WebSocket('ws://localhost:8080');
const log = document.getElementById('log');

const { username, color } = generateRandomUsernameAndColor();

socket.onopen = () => {
    log.innerHTML += `<p><em>Connected as <strong>${username}</strong></em></p>`;
};

socket.onmessage = async (event) => {
    let msg = event.data;

    if (msg instanceof Blob) {
        msg = await msg.text();
    }

    const data = JSON.parse(msg);

    const colorDot = `<span style="color:${data.color}; font-weight:bold;">●</span>`;

    log.innerHTML += `<p>${colorDot} <strong>${data.username}:</strong> ${data.message}</p>`;
};

function sendMessage() {
    const input = document.getElementById('msgInput');

    const msgData = {
        username,
        color,
        message: input.value
    };

    const colorDot = `<span style="color:${msgData.color}; font-weight:bold;">●</span>`;

    log.innerHTML += `<p>${colorDot} <strong>${msgData.username}:</strong> ${msgData.message}</p>`;

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

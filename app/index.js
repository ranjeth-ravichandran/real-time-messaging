const socket = new WebSocket('ws://real-time-messaging.onrender.com');
const log = document.getElementById('log');
const userDropdown = document.getElementById('userSelect');

const { username, color } = generateRandomUsernameAndColor();
const messageHistory = [];

// Send initial user info on connect
socket.onopen = () => {
    socket.send(JSON.stringify({ type: 'init', username, color }));
    renderSystemMessage(`Connected as <strong>${username}</strong>`);
};

// Handle incoming messages
socket.onmessage = async (event) => {
    let msg = event.data;

    if (msg instanceof Blob) {
        msg = await msg.text();
    }

    const data = JSON.parse(msg);

    // System message (e.g. join/leave)
    if (data.system) {
        renderSystemMessage(data.message);
        return;
    }

    // User list update (optional)
    if (data.type === 'userList') {
        updateUserDropdown(data.users);
        return;
    }

    // Chat message
    updateMessageHistory(data);
    renderMessages();
};

function sendMessage() {
    const input = document.getElementById('msgInput');
    const message = input.value.trim();
    if (!message) return;

    const msgData = {
        username,
        color,
        message
    };

    socket.send(JSON.stringify(msgData));
    input.value = '';
}

function updateMessageHistory(data) {
    messageHistory.push(data);
    if (messageHistory.length > 10) {
        messageHistory.shift();
    }
}

function renderMessages() {
    log.innerHTML = ``;
    renderSystemMessage(`Connected as <strong>${username}</strong>`);
    messageHistory.forEach((m) => {
        const colorDot = `<span style="color:${m.color}; font-weight:bold;">●</span>`;
        log.innerHTML += `<p>${colorDot} <strong>${m.username}:</strong> ${m.message}</p>`;
    });
}

function renderSystemMessage(message) {
    log.innerHTML += `<p style="color: gray;"><em>${message}</em></p>`;
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

// Optional: Render user list dropdown
function updateUserDropdown(users) {
    if (!userDropdown) return;
    userDropdown.innerHTML = '';
    users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.textContent = `${user.username}`;
        listItem.style.backgroundColor = user.color;
        userDropdown.appendChild(listItem);
    });
}

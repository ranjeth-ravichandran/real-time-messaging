# Real-Time Messaging
Creating a website to understand networking with web sockets and to create a chat application to message users in real-time.

| TODO                    |     |
| ----------------------- | --- |
| Redesign UI             | ⬜️   |
| Implement into Vercel   | ⬜️   |
| Adding database MongoDB | ⬜️   |
| Adding backend server   | ⬜️   |

## What are Websockets?
WebSockets provide a full-duplex communication channel over a single connection between the client and the server. 

WebSockets are a protocol for creating a persistent connection between a client and a server. Unlike HTTP which follows a request-response model, WebSockets allow for continuous two-way communication, enabling real-time data transfer.

### Use cases
- Real-time chat application
- Live sports scores
- Online gaming
- Collaborative editing tools

### Why websockets and not http?
HTTP creates a new TCP connection for every request which is not ideal for real-time communication, as WebSockets uses a single 'persistent' connection therefore it does not waste bandwidth and efficiently uses CPU.

### How does websockets work?
Websockets start as an HTTP connection and then upgrades to a websocket connection through a process known as the websocket handshake. Once established the connection remain open, allowing for continuous data exchange.

### WebSocket Handshake
- the client sends an HTTP request to the server with an upgrade header indicating a request to switch to the websocket protocol.
- the server responds to switch to the websocket protocol.
- the websocket connection is established, enabling full-duplex communication.

### How to establish a WebSocket?
A websocket requires a server and a client which talk over a persistent connection. Such as establishing a Node.js server for backend and relaying this server connection to the client using WebSocket API which is a built-in feature within browsers for open two-way interactive communication session between the user's browser and a server.

# What to use?
- Node.js (ws -> a lightweight WebSocket server in Node.js)
- WebSocket API (Built-in browser client API)

# Issues or Problems 
- When sending data over a socket the header/data is sent as binary and therefore interpreted as an Object Blob within browsers, to fix this the data needs to be checked whether it is a Blob datatype or converted in the server as text.
- Use charset="UTF-8" as not all browsers will use the correct character set (Microsoft Edge).

# Sources
- [Real-Time Communication with WebSockets: A Complete Guide](https://dev.to/dipakahirav/real-time-communication-with-websockets-a-complete-guide-32g4#:~:text=WebSockets%20provide%20a%20full-duplex%20communication%20channel%20over%20a,as%20chat%20applications,%20live%20notifications,%20and%20online%20gaming.)
- [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
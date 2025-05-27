# Real-Time Messaging
Creating a website to understand networking with web sockets and to create a chat application to message users in real-time.

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
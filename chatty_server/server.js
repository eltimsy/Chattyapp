// server.js

const express = require('express');
const SocketServer = require('ws').Server;

// Set the port to 4000
const PORT = 4000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};

let userCount = {type: "userCount", users: 0};

function color() {
   const letters = '0123456789ABCDEF';
   let color = '#';
   for (let i = 0; i < 6; i++) {
     color += letters[Math.floor(Math.random() * 16)];
   }
   return color;
};
wss.on('connection', (ws) => {

  console.log('Client connected');
  userCount.users += 1;
  wss.broadcast(JSON.stringify(userCount));
  ws.color = color();
  ws.on('open', function open(event) {
  })
  ws.on('message', function incoming(message) {
    console.log('message received')
    let mess = JSON.parse(message);
    if (mess.type === 'incomingMessage') {
      let image = mess.content.match(/(https?|ftp):\/\/.*\.(?:jpg|png|gif|bmp)/);
      let message = mess.content.replace(/(https?|ftp):\/\/.*\.(?:jpg|png|gif|bmp)/, "");

      console.log(`User ${mess.username} said ${mess.content}`);
      mess.color = ws.color;
      mess.content = message;
      if(image) {
        mess.image = image[0];
      } else {
        mess.image = "";
      }
      ws.name = mess.username;
      wss.broadcast(JSON.stringify(mess));
    }
    else if (mess.type === 'incomingNotification') {
      console.log(`${mess.oldusername} changed their name to ${mess.username}`)
      ws.name = mess.username;
      wss.broadcast(JSON.stringify(mess));
    }

  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')
    userCount.users -= 1;
    console.log(ws.name)
    let logout = {type: 'userLeaves', username: ws.name, users: userCount.users};
    wss.broadcast(JSON.stringify(logout));
  });
});

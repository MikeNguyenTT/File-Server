const net = require('net');
const fs = require('fs');
const port = 3000;
const server = net.createServer();

// add this line after server is created, before listen is called
server.on('connection', (client) => {
  console.log('New client connected!');

  client.setEncoding('utf8'); // interpret data as text
  client.on('data', (filePath) => {
    console.log('Received request for file: ', filePath);
    
    fs.readFile(filePath, 'utf8', function(err, data){
      if (err) {
        console.log("AAAAAAAAA");
        client.write("Error: " + err);
      }
      else {
        client.write(data);
      }
  });
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}!`);
});
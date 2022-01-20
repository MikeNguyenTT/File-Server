const net = require('net');
const fs = require('fs');
const readline = require('readline');
const fileName = "index.html";
const filePath = "./" + fileName;
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const conn = net.createConnection({ 
  host: 'localhost', // change to IP address of computer or ngrok host if tunneling
  port: 3000 // or change to the ngrok port if tunneling
});

conn.setEncoding('utf8'); // interpret data as text

conn.on('data', (data) => {
  if (fs.existsSync(filePath)) {
    rl.question('File exists, do you want to overwrite ', (answer) => {
      if (answer === "y") {
        writeToFileAndExit(filePath, data);
      }
      rl.close();
    });
  } else {
    writeToFileAndExit(filePath, data);
  }
});

conn.on('connect', () => {
  conn.write(filePath);
});


const writeToFileAndExit = function(filePath, body) {
  fs.writeFile(filePath, body, err => {
    if (err) {
      console.log("File path is not valid")
      console.error(err)
      process.exit();
    }
    console.log(`Downloaded and saved ${body.length} bytes to ${filePath}`);
    process.exit();
  });
}
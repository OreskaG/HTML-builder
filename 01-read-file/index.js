const fs = require('fs');
const path = require('path');
const { stdout } = process;

let fileDir = path.join(__dirname, 'text.txt');
let readFunction = fs.createReadStream(fileDir, 'utf-8');

readFunction.on('data', chunk => {
  stdout.write(chunk);
});
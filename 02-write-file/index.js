const fs = require('fs');
const path = require('path');
const { stdout, stdin, exit } = process;

let fileDir = path.join(__dirname, 'text.txt');
let writeFunction = fs.createWriteStream(fileDir, 'utf-8');

stdout.write('Введите текст \n');
stdin.on('data', data => {
  let inputText = data.toString().slice(0, data.length-2);
  if (inputText === 'exit') process.exit();
  writeFunction.write(inputText);
});

process.on('SIGINT', exit);
process.on('exit', () => stdout.write('Спасибо что использовали наше приложение!'));
const fs = require('fs');
const path = require('path');
const { stdout } = process;

const fileDir = path.join(__dirname, 'secret-folder');

fs.readdir(fileDir, { withFileTypes: true }, (dirs, files) => {
  files.forEach( file => {
    if (file.isFile()) {
      let filePath = path.join(fileDir, file.name);
      fs.stat(filePath, (dirs, stats) => {
        let fileName = file.name.split('.').slice(0,-1).join('');
        let fileType = path.extname(filePath).split('').slice(1,).join('');
        let FileSize = `${(stats.size / 1024).toFixed(3)} kb`;
        stdout.write(fileName + ' - ' + fileType + ' - ' + FileSize + '\n');
      });
    }
  });
});
const fs = require('fs');
const path = require('path');

const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');
const stylesPath = path.join(__dirname, 'styles');

fs.readdir(stylesPath, { withFileTypes: true }, (err, cssFiles) => {
  if (err) throw err;
  let writeStream = fs.createWriteStream(bundlePath);
  cssFiles.forEach(file => {
    let filePath = path.join(stylesPath, file.name);
    if (file.isFile()) {
      if (path.parse(filePath).ext === '.css') {
        let readStream = fs.createReadStream(filePath);
        readStream.pipe(writeStream);
      }
    }
  });
});
const fs = require('fs');
const path = require('path');

const copiedFolderPath = path.join(__dirname, 'files-copy');
const originFolderPath= path.join(__dirname,'files');
fs.mkdir(copiedFolderPath,{recursive:true}, err => { if (err) throw err; });

function copyDir(originFolderPath, copiedFolderPath) {
  fs.readdir(originFolderPath, { withFileTypes: true }, (err, files)=> {
    if (err) throw err;
    files.forEach(file=> {
      if (file.isFile()) {
        fs.copyFile(path.join(originFolderPath, file.name), path.join(copiedFolderPath, file.name), err => {
          if (err) throw err;
        }); 
      }
    });
  });
}

copyDir(originFolderPath, copiedFolderPath);
const fs = require('fs');
const path = require('path');
const promise = fs.promises;

const copiedFolderPath = path.join(__dirname, 'files-copy');
const originFolderPath= path.join(__dirname,'files');

async function copyDir(originFolderPath, copiedFolderPath) {
  await promise.rm(copiedFolderPath, { recursive: true, force: true }, err => { if (err) throw err; });
  await promise.mkdir(copiedFolderPath, {recursive:true}, err => { if (err) throw err; });
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
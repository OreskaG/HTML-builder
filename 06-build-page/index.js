const fs = require('fs');
const path = require('path');
const promise = fs.promises;

const distPath = path.join(__dirname, 'project-dist');
const assetsPath = path.join(__dirname, 'assets');
const componentsPath = path.join(__dirname, 'components');
const stylesPath = path.join(__dirname, 'styles');
const templatePath = path.join(__dirname, 'template.html');

fs.mkdir(distPath, {recursive:true}, err => { if (err) throw err; });

function createStyles() {
  fs.readdir(stylesPath, { withFileTypes: true }, (err, cssFiles) => {
    if (err) throw err;
    let writeStream = fs.createWriteStream(distPath + '\\' + 'style.css');
    cssFiles = cssFiles.reverse();
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
}
createStyles();

async function createAssets(originFolderPath, copiedFolderPath) {
  await promise.rm(copiedFolderPath, { recursive: true, force: true });
  await promise.mkdir(copiedFolderPath, { recursive: true });
  const assetsFiles = await promise.readdir(originFolderPath, { withFileTypes: true });
  for ( let i = 0 ; i < assetsFiles.length ; i+=1 ) {
    let item = assetsFiles[i];
    let originPath = path.join(originFolderPath, item.name);
    let copiedPath = path.join(copiedFolderPath, item.name);
    if (item.isDirectory()) {
      await promise.mkdir(copiedPath, { recursive: true });
      await createAssets(originPath, copiedPath);
    }
    if (item.isFile()) {
      await promise.copyFile(originPath, copiedPath);
    }
  }
}
createAssets(assetsPath, distPath + '\\' + 'assets');

async function createHtml() {
  let result = {};
  let template = (await promise.readFile(templatePath)).toString();
  let tags = template.match(/{{.+}}/gi).map((tag) => tag.slice(2, tag.length - 2));
  for (let i = 0; i < tags.length; i+= 1) {
    result[tags[i]] = await promise.readFile(componentsPath + '\\' + `${tags[i]}.html`);
    result[tags[i]] = result[tags[i]].toString();
    let html = template.split(`{{${tags[i]}}}`);
    template = html[0] + result[tags[i]] + html[1];
  }
  await promise.writeFile(distPath + '\\' + 'index.html', template);
}
createHtml();
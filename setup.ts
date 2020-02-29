/* tslint:disable */
import * as fs from 'fs';
import * as path from 'path';


console.log('Setting up project ⚙️ ...');
// copy envConfig
if (!fs.existsSync('./config/envConfig.ts')) {
  console.log('copy envConfig.ts');
  copyFile('./config/envConfig.ts.template', './config/envConfig.ts');
}

// copy hooks
copyFolderRecursive('./hooks/', './.git/');
chmodR('./.git/hooks', 0o755);

console.log('✅ Done!');

function copyFile(source, target) {
  let targetFile = target;
  // if target is a directory a new file with the same name will be created
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source));
    }
  }
  fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursive(source, target) {
  let files = [];
  const targetFolder = path.join(target, path.basename(source));
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder);
  }
  // copy
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source);
    files.forEach((file) => {
      const curSource = path.join(source, file);
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursive(curSource, targetFolder);
      } else {
        copyFile(curSource, targetFolder);
      }
    });
  }
}

function chmodR(target, right) {
  let files = [];
  if (fs.lstatSync(target).isDirectory()) {
    files = fs.readdirSync(target);
    files.forEach((file) => {
      const filePath = path.join(target, file);
      fs.chmodSync(filePath, right);
    });
  } else {
    fs.chmodSync(target, right);
  }
}

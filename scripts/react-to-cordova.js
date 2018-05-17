const fs = require('fs');
const { execSync } = require('child_process');

const deleteFolderRecursive = path => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file, index) => {
      let curPath = path + '/' + file;
      (fs.lstatSync(curPath).isDirectory()) ? deleteFolderRecursive(curPath) : fs.unlinkSync(curPath);
    });
    fs.rmdirSync(path);
  }
};

if (process.argv.length !== 4) {
  console.log('Syntax error\n');
  console.log(`Usage: npm run ${process.argv[2]} PLATFORM`);
  console.log('  PLATFORM: Cordova platform\n');
  console.log('Examples:');
  console.log(`  npm run ${process.argv[2]} browser`);
  console.log(`  npm run ${process.argv[2]} android`);
  return;
}

try {
  if (!fs.existsSync(`./platforms/${process.argv[3]}`)) {
    console.log(`Adding Cordova ${process.argv[3]} platform...`);
    if (!fs.existsSync('./www')) fs.mkdirSync('./www');
    execSync(`cordova platform add ${process.argv[3]}`);
  }
  console.log('Building react app...');
  execSync('cd react-app && npm run build');
  console.log('react-app built');
  if (fs.existsSync('./www')) deleteFolderRecursive('./www');
  fs.renameSync('./react-app/build', './www');
  execSync(`cordova ${process.argv[2]} ${process.argv[3]}`);
}
catch(error) {
  console.log('Something went wrong...');
  console.log(error);
};

const fs = require('fs');
const { execSync } = require('child_process');

const deleteFolderRecursive = (path) => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file, index) => {
      var curPath = path + "/" + file;
      if(fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      }
      else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

if (process.argv.length !== 4) {
  console.log("Syntax error");
  console.log("");
  console.log("Usage: npm run " + process.argv[2] + " PLATFORM");
  console.log("  PLATFORM: Cordova platforms");
  console.log("");
  console.log("Examples");
  console.log("  custom-script " + process.argv[2] + " browser");
  console.log("  custom-script " + process.argv[2] + " android");
  return;
}

try {
  console.log("Building react app...");
  execSync("cd react-app && npm run build");
  console.log("react-app built");
  if ( fs.existsSync("./www") ) {
    deleteFolderRecursive("./www");
  }
  fs.renameSync("./react-app/build", "./www");
  execSync("cordova " + process.argv[2] + " " + process.argv[3]);
}
catch(error) {
  console.log("Something went wrong...");
  console.log(error);
};

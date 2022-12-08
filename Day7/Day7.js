const fs = require('fs');

const fileContent = fs.readFileSync('./input.txt', 'utf-8').split('\r\n');

let directories = [];
let activeDir = null;

const runCommand = (cmd, dirName) => {
  if ('cd' === cmd) {
    if ('..' === param) activeDir = directories.pop();
    else {
      const newDir = activeDir?.content.find(content => 'dir' === content.type && dirName === content.name) ?? createDir(dirName, false);
      if (activeDir) {
        directories.push(activeDir);
      }
      activeDir = newDir;
    }
  }
}

const createDir = (dirName, add = true) => {
  const newDir = {
    name: dirName,
    type: 'dir',
    content: [],
    get size() {
      return this.content.reduce((accumulator, content) => accumulator + content.size, 0);
    },
  };

  if (add) activeDir.content.push(newDir);

  return newDir;
}

const addFile = (fileSize, fileName) => {
  activeDir.content.push({
    name: fileName,
    type: 'file',
    size: parseInt(fileSize),
  });
}

for (let i = 0; i < fileContent.length; i++) {
  [$, cmd, param] = fileContent[i].split(' ');
  if ('$' === $) runCommand(cmd, param);
  else if ('dir' === $) createDir(cmd);
  else addFile($, cmd);
}


const dirs = [...directories];
let dirSize = 0;
for (let i = 0; i < dirs.length; i++) {
  const dir = dirs[i];
  dirs.push(...dir.content.filter(content => 'dir' === content.type));
  if (dir.size <= 100000) dirSize += dir.size;
}
console.log(dirSize);

const requiredSpace = 30000000 - (70000000 - directories[0].size);
dirs.sort((firstDir, secondDir) => firstDir.size - secondDir.size);
const dirSizeToDelete = dirs.find(dir => dir.size >= requiredSpace).size;
console.log(dirSizeToDelete);
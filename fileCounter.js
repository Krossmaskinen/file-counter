const fs = require('fs');
const dir = process.argv.slice(2, 3).pop();

let scanSubdir = process.argv.slice(3, 4);
let count = 0;
let files;
let ignoreFiles = [];


function loadIgnoreFiles() {
    if (process.argv.length < 5) {
        return;
    }

    for (let i = 4; i < process.argv.length; ++i) {
        ignoreFiles.push(process.argv[i]);
    }
}

function getCount(files, parent) {
    let subFiles;

    try {
        files.forEach(file => {
            let filePath;
            let fileStats;

            if (ignoreFiles.includes(file)) {
                return;
            }

            filePath = `${parent}/${file}`;
            fileStats = fs.statSync(filePath);

            if (fileStats.isDirectory()) {
                subFiles = fs.readdirSync(filePath);
                count += getCount(subFiles, filePath);
            } else {
                ++count;
            }
        });
    } catch (e) {
        console.log(e);
        console.log(parent);
        console.log(files);
    }

    return count;
}

function main() {
    console.log(`Scanning ${dir}`);

    if (scanSubdir) {
        console.log('Including subdirectores');
    } else {
        console.log('Ignoring subdirectories');
    }

    try {
        files = fs.readdirSync(dir);
    } catch (e) {
        console.log(`Couldn't read directory ${dir}`);
        console.log(e);
    }

    loadIgnoreFiles();

    scanSubdir = scanSubdir || [];
    count = getCount(files, dir);

    console.log(`Number of files: ${count}`);

    return count;
}

return main();
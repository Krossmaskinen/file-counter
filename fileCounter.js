const fs = require('fs');
const dir = process.argv.slice(2, 3).pop();

let scanSubdir = process.argv.slice(3, 4);
let count = 0;
let files;

function getCount(files, parent) {
    let subFiles;

    try {
        files.forEach(file => {
            const filePath = `${parent}/${file}`;
            const fileStats = fs.statSync(filePath);

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
    console.log(dir);

    try {
        files = fs.readdirSync(dir);
    } catch (e) {
        console.log(`couldn't read dir`);
        console.log(e);
    }

    scanSubdir = scanSubdir || [];
    count = getCount(files, dir);

    console.log(`number of files: ${count}`);

    return count;
}

return main();
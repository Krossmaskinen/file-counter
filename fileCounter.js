const fs = require('fs');
const dir = process.argv.slice(2, 3).pop();

console.log(dir);

let count = 0;
let files;

try {
    files = fs.readdirSync(dir);
} catch (e) {
    console.log(`couldn't read dir`);
    console.log(e);
}

function getCount(files, parent) {
    let subFiles;

    try {
        files.forEach(file => {
            const filePath = `${parent}/${file}`;

            if (!file.match(/.\./)) {
                subFiles = fs.readdirSync(filePath);
                count += getCount(subFiles, filePath);
            } else if (file.match(/.\.js$/)) {
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

count = getCount(files, dir);

console.log(`number of files: ${count}`);
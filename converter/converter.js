const mammoth = require('mammoth');
const cleaner = require('clean-html');
const fs = require('fs');

let options = {
    styleMap: [
        "p[style-name='Intro'] => p.intro",
        "p[style-name='List Bullet'] => ul > li:fresh"
    ]
};

const convertWord = (file, output) => {
    mammoth.convertToHtml({path: file}, options)
        .then((result) => {
            let ugly = result.value; // The generated HTML
            cleaner.clean(ugly, (pretty) => {
                fs.writeFile(output, pretty, (err) => {
                    if(err) {
                        console.log('Error convertWord:', err);
                    } else {
                        let filename = output.split('/');
                        console.log(`${filename[filename.length - 1]} file complete.`);
                    }
                });
            });

            if (result.messages.length > 0) {
                console.log('messages', result.messages);
            }
        })
        .done();
};

const convertFolder = (dirpath) => {
    if (!fs.existsSync('./output')) {
        fs.mkdirSync('./output');
    }

    let folder = dirpath.split('/');
    let target = folder[folder.length - 1];

    if (!fs.existsSync('./output/' + target)) {
        fs.mkdirSync('./output/' + target);
    }

    let outputPath = './output/' + target + '/';

    fs.readdir(dirpath, (err, files) => {
        console.log(`Converting ${files.length} Word files`);
        console.log('*--------------------------------------*');
        for (let file of files) {
            let filename = file.split('.');
            let output = outputPath + filename[0] + '.html';
            let filepath = dirpath + '/' + file;
            convertWord(filepath, output);
        }
    });

};

module.exports = {
    convertWord,
    convertFolder
};
const mammoth = require('mammoth');
const cleaner = require('clean-html');
const fs = require('fs');

const convertWord = (file, output) => {
    mammoth.convertToHtml({path: file})
        .then((result) => {
            let ugly = result.value; // The generated HTML
            cleaner.clean(ugly, (pretty) => {
                fs.writeFile(output, pretty, (err) => {
                    if(err) {
                        console.log('Error convertWord:', err);
                    } else {
                        console.log(`${output} file complete.`);
                    }
                });
            });

            if (result.messages) {
                console.log('messages', result.messages);
            }
        })
        .done();
};

const convertFolder = (dirpath) => {
    let outputPath = './output/';

    fs.readdir(dirpath, (err, files) => {
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
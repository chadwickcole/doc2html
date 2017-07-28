const mammoth = require('mammoth');
const cleaner = require('clean-html');
const replacer = require('replace-in-file');
const fs = require('fs');

let options = {
    styleMap: [
        "p[style-name='Intro'] => p.intro",
        "p[style-name='List Bullet'] => ul > li:fresh"
    ]
};

const cmsify = (file) => {
    let cmsOptions = {
        files: file,

        from: [ /<p>\[Context\]<\/p>/g,
                /<p>\[End context\]<\/p>/g,
                /<p>\[Highlights\]<\/p>/g,
                /<p>\[End highlights\]<\/p>/g,
                /<p>\[Details\]<\/p>/g,
                /<p>\[End details\]<\/p>/g,
                /<p>/g,
                /<\/p>/g,
                /<h1>/g,
                /<\/h1>/g,
                /<h2>/g,
                /<\/h2>/g,
                /<h3>/g,
                /<\/h3>/g,
                /<h4>/g,
                /<\/h4>/g,
                /<h5>/g,
                /<\/h5>/g,
                /<ul>/g,
                /<\/ul>/g,
                /<ol>/g,
                /<\/ol>/g,
                /<li>/g,
                /<\/li>/g,
                /<strong>/g,
                /<\/strong>/g,
                /<em>/g,
                /<\/em>/g,
                /<td>\n      <content>/g,
                /<\/content>\n    <\/td>/g
        ],
        to: [   '<context>',
                '</context>',
                '<highlights>',
                '</highlights>',
                '<section>',
                '</section>',
                '<content>',
                '</content>',
                '<header level="1">',
                '</header>',
                '<header level="2">',
                '</header>',
                '<header level="3">',
                '</header>',
                '<header level="4">',
                '</header>',
                '<header level="5">',
                '</header>',
                '<list type="unordered">',
                '</list>',
                '<list type="ordered">',
                '</list>',
                '<list-item>',
                '</list-item>',
                '<b>',
                '</b>',
                '<i>',
                '</i>',
                '<td>',
                '</td>'

        ],

        allowEmptyPaths: false,
        encoding: 'utf8'
    };

    replacer(cmsOptions)
        .then(changedFiles => {
            console.log('Modified files:', changedFiles.join(', '));
        })
        .catch(error => {
            console.error('Error occurred:', error);
        });
};

const cmsifyFolder = (dir) => {
    fs.readdir(dir, (err, files) => {
        console.log(`CMSifying ${files.length} files`);
        console.log('*--------------------------------------*');
        for (let file of files) {
            cmsify(dir + file);
        }
    });
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
    convertFolder,
    cmsify,
    cmsifyFolder
};
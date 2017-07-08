const fs = require('fs');
const yargs = require('yargs');
const _ = require('lodash');

const converter = require('./converter/converter');

const argv = yargs
    .command('convert', 'Converts Word files to HTML files', {
        from: {
            describe: 'Path to Word file',
            demand: true,
            alias: 'f'
        },
        to: {
            describe: 'Path to HTML output',
            demand: true,
            alias: 't'
        }
    })
    .command('convertdir', 'Converts all Word files in a given directory to HTML', {
        folder: {
            describe: 'Path to directory',
            demand: true,
            alias: 'd'
        }
    })
    .help()
    .argv;

let command = argv._[0];

if (command === 'convert') {
    converter.convertWord(argv.from, argv.to);

} else if (command === 'convertdir') {
    converter.convertFolder(argv.folder);

} else {
    console.log('Command not recognized');
}
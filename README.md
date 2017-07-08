# doc2html
This is a simple command-line Node app to convert Word .docx files to HTML files. You can convert a single Word file using the `convert` command or convert a folder of Word files by using the `convertdir` command.

## Installation
Download repo to your local machine and run npm install
```
npm install
```

## Convert Single Word File
Convert a single Word file using the `convert` command by passing the path the file name `--from or -f` and specifying the output path/file name `--to or -t`.

```
node app.js convert --from './word/med.docx' --to './word/med.html'

or 

node app.js convert -f './word/med.docx' -t './word/med.html'
```
(__Note:__ the sample document in the example above is included in repo `/word/med.docx`)

## Convert All Word Files Within a Folder
Convert all the Word files in a given directory by using the `converdir` command and passing the path to the folder `--folder or -d`.

```
node app.js convertdir --folder './wordfolder'

or

node app.js convertdir -d './wordfolder'
```
(__Note:__ the sample folder in the example above is included in repo `/wordfolder`)

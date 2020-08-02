#!/usr/bin/env node
/* eslint-disable no-console */
const Yarg = require('yargs');
const Chalk = require('chalk');
const Path = require('path');
const { FilterCompiler } = require('../lib');

async function compile(argv) {
    for (const entryFile of argv.entryFiles) {
        const inputFullPath = entryFile;
        const outputFullPath = Path.join(argv.outputDirectory, `${Path.basename(inputFullPath, '.js')}.compiled.js`);

        try {
            await FilterCompiler.compile(inputFullPath, outputFullPath);
        } catch (ex) {
            console.log(Chalk.redBright(ex));
            throw ex;
        }
    }
}

// eslint-disable-next-line no-unused-expressions
Yarg.command(
    'compile <outputDirectory> [entryFiles...]',
    'compiles entry files to outputDirectory so that they will be usable in tsetmc website',
    () => {},
    compile
).help().argv;

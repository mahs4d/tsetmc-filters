const Path = require('path');
const Webpack = require('webpack');
const PrependFile = require('prepend-file');
const Fs = require('fs');

class FilterCompiler {
    static async compile(entryFileAddress, outputFileAddress) {
        await new Promise((resolve, reject) => {
            Webpack(
                {
                    mode: 'production',
                    entry: entryFileAddress,
                    output: {
                        path: Path.resolve(Path.dirname(outputFileAddress)),
                        filename: Path.basename(outputFileAddress),
                    },
                    optimization: {
                        minimize: false,
                    },
                },
                (err, stats) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve(stats);
                }
            );
        });

        const prependContent = Fs.readFileSync(Path.join(__dirname, '../filtermeta/filter.prepend.js'));
        await PrependFile(outputFileAddress, prependContent);

        const appendContent = Fs.readFileSync(Path.join(__dirname, '../filtermeta/filter.append.js'));
        Fs.appendFileSync(outputFileAddress, appendContent);
    }
}

module.exports = FilterCompiler;

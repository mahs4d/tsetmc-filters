const Path = require('path');
const Webpack = require('webpack');

class FilterCompiler {
    static compile(entryFileAddress, outputFileAddress) {
        return new Promise((resolve, reject) => {
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
    }
}

module.exports = FilterCompiler;

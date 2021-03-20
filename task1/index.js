const { Transform } = require('stream');

const stringTransformer = new Transform({
  transform(chunk, encoding, callback) {
    const reversedString = Array.from(chunk.toString().replace('\n', '')).reverse().join('').concat('\n');
    callback(null, reversedString);
  }
});

stringTransformer.on('error', (error) => {
  console.error(error);
});

process.stdin.pipe(stringTransformer).pipe(process.stdout);
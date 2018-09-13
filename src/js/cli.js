const hackmdToConfluence = require('./hackmd-to-confluence');

const reader = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});
const lines = [];
reader.on('line', line => lines.push(line));
process.stdin.on('end', () => {
  const src = lines.join('\n');
  console.log(hackmdToConfluence.convert(src));
});

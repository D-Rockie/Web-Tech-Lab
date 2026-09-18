// demo.js - runs the fs and url examples from the page
// run with: node demo.js
const fs = require('fs');
const fsp = require('fs/promises');
const url = require('url');

console.log('===== fs module =====');

// write + append
fs.writeFileSync('marks.txt', 'Name,Marks\n');
fs.appendFileSync('marks.txt', 'Arun,78\n');
fs.appendFileSync('marks.txt', 'Meena,91\n');
console.log('marks.txt contains:\n' + fs.readFileSync('marks.txt', 'utf8'));

// JSON
fs.writeFileSync('student.json', JSON.stringify({ name: 'Arun', dept: 'AI&DS', year: 2 }, null, 2));
console.log('student.json ->', JSON.parse(fs.readFileSync('student.json', 'utf8')));

// copy, rename, delete
fs.copyFileSync('marks.txt', 'marks-backup.txt');
fs.renameSync('marks-backup.txt', 'old-marks.txt');
console.log('old-marks.txt exists?', fs.existsSync('old-marks.txt'));
fs.unlinkSync('old-marks.txt');
console.log('after unlink, exists?', fs.existsSync('old-marks.txt'));

// folders
fs.mkdirSync('uploads/2026', { recursive: true });
fs.writeFileSync('uploads/2026/photo.txt', 'pretend this is a photo');
console.log('inside uploads/2026:', fs.readdirSync('uploads/2026'));
fs.rmSync('uploads', { recursive: true, force: true });
console.log('uploads removed?', !fs.existsSync('uploads'));

// stat
const info = fs.statSync('marks.txt');
console.log('marks.txt size:', info.size, 'bytes | isFile:', info.isFile(), '| isDirectory:', info.isDirectory());

// error case
fs.readFile('missing.txt', 'utf8', (err) => {
  console.log('\nreading missing.txt ->', err.code);
});

console.log('\n===== url module =====');
const link = new URL('https://shop.example.com:8080/books/search?title=node&page=2#reviews');
['protocol', 'host', 'hostname', 'port', 'pathname', 'search', 'hash', 'origin']
  .forEach(p => console.log(p.padEnd(9), ':', link[p]));

const q = new URL('https://site.com/products?cat=shoes&size=8&size=9').searchParams;
console.log('\nget(cat)     :', q.get('cat'));
console.log('get(size)    :', q.get('size'));
console.log('getAll(size) :', q.getAll('size'));
console.log('has(color)   :', q.has('color'));
console.log("page + 1     :", new URL('http://x.com/?page=2').searchParams.get('page') + 1);

const api = new URL('https://api.example.com');
api.pathname = '/v1/movies';
api.searchParams.set('genre', 'sci-fi');
api.searchParams.set('q', 'star wars & more');
api.searchParams.append('year', '2024');
console.log('\nbuilt URL    :', api.href);

console.log('url.format   :', url.format({ protocol: 'http', hostname: 'localhost', port: 3000, pathname: '/about' }));
console.log('fileURL      :', url.pathToFileURL('/home/dev/report.pdf').href);
console.log('canParse     :', URL.canParse('not a url'));

try {
  new URL('/about');
} catch (e) {
  console.log('new URL("/about") ->', e.code);
}
console.log('with base    :', new URL('/about', 'http://localhost:3000').href);

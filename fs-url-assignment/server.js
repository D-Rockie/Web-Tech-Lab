// server.js - all four use cases in one small server
// run with: node server.js  then open http://localhost:3000
const http = require('http');
const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');

const PORT = 3000;
const COUNT_FILE = 'visits.json';

const types = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json'
};

// use case 4 - log each request into logs/<date>.log
function logRequest(req, u) {
  const today = new Date().toISOString().slice(0, 10);
  const line = `${new Date().toLocaleTimeString()}  ${req.method}  ${u.pathname}  ${u.search}\n`;
  fs.mkdirSync('logs', { recursive: true });
  fs.appendFile(`logs/${today}.log`, line, err => {
    if (err) console.log('log failed:', err.message);
  });
}

// use case 2 - visit counter stored in visits.json
function countVisit(pathname) {
  let visits = {};
  if (fs.existsSync(COUNT_FILE)) {
    visits = JSON.parse(fs.readFileSync(COUNT_FILE, 'utf8'));
  }
  visits[pathname] = (visits[pathname] || 0) + 1;
  fs.writeFileSync(COUNT_FILE, JSON.stringify(visits, null, 2));
  return visits[pathname];
}

const server = http.createServer(async (req, res) => {
  const u = new URL(req.url, `http://${req.headers.host}`);
  logRequest(req, u);

  // use case 3 - /students?dept=CSE&minCgpa=8
  if (u.pathname === '/students') {
    const all = JSON.parse(await fsp.readFile('students.json', 'utf8'));
    const dept = u.searchParams.get('dept');
    const minCgpa = Number(u.searchParams.get('minCgpa') || 0);
    const result = all.filter(s => (!dept || s.dept === dept) && s.cgpa >= minCgpa);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(result, null, 2));
  }

  // use case 2 - /counter
  if (u.pathname === '/counter') {
    const n = countVisit(u.pathname);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    return res.end(`This page has been visited ${n} times`);
  }

  // use case 1 - serve files from the public folder
  const page = u.pathname === '/' ? 'index.html' : u.pathname.slice(1);
  const filePath = path.join(__dirname, 'public', path.basename(page));

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('404 - Page not found');
    }
    const type = types[path.extname(filePath)] || 'text/plain';
    res.writeHead(200, { 'Content-Type': type });
    res.end(content);
  });
});

server.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

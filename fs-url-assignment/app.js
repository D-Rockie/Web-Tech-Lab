// app.js - small scripts for the fs/url page

// ---------- URL breakdown tool ----------
const input = document.getElementById('urlInput');
const button = document.getElementById('parseBtn');
const output = document.getElementById('urlResult');

function showParts() {
  output.innerHTML = '';

  let link;
  try {
    link = new URL(input.value.trim());
  } catch (e) {
    output.innerHTML = '<p class="error">That is not a valid URL. Include http:// or https://</p>';
    return;
  }

  const parts = ['protocol', 'hostname', 'port', 'pathname', 'search', 'hash', 'origin'];

  let rows = '<tr><th>Property</th><th>Value</th></tr>';
  parts.forEach(p => {
    rows += `<tr><td>${p}</td><td>${escapeHtml(link[p]) || '<i>(empty)</i>'}</td></tr>`;
  });

  // query parameters listed one by one
  let paramRows = '';
  link.searchParams.forEach((value, key) => {
    paramRows += `<tr><td>${escapeHtml(key)}</td><td>${escapeHtml(value)}</td></tr>`;
  });

  output.innerHTML = `<table>${rows}</table>`;
  if (paramRows) {
    output.innerHTML += `<p><b>Query parameters:</b></p>
      <table><tr><th>Key</th><th>Value</th></tr>${paramRows}</table>`;
  }
}

// so that typed text doesn't get treated as HTML
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

button.addEventListener('click', showParts);
input.addEventListener('keydown', e => {
  if (e.key === 'Enter') showParts();
});
showParts(); // run once for the sample URL

// ---------- highlight current section in sidebar ----------
const links = document.querySelectorAll('.sidebar a');
const sections = document.querySelectorAll('main section');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  links.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });

  // back to top button
  document.getElementById('topBtn').style.display = window.scrollY > 500 ? 'block' : 'none';
});

document.getElementById('topBtn').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

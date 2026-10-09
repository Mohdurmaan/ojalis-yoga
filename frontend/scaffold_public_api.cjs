const fs = require('fs');
const path = require('path');
const srcDir = path.join(__dirname, 'src');

// 1. Create API Helper for Public
fs.writeFileSync(path.join(srcDir, 'utils', 'api.js'), `
export const API_URL = 'http://localhost:5000/api';
export const BASE_URL = 'http://localhost:5000';

export const fetchPublic = async (endpoint) => {
  try {
    const res = await fetch(\`\${API_URL}\${endpoint}\`);
    if (!res.ok) throw new Error('API Error');
    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  if (path.startsWith('/uploads')) return \`\${BASE_URL}\${path}\`;
  return path;
};
`);

console.log("Public API util created.");

const fs = require('fs');
const path = require('path');

const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.js') || file.endsWith('.jsx')) {
        results.push(file);
      }
    }
  });
  return results;
};

const files = walk(path.join(__dirname, 'src'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;
  if (content.includes('\\`')) {
    content = content.replace(/\\`/g, '`');
    changed = true;
  }
  if (content.includes('\\${')) {
    content = content.replace(/\\\${/g, '${');
    changed = true;
  }
  if (changed) {
    fs.writeFileSync(file, content);
    console.log('Fixed', file);
  }
});

console.log('Done fixing slashes.');

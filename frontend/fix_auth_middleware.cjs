const fs = require('fs');
const path = require('path');

const backendDir = 'e:\\\\ujalishyoga\\\\backend';
const routesPath = path.join(backendDir, 'routes', 'bookSessionRoutes.js');

let content = fs.readFileSync(routesPath, 'utf8');
content = content.replace("require('../middleware/auth')", "require('../middleware/authMiddleware')");
fs.writeFileSync(routesPath, content);
console.log('Fixed bookSessionRoutes.js');

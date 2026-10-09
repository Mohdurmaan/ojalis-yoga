const fs = require('fs');
const path = require('path');
const backendDir = 'e:\\\\ujalishyoga\\\\backend';

const createRoute = (name) => {
  const content = "const express = require('express');\n" +
  "const { getItems, getItem, createItem, updateItem, deleteItem } = require('../controllers/" + name + "Controller');\n" +
  "const { protect } = require('../middleware/authMiddleware');\n" +
  "const upload = require('../middleware/uploadMiddleware');\n\n" +
  "const router = express.Router();\n\n" +
  "router.route('/')\n" +
  "  .get(getItems)\n" +
  "  .post(protect, upload.single('image'), createItem);\n\n" +
  "router.route('/:id')\n" +
  "  .get(getItem)\n" +
  "  .put(protect, upload.single('image'), updateItem)\n" +
  "  .delete(protect, deleteItem);\n\n" +
  "module.exports = router;\n";
  fs.writeFileSync(path.join(backendDir, 'routes', name + 'Routes.js'), content);
};

createRoute('journal');
createRoute('studio');
createRoute('event');
createRoute('teacher');

const dashRouteContent = "const express = require('express');\n" +
"const { getDashboardStats } = require('../controllers/dashboardController');\n" +
"const { protect } = require('../middleware/authMiddleware');\n" +
"const router = express.Router();\n" +
"router.get('/', protect, getDashboardStats);\n" +
"module.exports = router;\n";
fs.writeFileSync(path.join(backendDir, 'routes', 'dashboardRoutes.js'), dashRouteContent);

const serverJsPath = path.join(backendDir, 'server.js');
let serverJsContent = fs.readFileSync(serverJsPath, 'utf8');

const routeImports = "\nconst journalRoutes = require('./routes/journalRoutes');\n" +
"const studioRoutes = require('./routes/studioRoutes');\n" +
"const eventRoutes = require('./routes/eventRoutes');\n" +
"const teacherRoutes = require('./routes/teacherRoutes');\n" +
"const dashboardRoutes = require('./routes/dashboardRoutes');\n";

const routeMounts = "\napp.use('/api/journals', journalRoutes);\n" +
"app.use('/api/admin/journals', journalRoutes);\n" +
"app.use('/api/studio', studioRoutes);\n" +
"app.use('/api/admin/studio', studioRoutes);\n" +
"app.use('/api/events', eventRoutes);\n" +
"app.use('/api/admin/events', eventRoutes);\n" +
"app.use('/api/teachers', teacherRoutes);\n" +
"app.use('/api/admin/teachers', teacherRoutes);\n" +
"app.use('/api/admin/dashboard', dashboardRoutes);\n";

if (!serverJsContent.includes('/api/journals')) {
  serverJsContent = serverJsContent.replace("const authRoutes = require('./routes/authRoutes');", "const authRoutes = require('./routes/authRoutes');" + routeImports);
  serverJsContent = serverJsContent.replace("app.use('/api/auth', authRoutes);", "app.use('/api/auth', authRoutes);" + routeMounts);
  fs.writeFileSync(serverJsPath, serverJsContent);
}

console.log('Routes scaffolded.');

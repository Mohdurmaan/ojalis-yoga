const fs = require('fs');
const path = require('path');

const backendDir = 'e:\\ujalishyoga\\backend';

// 5. Update server.js
const serverJsPath = path.join(backendDir, 'server.js');
let serverJsContent = fs.readFileSync(serverJsPath, 'utf8');

const routeImport = "const authRoutes = require('./routes/authRoutes');\n";
const routeMount = "\n// Mount routers\napp.use('/api/auth', authRoutes);\n";

if (!serverJsContent.includes('/api/auth')) {
  serverJsContent = serverJsContent.replace("const app = express();", routeImport + "const app = express();");
  serverJsContent = serverJsContent.replace("// Basic route for testing", routeMount + "\n// Basic route for testing");
  fs.writeFileSync(serverJsPath, serverJsContent);
}

// 6. createAdmin.js (safe initial admin creation script)
fs.writeFileSync(path.join(backendDir, 'createAdmin.js'),
`const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected.');

    const email = process.argv[2];
    const password = process.argv[3];

    if (!email || !password) {
      console.log('Usage: node createAdmin.js <email> <password>');
      process.exit(1);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists!');
      process.exit(1);
    }

    const user = await User.create({ email, password });
    console.log('Admin account created successfully:', user.email);
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();
`);

console.log("Phase 4 scaffolding complete.");

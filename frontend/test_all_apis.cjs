const http = require('http');

const testEndpoint = (path) => {
  return new Promise((resolve) => {
    http.get('http://localhost:5000' + path, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ path, status: res.statusCode, data }));
    }).on('error', (err) => resolve({ path, status: 500, error: err.message }));
  });
};

const runTests = async () => {
  console.log("Testing API Endpoints...");
  const endpoints = [
    '/',
    '/api/journals',
    '/api/studio',
    '/api/events',
    '/api/teachers'
  ];

  for (const ep of endpoints) {
    const result = await testEndpoint(ep);
    console.log("Endpoint " + result.path + " - Status: " + result.status);
    if (result.status !== 200) {
      console.log("Response:", result.data || result.error);
    }
  }
  process.exit(0);
};

runTests();

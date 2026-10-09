const http = require('http');

const testApi = () => {
  return new Promise((resolve) => {
    http.get('http://localhost:5000/', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', (err) => resolve(err.message));
  });
};

setTimeout(async () => {
  console.log("Testing API Server...");
  const result = await testApi();
  console.log("Result:", result);
  process.exit(0);
}, 2000);

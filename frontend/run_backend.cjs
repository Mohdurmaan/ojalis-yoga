const { spawn } = require('child_process');
const path = require('path');

const backendDir = 'e:\\\\ujalishyoga\\\\backend';

const child = spawn('node', ['server.js'], {
  cwd: backendDir,
  stdio: 'inherit',
  shell: true
});

child.on('error', (err) => {
  console.error('Failed to start backend:', err);
});

#!/usr/bin/env node

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Path to the MCP server
const serverPath = join(__dirname, 'dist', 'index.js');

// Spawn the MCP server process
const server = spawn('node', [serverPath], {
  stdio: ['pipe', 'pipe', 'pipe']
});

// Handle server output
server.stdout.on('data', (data) => {
  try {
    const responses = data.toString().trim().split('\n');
    for (const response of responses) {
      if (response) {
        const parsedResponse = JSON.parse(response);
        console.log('Response:', JSON.stringify(parsedResponse, null, 2));
      }
    }
  } catch (error) {
    console.error('Error parsing response:', error);
    console.error('Raw response:', data.toString());
  }
});

server.stderr.on('data', (data) => {
  console.error(`Server stderr: ${data}`);
});

// Send a request to the server
const request = {
  jsonrpc: '2.0',
  id: 1,
  method: 'tools/call',
  params: {
    name: 'get_current_time',
    arguments: {
      timezone: 'America/New_York'
    }
  }
};

// Write the request to the server's stdin
server.stdin.write(JSON.stringify(request) + '\n');

// Set a timeout to kill the server after 5 seconds
setTimeout(() => {
  console.log('Closing server...');
  server.kill();
  process.exit(0);
}, 5000);

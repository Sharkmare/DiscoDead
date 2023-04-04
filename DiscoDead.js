const fetch = require('node-fetch');
const path = require('path');
const fs = require('fs');

class Discodead {
  constructor(token) {
    this.token = token;
    this.baseURL = 'https://discord.com/api';

    // Load API modules from the ./modules directory
    this.modules = {};
    const moduleFiles = fs.readdirSync(path.join(__dirname, 'modules'));
    for (const moduleFile of moduleFiles) {
      const moduleName = moduleFile.replace('.js', '');
      const modulePath = path.join(__dirname, 'modules', moduleFile);
      const module = require(modulePath);
      this.modules[moduleName] = new module(this);
    }
  }

  async request(method, endpoint, body = null) {
    const url = `${this.baseURL}${endpoint}`;
    const headers = {
      Authorization: `Bot ${this.token}`,
      'Content-Type': 'application/json',
    };
    const options = {
      method,
      headers,
      body: JSON.stringify(body),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message);
    return data;
  }
}

module.exports = Discodead;

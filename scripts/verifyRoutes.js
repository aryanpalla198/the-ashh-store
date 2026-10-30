const http = require('http');

const urls = [
  'http://localhost:3000/',
  'http://localhost:3000/men',
  'http://localhost:3000/men?subCategory=shirts',
  'http://localhost:3000/men?subCategory=trousers',
  'http://localhost:3000/men?subCategory=shorts',
  'http://localhost:3000/men?subCategory=shoes-sneakers',
  'http://localhost:3000/women',
  'http://localhost:3000/collections',
  'http://localhost:3000/products/prod-031',
  'http://localhost:3000/products/prod-045'
];

async function checkUrl(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      console.log(`[STATUS ${res.statusCode}] ${url}`);
      resolve(res.statusCode);
    }).on('error', (err) => {
      console.error(`[ERROR] ${url}: ${err.message}`);
      resolve(0);
    });
  });
}

async function run() {
  for (const url of urls) {
    await checkUrl(url);
  }
}

run();

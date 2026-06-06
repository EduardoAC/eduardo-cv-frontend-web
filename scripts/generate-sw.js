const { readFileSync, writeFileSync } = require('fs');
const path = require('path');

const generateServiceWorker = () => {
  const templatePath = path.resolve(__dirname, '../service-worker/service-worker.template.js');
  const outputPath = path.resolve(__dirname, '../dist/service-worker.js');

  writeFileSync(outputPath, readFileSync(templatePath, 'utf8'));
  console.log('Generated cache-retirement service-worker.js');
};

generateServiceWorker();

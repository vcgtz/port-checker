#!/usr/bin/env node

import { styleText } from 'node:util';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Command } from 'commander';
import { isPortAvailable } from './helpers/net.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const packageJson = JSON.parse(readFileSync(join(__dirname, '../package.json'), 'utf-8'));

const program = new Command();

program
  .name('port-checker')
  .description('CLI app to check whether a port is available')
  .version(packageJson.version);

program.command('check')
  .description('Check if the passed port is available')
  .requiredOption('-p, --port <number>', 'port to check')
  .option('-h, --host <string>', 'host to check', 'localhost')
  .action(async (options: { port: string, host: string }) => {
    const port = parseInt(options.port, 10);

    if (isNaN(port)) {
      console.error(styleText('red', `➤ Error: Port must be a valid number`));
      process.exit(1);
    }

    if (port < 1 || port > 65535) {
      console.error(styleText('red', `➤ Error: Port must be between 1 and 65535`));
      process.exit(1);
    }

    const portMsg = styleText('yellow', port.toString());
    const hostMsg = styleText('yellow', options.host);
    const status = await isPortAvailable(port, options.host)
      ? styleText('green', 'available')
      : styleText('red', 'not available');

    const message = `➤ Port ${hostMsg}:${portMsg} is ${status}`;

    console.log(message);
    process.exit(0);
  });

program.parse();

#!/usr/bin/env node

import { styleText } from 'node:util';
import { Command } from 'commander';
import { isPortAvailable } from './helpers/net.js';

const program = new Command();

program
  .name('port-checker')
  .description('CLI app to check whether a port is available')
  .version('0.0.1');

program.command('check')
  .description('Check if the passed port is available')
  .argument('<number>', 'port to check', parseInt)
  .action(async (port: number) => {
    const portMsg = styleText('yellow', port.toString());
    const status = await isPortAvailable(port)
      ? styleText('green', 'available')
      : styleText('red', 'not available');

    const message = `➤ Port ${portMsg} is ${status}`;

    console.log(message);
  });

program.parse();

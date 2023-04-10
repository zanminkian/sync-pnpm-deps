#!/usr/bin/env node
const { Command } = require('commander')
const { check } = require('../dist/cli')

const program = new Command().name('sync-pnpm-deps')

program
  .command('check')
  .description('check monorepo\'s pnpm-lock.yaml file to ensure deps are the same in one app')
  .option('-d, --dir <path>', 'dir path to load `pnpm-lock.yaml`', '.')
  .option('-p, --prod', 'check production dependencies only and skip to check devDependencies')
  .action(check)

program.parse()

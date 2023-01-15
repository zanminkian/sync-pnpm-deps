#!/usr/bin/env node
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const { check } = require('../dist/cli')

yargs(hideBin(process.argv))
  .usage('sync-pnpm-deps <command> [options]')
  .strictCommands()
  .strictOptions()
  .demandCommand(1)
  .command({
    command: 'check [options]',
    describe: 'Check monorepo\'s pnpm-lock.yaml file. Ensure deps are the same in one app.',
    builder: y => y.option({
      dir: {
        alias: 'd',
        describe: 'Dir path to load `pnpm-lock.yaml`.',
        string: true,
        default: process.cwd(),
      },
      prod: {
        alias: 'p',
        describe: 'Check production dependencies only. If false, `devDependencies` and `dependencies` will be checked.',
        boolean: true,
        default: false,
      },
    }),
    handler: ({ prod, dir }) => {
      check({ prod, dir })
    },
  }).argv

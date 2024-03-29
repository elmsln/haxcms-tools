@haxcms/drupal-book-2-jos
=========================

Convert a Drupal Book XML export to JSON Outline Schema.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@haxcms/drupal-book-2-jos.svg)](https://npmjs.org/package/@haxcms/drupal-book-2-jos)
[![Downloads/week](https://img.shields.io/npm/dw/@haxcms/drupal-book-2-jos.svg)](https://npmjs.org/package/@haxcms/drupal-book-2-jos)
[![License](https://img.shields.io/npm/l/@haxcms/drupal-book-2-jos.svg)](https://github.com/elmsln/haxcms-tools/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @haxcms/migrate-drupal
$ migrate-drupal COMMAND
running command...
$ migrate-drupal (-v|--version|version)
@haxcms/migrate-drupal/0.0.14 linux-x64 node-v14.16.1
$ migrate-drupal --help [COMMAND]
USAGE
  $ migrate-drupal COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`migrate-drupal help [COMMAND]`](#migrate-drupal-help-command)
* [`migrate-drupal run`](#migrate-drupal-run)

## `migrate-drupal help [COMMAND]`

display help for migrate-drupal

```
USAGE
  $ migrate-drupal help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_

## `migrate-drupal run`

Convert a Drupal Book XML export to JSON Outline Schema.

```
USAGE
  $ migrate-drupal run

OPTIONS
  -d, --dest=dest  [default: ./] Destination of the JOS location.
  -s, --src=src    (required) Source of the drupal book xml file.
```

_See code: [src/commands/run.js](https://github.com/elmsln/haxcms-tools/blob/v0.0.14/src/commands/run.js)_
<!-- commandsstop -->

@haxcms/swarm-boilerplate
=========================

Boilerplate files for swarm deployment.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@haxcms/swarm-boilerplate.svg)](https://npmjs.org/package/@haxcms/swarm-boilerplate)
[![Downloads/week](https://img.shields.io/npm/dw/@haxcms/swarm-boilerplate.svg)](https://npmjs.org/package/@haxcms/swarm-boilerplate)
[![License](https://img.shields.io/npm/l/@haxcms/swarm-boilerplate.svg)](https://github.com/elmsln/haxcms-tools/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @haxcms/generators
$ haxcms-generators COMMAND
running command...
$ haxcms-generators (-v|--version|version)
@haxcms/generators/0.0.5 darwin-x64 node-v12.13.0
$ haxcms-generators --help [COMMAND]
USAGE
  $ haxcms-generators COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`haxcms-generators help [COMMAND]`](#haxcms-generators-help-command)
* [`haxcms-generators swarm`](#haxcms-generators-swarm)
* [`haxcms-generators upgrade-browser`](#haxcms-generators-upgrade-browser)

## `haxcms-generators help [COMMAND]`

display help for haxcms-generators

```
USAGE
  $ haxcms-generators help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.6/src/commands/help.ts)_

## `haxcms-generators swarm`

Describe the command here

```
USAGE
  $ haxcms-generators swarm

OPTIONS
  -n, --name=name  (required) machine name of the HAXcms site.
  -n, --port=port  (required) [default: 80] port of the traefik container
```

_See code: [src/commands/swarm.js](https://github.com/elmsln/haxcms-tools/blob/v0.0.5/src/commands/swarm.js)_

## `haxcms-generators upgrade-browser`

Display an upgrade your browser message to those that do not support web components

```
USAGE
  $ haxcms-generators upgrade-browser

OPTIONS
  -n, --name=name  (required) machine name of the HAXcms site.
```

_See code: [src/commands/upgrade-browser.js](https://github.com/elmsln/haxcms-tools/blob/v0.0.5/src/commands/upgrade-browser.js)_
<!-- commandsstop -->

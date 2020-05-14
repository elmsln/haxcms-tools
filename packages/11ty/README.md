@hax-tools/server
=================

Node server for HAXcms sites.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@hax-tools/server.svg)](https://npmjs.org/package/@hax-tools/server)
[![Downloads/week](https://img.shields.io/npm/dw/@hax-tools/server.svg)](https://npmjs.org/package/@hax-tools/server)
[![License](https://img.shields.io/npm/l/@hax-tools/server.svg)](https://github.com/elmsln/hax-tools/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @haxcms/11ty
$ haxcms-server COMMAND
running command...
$ haxcms-server (-v|--version|version)
@haxcms/11ty/0.0.12 darwin-x64 node-v12.13.0
$ haxcms-server --help [COMMAND]
USAGE
  $ haxcms-server COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`haxcms-server build`](#haxcms-server-build)
* [`haxcms-server help [COMMAND]`](#haxcms-server-help-command)
* [`haxcms-server serve`](#haxcms-server-serve)

## `haxcms-server build`

Create a build.

```
USAGE
  $ haxcms-server build
```

_See code: [src/commands/build.js](https://github.com/elmsln/hax-tools/blob/v0.0.12/src/commands/build.js)_

## `haxcms-server help [COMMAND]`

display help for haxcms-server

```
USAGE
  $ haxcms-server help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.6/src/commands/help.ts)_

## `haxcms-server serve`

Start the server.

```
USAGE
  $ haxcms-server serve
```

_See code: [src/commands/serve.js](https://github.com/elmsln/hax-tools/blob/v0.0.12/src/commands/serve.js)_
<!-- commandsstop -->

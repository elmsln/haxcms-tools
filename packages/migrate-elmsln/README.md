@haxcms/migrate-elmsln
======================

Migrate ELMSLN content to HAXcms.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@haxcms/migrate-elmsln.svg)](https://npmjs.org/package/@haxcms/migrate-elmsln)
[![Downloads/week](https://img.shields.io/npm/dw/@haxcms/migrate-elmsln.svg)](https://npmjs.org/package/@haxcms/migrate-elmsln)
[![License](https://img.shields.io/npm/l/@haxcms/migrate-elmsln.svg)](https://github.com/elmsln/haxcms-tools/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @haxcms/migrate-elmsln
$ migrate-elmsln COMMAND
running command...
$ migrate-elmsln (-v|--version|version)
@haxcms/migrate-elmsln/0.0.13 darwin-x64 node-v12.13.0
$ migrate-elmsln --help [COMMAND]
USAGE
  $ migrate-elmsln COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`migrate-elmsln help [COMMAND]`](#migrate-elmsln-help-command)
* [`migrate-elmsln run`](#migrate-elmsln-run)

## `migrate-elmsln help [COMMAND]`

display help for migrate-elmsln

```
USAGE
  $ migrate-elmsln help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.6/src/commands/help.ts)_

## `migrate-elmsln run`

Convert ELMSLN content to HAXcms.

```
USAGE
  $ migrate-elmsln run

OPTIONS
  -h, --help                       show CLI help
  -i, --images                     convert images defined in img tags to local assets.
  -j, --jos=jos                    (required) location of site.json file.
  -s, --skipDownload               skip downloading assets using puppeteer.
  -t, --tokens                     convert tokens defined in img tags to local assets.
  -u, --url=url                    url of the ELMS site that contains the assets.
  -v, --version                    show CLI version
  --imagesAttrName=imagesAttrName  [default: src] specify image attribute. Required if images option is set.
  --imagesTagName=imagesTagName    [default: img] specify image tag. Required if images option is set.
```

_See code: [src/commands/run.js](https://github.com/elmsln/haxcms-tools/blob/v0.0.13/src/commands/run.js)_
<!-- commandsstop -->

@haxcms/migrate-gitbook
=======================

Migrate a Gitbook site to HAXcms.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/@haxcms/migrate-gitbook.svg)](https://npmjs.org/package/@haxcms/migrate-gitbook)
[![Downloads/week](https://img.shields.io/npm/dw/@haxcms/migrate-gitbook.svg)](https://npmjs.org/package/@haxcms/migrate-gitbook)
[![License](https://img.shields.io/npm/l/@haxcms/migrate-gitbook.svg)](https://github.com/[object Object]/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g @haxcms/migrate-gitbook
$ migrate-gitbook COMMAND
running command...
$ migrate-gitbook (-v|--version|version)
@haxcms/migrate-gitbook/0.0.13 darwin-x64 node-v12.13.0
$ migrate-gitbook --help [COMMAND]
USAGE
  $ migrate-gitbook COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`migrate-gitbook help [COMMAND]`](#migrate-gitbook-help-command)
* [`migrate-gitbook plugins`](#migrate-gitbook-plugins)
* [`migrate-gitbook plugins:install PLUGIN...`](#migrate-gitbook-pluginsinstall-plugin)
* [`migrate-gitbook plugins:link PLUGIN`](#migrate-gitbook-pluginslink-plugin)
* [`migrate-gitbook plugins:uninstall PLUGIN...`](#migrate-gitbook-pluginsuninstall-plugin)
* [`migrate-gitbook plugins:update`](#migrate-gitbook-pluginsupdate)
* [`migrate-gitbook run SUMMARYFILE`](#migrate-gitbook-run-summaryfile)

## `migrate-gitbook help [COMMAND]`

display help for migrate-gitbook

```
USAGE
  $ migrate-gitbook help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.1.6/src/commands/help.ts)_

## `migrate-gitbook plugins`

list installed plugins

```
USAGE
  $ migrate-gitbook plugins

OPTIONS
  --core  show core plugins

EXAMPLE
  $ migrate-gitbook plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.7.7/src/commands/plugins/index.ts)_

## `migrate-gitbook plugins:install PLUGIN...`

installs a plugin into the CLI

```
USAGE
  $ migrate-gitbook plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  plugin to install

OPTIONS
  -f, --force    yarn install with force flag
  -h, --help     show CLI help
  -v, --verbose

DESCRIPTION
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command 
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in 
  the CLI without the need to patch and update the whole CLI.

ALIASES
  $ migrate-gitbook plugins:add

EXAMPLES
  $ migrate-gitbook plugins:install myplugin 
  $ migrate-gitbook plugins:install https://github.com/someuser/someplugin
  $ migrate-gitbook plugins:install someuser/someplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.7.7/src/commands/plugins/install.ts)_

## `migrate-gitbook plugins:link PLUGIN`

links a plugin into the CLI for development

```
USAGE
  $ migrate-gitbook plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

OPTIONS
  -h, --help     show CLI help
  -v, --verbose

DESCRIPTION
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello' 
  command will override the user-installed or core plugin implementation. This is useful for development work.

EXAMPLE
  $ migrate-gitbook plugins:link myplugin
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.7.7/src/commands/plugins/link.ts)_

## `migrate-gitbook plugins:uninstall PLUGIN...`

removes a plugin from the CLI

```
USAGE
  $ migrate-gitbook plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

OPTIONS
  -h, --help     show CLI help
  -v, --verbose

ALIASES
  $ migrate-gitbook plugins:unlink
  $ migrate-gitbook plugins:remove
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.7.7/src/commands/plugins/uninstall.ts)_

## `migrate-gitbook plugins:update`

update installed plugins

```
USAGE
  $ migrate-gitbook plugins:update

OPTIONS
  -h, --help     show CLI help
  -v, --verbose
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v1.7.7/src/commands/plugins/update.ts)_

## `migrate-gitbook run SUMMARYFILE`

Describe the command here

```
USAGE
  $ migrate-gitbook run SUMMARYFILE

ARGUMENTS
  SUMMARYFILE  summary.md gitbook file

OPTIONS
  -d, --destination=destination  [default: ./] destination directory.
  -h, --help                     show CLI help
  -v, --version                  show CLI version
```

_See code: [src/commands/run.js](https://github.com/elmsln/haxcms-tools/blob/v0.0.13/src/commands/run.js)_
<!-- commandsstop -->

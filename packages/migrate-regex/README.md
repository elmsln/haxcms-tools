@haxcms/migrate-regex
=====================

# Install
<!-- usage -->
```sh-session
$ npm install -g @haxcms/migrate-regex
$ migrate-regex COMMAND
running command...
$ migrate-regex (-v|--version|version)
@haxcms/migrate-regex/0.0.9 darwin-x64 node-v12.13.0
$ migrate-regex --help [COMMAND]
USAGE
  $ migrate-regex COMMAND
...
```
<!-- usagestop -->
```sh-session
$ npm install -g @haxcms/migrate-regex
$ migrate-regex COMMAND
running command...
$ migrate-regex (-v|--version|version)
@haxcms/migrate-regex/0.0.0 darwin-x64 node-v10.12.0
$ migrate-regex --help [COMMAND]
USAGE
  $ migrate-regex COMMAND
...
```

# Usage

## Define patterns and replacements

In your HAXcms site, create a file called `migrate.json`.  By default `migrate-regex` will assume this file is a sibling of `site.json`.

Define your patterns in the `regex` property. Example:

```json
{
  "regex": [
    {
      "pattern": "&lt;",
      "replacement": "<"
    },
    {
      "pattern": "&gt;",
      "replacement": ">"
    },
    {
      "pattern": "&quot;",
      "replacement": "\""
    },
    {
      "pattern": "(\\$\\$(?:(?!\\$\\$)[\\s\\S])*?)(<\/?em>)([\\s\\S]*?\\$\\$)",
      "replacement": "$1_$3"
    },
    {
      "pattern": "(\\$\\$)([^\\$\\$]*)(\\$\\$)",
      "replacement": "<lrn-math>$2</lrn-math>"
    }
  ]
}
```

## Run regex migration

```sh-sessionh
$ migrate-regex run -j site.json
```

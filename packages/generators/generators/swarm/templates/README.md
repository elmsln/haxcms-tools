# <%= name %>

## Development

Start Development Servers

```bash
docker-compose -f docker-compose.yml -f docker-compose-dev.yml up --build
```

Visit http://<%= name %>.docker.locahost

Stop Development Servers

```bash
docker-compose -f docker-compose.yml -f docker-compose-dev.yml down -v --remove-orphans
```
# Port Checker

A simple CLI tool to check if a port is available on localhost.

## Usage

```bash
npx @vcgtz/port-checker check --port <port>
```

## Examples

```bash
npx @vcgtz/port-checker check --port 5173
# Port 5173 is not available

npx @vcgtz/port-checker check --port 8080 --host 127.0.0.1
# Port 8080 is available
```

## License

MIT

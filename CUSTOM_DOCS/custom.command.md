

```sh
# mock
node_modules/.bin/pm2 start ./node_modules/.bin/ts-node tools/mockAPI/index.ts --name=\"mock.start\"

start npm --name="serve.e2e" -- run serve.e2e
```
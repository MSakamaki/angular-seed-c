

## 開発で使うコマンド

### プロセス系

```sh
# 開発用サービス全立ち上げ
npm run dev.start
# 開発用プロセス系全停止
npm run pm2.kill

# mockサーバー立ち上げ
npm run mock.start
# mockサーバー一時停止
npm run mock.stop

# 開発用chrome (https://localhost:5555に対する認証あり)起動
# MAC用
npm run chrome.start
# 開発用chromeの停止
npm run chrome.stop


```
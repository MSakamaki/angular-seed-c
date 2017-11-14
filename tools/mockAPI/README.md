# MockAPIメモ


## 登録のしかた

 1. 以下2つのファイルを作成する。

 + `./impliment`フォルダにAPI処理の実体
 + `./_fixutre`フォルダに初期ロードサれるデータ;

2. `./index.ts`へ上で作成した`./impliment`ファイルを登録する。

## _fixture について

#### ルール

 + API_KEY
  + `index.ts`にて`uril.create()`または`uril.createOpeApi()`を利用して登録するAPI名
  + `createOpeApi()`を利用して登録した場合`API_KEY`は`ope.xxxxx`の用に登録される。
 + API_NAME
  + ダミーログイン画面に表示される日本語名称
 + data
  + mock初期ロード時に設定されるデータ

```json
{
  "API_KEY":"sample",
  "API_NAME": "サンプルAPI",
  "data": [{
    "one": 1,
    "tow": 2
  },{
    "one": 100,
    "tow": 200
  }]
}
```

### 複雑なAPI (/xxx/:xID/yyyy/:yID)

基本ルールとして、IDは`:xxxx`の形式で書く
対応するURLのRegExpは`:*[a-z]+`のように書いておく。



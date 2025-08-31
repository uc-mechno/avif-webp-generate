# avifとwebpを生成するリポジトリ
gulpを使ってavifとwebpを生成します。
## ディレクトリ
```
.
├── .gitignore
├── README.md
├── images
├── gulpfile.js
└── package.json
```
- `.editorconfig` EditorConfigの設定ファイル
- `.gitignore`    gitの除外ファイル
- `README.md`     説明などを記載
- `images`        この中に該当する画像を格納する
- `gulpfile.js`   gulpの設定ファイル
- `package.json`  パッケージが記載されたファイル

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

## 使用方法
<span style="color:red;">※</span> 開発は、`package.json`が配置してあるルートディレクトリにて行います。  
その他のディレクトリだと、gulpが動作しないので注意してください。
<br>

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

## 各パッケージのインストール
```
npm install
```
package.jsonで設定されている各パッケージをローカルにインストールします。<br>
`node_modules`が作成されます。

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

## 基本的なコマンド・スクリプト
```
npx gulp generate
```
処理を実行します。

```
npx gulp watch
```
imagesフォルダを監視。<br>
追加されたら自動で処理が走ります。

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

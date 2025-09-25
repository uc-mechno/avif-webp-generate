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
npm run generate
```
画像変換を実行します（`images/dummy.jpg` → `images/dummy.jpg.webp`, `images/dummy.jpg.avif`）。

```
npm run watch
```
`images` フォルダを監視し、追加/更新されたら自動で変換します。

### 出力された画像の用途

画像の拡張子は.jpg.webpと.jpg.avifになります（jpgの場合）  
そのまま使っていただいても構いませんが、.htaccessで出し分けることも可能です。
```
<IfModule mod_rewrite.c>
  RewriteEngine On

  # --- AVIF対応なら ---
  RewriteCond %{HTTP_ACCEPT} image/avif
  RewriteCond %{REQUEST_FILENAME}.avif -f
  RewriteRule (.+)\.(jpe?g|png|gif)$ $1.$2.avif [T=image/avif,E=accept:1]

  # --- WebP対応なら ---
  RewriteCond %{HTTP_ACCEPT} image/webp
  RewriteCond %{REQUEST_FILENAME}.webp -f
  RewriteRule (.+)\.(jpe?g|png|gif)$ $1.$2.webp [T=image/webp,E=accept:1]
</IfModule>

<IfModule mod_headers.c>
  # キャッシュ対策
  Header append Vary Accept env=REDIRECT_accept
</IfModule>

```

### 対応環境
- Node.js 18 以上

### 変更点
- Node.js16まで → Node.js18以上。
- 画像変換を `gulp-libsquoosh` から `sharp` に。

-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --

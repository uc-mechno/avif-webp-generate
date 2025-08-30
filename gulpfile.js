// パッケージの読み込み
const { src, dest, watch } = require('gulp');
const squoosh = require('gulp-libsquoosh');
const rename = require('gulp-rename');

// パスの設定
const srcPath = { images: 'images/**/*.+(jpg|jpeg|png)', };
const destPath = { images: 'images', };

// webp と avif への変換
function generateTask() {
  return src(srcPath.images)
  .pipe(rename((path) => {
    path.basename += path.extname;
  }))
  // オプションの設定
  // 使わないフォーマットは削除
  .pipe(squoosh({
    encodeOptions: {
      webp: {
        quality: 90,
      },
      avif: {
        quality: 90,
      }
    }
  }))
  .pipe(dest(destPath.images));
}

// ファイルの監視
function watchTask() {
  watch(srcPath.images, generateTask);
}

// タスクのエクスポート
exports.generate = generateTask;
exports.watch = watchTask;

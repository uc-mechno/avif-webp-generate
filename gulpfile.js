// パッケージの読み込み
const { watch } = require('gulp');
const path = require('path');
const fs = require('node:fs/promises');
const sharp = require('sharp');

// パスの設定
const srcPath = { images: 'images/**/*.+(jpg|jpeg|png)', };
const destPath = { images: 'images', };

// ユーティリティ: 画像の再帰探索
const targetExts = new Set(['.jpg', '.jpeg', '.png']);
async function listImagesRecursive(dir) {
  const out = [];
  async function walk(d) {
    const entries = await fs.readdir(d, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(d, e.name);
      if (e.isDirectory()) {
        await walk(full);
      } else {
        const ext = path.extname(e.name).toLowerCase();
        if (targetExts.has(ext)) out.push(full);
      }
    }
  }
  await walk(dir);
  return out;
}

async function convertOne(srcFile, quality = 90) {
  const dir = path.dirname(srcFile);
  const base = path.basename(srcFile); // 例: dummy.jpg
  const outWebp = path.join(dir, `${base}.webp`);
  const outAvif = path.join(dir, `${base}.avif`);
  const input = sharp(srcFile, { failOn: 'none' });
  await input.clone().webp({ quality }).toFile(outWebp);
  await input.clone().avif({ quality }).toFile(outAvif);
}

// webp と avif への変換
function generateTask(cb) {
  (async () => {
    const imgRoot = path.resolve('images');
    let files = [];
    try {
      files = await listImagesRecursive(imgRoot);
    } catch (e) {
      // images ディレクトリがない場合など
      console.error(e.message);
      files = [];
    }
    if (files.length === 0) {
      console.log('No images found.');
      return;
    }
    console.log(`Converting ${files.length} file(s)...`);
    for (const f of files) {
      try {
        await convertOne(f, 90);
        console.log('✓', path.relative(imgRoot, f));
      } catch (err) {
        console.error('✗', path.relative(imgRoot, f), err.message);
      }
    }
  })()
  .then(() => cb())
  .catch((err) => cb(err));
}

// ファイルの監視
function watchTask() {
  watch(srcPath.images, generateTask);
}

// タスクのエクスポート
exports.generate = generateTask;
exports.watch = watchTask;

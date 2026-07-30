import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const publicDir = path.join(rootDir, 'public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const targetFolderName = 'ezgif-455a6afff32bca01-png-split';
const srcPath = path.join(rootDir, targetFolderName);
const destPath = path.join(publicDir, targetFolderName);

if (fs.existsSync(srcPath)) {
  if (!fs.existsSync(destPath)) {
    fs.cpSync(srcPath, destPath, { recursive: true });
    console.log(`Successfully copied ${targetFolderName} into public/`);
  }
}

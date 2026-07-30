import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const publicDir = path.join(rootDir, 'public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const items = fs.readdirSync(rootDir);
items.forEach(item => {
  if (item.startsWith('ezgif-') && item.endsWith('-png-split')) {
    const srcPath = path.join(rootDir, item);
    const destPath = path.join(publicDir, item);
    
    if (fs.statSync(srcPath).isDirectory()) {
      if (!fs.existsSync(destPath)) {
        fs.cpSync(srcPath, destPath, { recursive: true });
        console.log(`Copied ${item} into public/${item}`);
      }
    }
  }
});

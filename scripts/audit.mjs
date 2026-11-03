import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const files = fs.readdirSync('assets');
const report = [];

for (const file of files) {
  const filePath = path.join('assets', file);
  const stat = fs.statSync(filePath);
  const buffer = fs.readFileSync(filePath);
  const hash = crypto.createHash('md5').update(buffer).digest('hex');
  
  let dims = null;
  if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
    let offset = 2;
    try {
      while (offset < buffer.length - 8) {
        if (buffer[offset] === 0xFF && (buffer[offset + 1] >= 0xC0 && buffer[offset + 1] <= 0xC3)) {
          const height = buffer.readUInt16BE(offset + 5);
          const width = buffer.readUInt16BE(offset + 7);
          dims = `${width}x${height}`;
          break;
        }
        if (buffer[offset] === 0xFF && buffer[offset + 1] === 0xD9) break; // EOI
        const len = buffer.readUInt16BE(offset + 2);
        offset += 2 + len;
      }
    } catch (e) {
      dims = 'parse-err';
    }
  }
  
  report.push({
    name: file,
    sizeMB: (stat.size / (1024 * 1024)).toFixed(2),
    sizeBytes: stat.size,
    hash: hash.substring(0, 16),
    dims: dims || (file.endsWith('.mp4') ? 'video' : 'unknown')
  });
}

fs.writeFileSync('scripts/asset-audit.json', JSON.stringify(report, null, 2));
console.log(`Audited ${report.length} files. Output saved to scripts/asset-audit.json`);


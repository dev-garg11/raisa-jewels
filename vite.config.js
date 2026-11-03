import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function assetsPlugin() {
  return {
    name: 'assets-sync-plugin',
    // Dev server middleware: serves static files directly from ./assets/
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const decodedUrl = decodeURIComponent(req.url.split('?')[0]);
        const match = decodedUrl.match(/^\/?assets\/(.+)$/);
        if (match) {
          const filePath = path.join(__dirname, 'assets', match[1]);
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            const ext = path.extname(filePath).toLowerCase();
            const mimeTypes = {
              '.jpg': 'image/jpeg',
              '.jpeg': 'image/jpeg',
              '.png': 'image/png',
              '.webp': 'image/webp',
              '.mp4': 'video/mp4',
              '.json': 'application/json',
              '.svg': 'image/svg+xml'
            };
            res.setHeader('Content-Type', mimeTypes[ext] || 'application/octet-stream');
            return fs.createReadStream(filePath).pipe(res);
          }
        }
        next();
      });
    },
    // Production build hook: copies all assets from ./assets into ./dist/assets/
    closeBundle() {
      const srcDir = path.resolve(__dirname, 'assets');
      const destDir = path.resolve(__dirname, 'dist', 'assets');
      if (fs.existsSync(srcDir)) {
        if (!fs.existsSync(destDir)) {
          fs.mkdirSync(destDir, { recursive: true });
        }
        const files = fs.readdirSync(srcDir);
        let count = 0;
        for (const file of files) {
          const srcFile = path.join(srcDir, file);
          const destFile = path.join(destDir, file);
          if (fs.statSync(srcFile).isFile()) {
            fs.copyFileSync(srcFile, destFile);
            count++;
          }
        }
        console.log(`[assets-sync-plugin] Successfully copied ${count} asset files to dist/assets/`);
      }
    }
  };
}

export default defineConfig({
  plugins: [react(), assetsPlugin()],
  base: './', // Relative base path ensures assets load on GitHub Pages sub-paths, Vercel, Netlify, and local files
});

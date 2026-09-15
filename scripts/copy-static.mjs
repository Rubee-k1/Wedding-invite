// Builds the deployable site: the invite is plain HTML, so "building" is just
// copying index.html and the photos into dist/. No bundler, no dependencies.
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')), '..');
const dist = path.join(root, 'dist');

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

for (const item of ['index.html', 'assets']) {
  fs.cpSync(path.join(root, item), path.join(dist, item), { recursive: true });
}

const count = fs.readdirSync(path.join(dist, 'assets')).length;
console.log(`Copied index.html and ${count} asset files to dist/`);

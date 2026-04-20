import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';

function sanitizeFilename(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9.\-_]+/g, '-');
}

export async function saveUploadedFile(file: File | null, folder = 'uploads') {
  if (!file || file.size === 0) {
    return '';
  }

  const extension = path.extname(file.name) || '.bin';
  const baseName = path.basename(file.name, extension);
  const finalName = `${sanitizeFilename(baseName)}-${randomUUID()}${extension}`;
  const outputDir = path.join(process.cwd(), 'public', folder);
  const outputPath = path.join(outputDir, finalName);
  const buffer = Buffer.from(await file.arrayBuffer());

  await mkdir(outputDir, { recursive: true });
  await writeFile(outputPath, buffer);

  return `/${folder}/${finalName}`;
}

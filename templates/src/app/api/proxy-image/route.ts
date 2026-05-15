import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const EXPORTS_ROOT = path.resolve(process.cwd(), '..', 'exports');

function resolveExportPath(imagePath: string) {
  if (imagePath.includes('\0')) return null;

  const cleanedPath = imagePath
    .replace(/^[/\\]+/, '')
    .replace(/^exports[/\\]+/, '');
  const fullPath = path.resolve(EXPORTS_ROOT, cleanedPath);
  const relativePath = path.relative(EXPORTS_ROOT, fullPath);

  if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
    return null;
  }

  return fullPath;
}

function contentTypeFor(filePath: string) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
  if (ext === '.webp') return 'image/webp';
  return 'image/png';
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const imagePath = searchParams.get('path');

  if (!imagePath) {
    return NextResponse.json({ error: 'Path is required' }, { status: 400 });
  }

  // 1. Handle Cloud URLs (Redirect if it's already a full URL)
  try {
    const url = new URL(imagePath);
    if (url.protocol === 'http:' || url.protocol === 'https:') {
      return NextResponse.redirect(url);
    }
  } catch {
    // Not a URL; continue with local export resolution.
  }

  const fullPath = resolveExportPath(imagePath);
  if (!fullPath) {
    return NextResponse.json({ error: 'Access denied' }, { status: 403 });
  }

  if (!fs.existsSync(fullPath)) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 });
  }

  try {
    const fileBuffer = fs.readFileSync(fullPath);
    
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': contentTypeFor(fullPath),
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load image' }, { status: 500 });
  }
}

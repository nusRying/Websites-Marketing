import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const STATUS_FILE = path.join(process.cwd(), 'src', 'data', 'system_status.json');

export async function GET() {
  try {
    if (!fs.existsSync(STATUS_FILE)) {
      return NextResponse.json({ 
        services: {
          scraper: { status: 'OFFLINE', label: 'G-Maps Scraper' },
          watcher: { status: 'OFFLINE', label: 'Pipeline Watcher' },
          enrichment: { status: 'OFFLINE', label: 'AI Enrichment' }
        }
      });
    }

    const data = JSON.parse(fs.readFileSync(STATUS_FILE, 'utf8'));
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch status' }, { status: 500 });
  }
}

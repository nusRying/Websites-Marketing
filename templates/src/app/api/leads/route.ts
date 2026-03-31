import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import * as XLSX from 'xlsx';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const fileParam = searchParams.get('file');

  // Path to the exports directory at the root of the project
  const exportsDir = path.join(process.cwd(), '..', 'exports');

  try {
    // 1. If no file requested, return list of available files
    if (!fileParam) {
      if (!fs.existsSync(exportsDir)) {
        return NextResponse.json({ files: [] });
      }
      const files = fs.readdirSync(exportsDir)
        .filter(f => f.endsWith('.xlsx') && !f.startsWith('target_business_niches'))
        .map(f => ({
          name: f,
          date: fs.statSync(path.join(exportsDir, f)).mtime
        }))
        .sort((a, b) => b.date.getTime() - a.date.getTime());

      return NextResponse.json({ files });
    }

    // 2. If specific file requested, parse and return data
    const filePath = path.join(exportsDir, fileParam);
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet);

    return NextResponse.json({ leads: data });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

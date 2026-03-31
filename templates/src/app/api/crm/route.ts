import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'crm_states.json');

// Ensure data file exists
function ensureDataFile() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({}));
  }
}

export async function GET() {
  ensureDataFile();
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load CRM data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  ensureDataFile();
  try {
    const { leadId, status, notes, history } = await request.json();
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    
    data[leadId] = {
      ...data[leadId],
      status: status || data[leadId]?.status || 'NEW',
      notes: notes !== undefined ? notes : (data[leadId]?.notes || ''),
      history: history || data[leadId]?.history || [],
      updatedAt: new Date().toISOString()
    };

    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    return NextResponse.json({ success: true, entry: data[leadId] });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update CRM data' }, { status: 500 });
  }
}

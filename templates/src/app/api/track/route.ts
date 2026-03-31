import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'crm_states.json');

export async function POST(request: Request) {
  try {
    const { leadId, name, location } = await request.json();
    const userAgent = request.headers.get('user-agent') || 'unknown';
    
    if (!leadId) {
      return NextResponse.json({ error: 'Lead ID required' }, { status: 400 });
    }

    // 1. Log to CRM Data
    if (fs.existsSync(DATA_FILE)) {
      const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
      
      if (!data[leadId]) {
        data[leadId] = { status: 'NEW', notes: '', history: [] };
      }
      
      const visitEntry = {
        type: 'VIEW',
        timestamp: new Date().toISOString(),
        userAgent
      };
      
      if (!data[leadId].history) data[leadId].history = [];
      data[leadId].history.push(visitEntry);
      
      // Also update status if it was NEW or PITCH READY
      if (data[leadId].status === 'NEW' || data[leadId].status === 'PITCH READY') {
        data[leadId].status = 'INTERESTED';
      }

      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    }

    // 2. Trigger Slack Alert (Mocked for now, calling internal trigger)
    console.log(`🔥 LEAD VIEWING: ${name} from ${location} is on their site!`);
    // Future: trigger src/slack_alerts.py via a system call or webhook

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Tracking Error:', error);
    return NextResponse.json({ error: 'Failed to track' }, { status: 500 });
  }
}

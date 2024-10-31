// app/api/auth/teams/create/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Team from '@/models/Team';

export async function POST(req: NextRequest) {
  await connectToDatabase();
  
  const { name, creatorId } = await req.json(); // Use req.json() to parse JSON

  if (!name || !creatorId) {
    return NextResponse.json({ error: 'Name and creator ID are required' }, { status: 400 });
  }

  try {
    const newTeam = await Team.create({ 
      teamId: `team-${Date.now()}`, 
      name, 
      members: [creatorId] 
    });
    return NextResponse.json(newTeam, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create team' }, { status: 500 });
  }
}

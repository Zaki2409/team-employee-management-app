// app/api/auth/teams/create/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Team from '@/models/Team';

export async function POST(req: NextRequest) {
  await connectToDatabase();
  
  const { name, creatorId } = await req.json(); // Parse JSON from request body

  // Validate input
  if (!name || !creatorId) {
    return NextResponse.json({ error: 'Name and creator ID are required' }, { status: 400 });
  }

  try {
    // Create a new team with the actual user ID as a member
    const newTeam = await Team.create({ 
      teamId: `${Date.now()}`, 
      name, 
      members: [creatorId] // Use actual creator ID here
    });
    
    return NextResponse.json(newTeam, { status: 201 }); // Return the created team
  } catch (error) {
    console.error('Error creating team:', error); // Log the error
    return NextResponse.json({ error: 'Failed to create team' }, { status: 500 });
  }
}

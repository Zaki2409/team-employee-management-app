// app/api/auth/teams/[teamId]/members/route.ts

import { NextResponse } from 'next/server'; 
import { connectToDatabase } from '@/lib/mongodb';
import Team, { ITeam } from '@/models/Team'; // Import the ITeam interface

export async function GET(req: Request, { params }: { params: { teamId: string } }) {
  await connectToDatabase(); // Ensure successful connection to the database

  try {
    const { teamId } = await params;

    // Find the team by `teamId`
    const team = await Team.findOne({ teamId }).lean() as ITeam | null; // Cast the result

    // Check if the team exists
    if (!team) {
      return NextResponse.json({ error: 'Team not found' }, { status: 404 });
    }

    // Return only the members array
    return NextResponse.json(team.members); // Return only the members array
  } catch (error) {
    console.error('Database fetch error:', error); // Log any errors
    return NextResponse.json({ error: 'Failed to fetch team' }, { status: 500 });
  }
}

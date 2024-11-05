// app/api/auth/teams/route.ts

import { NextResponse } from 'next/server'; // Import NextResponse
import { connectToDatabase } from '@/lib/mongodb';
import Team from '@/models/Team';

export async function GET(req: Request) {
  await connectToDatabase(); // Ensure this connects successfully

  try {
    const teams = await Team.find({}); // Fetch teams from the database
    console.log(teams);
    return NextResponse.json(teams); // Return the teams in JSON format
  } catch (error) {
    console.error('Database fetch error:', error); // Log the error
    return NextResponse.json({ error: 'Failed to fetch teams' }, { status: 500 });
  }
}

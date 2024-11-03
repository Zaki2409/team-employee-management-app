import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Team from '@/models/Team';

export async function GET(request: Request, { params }: { params: { teamId: string } }) {
  // Connect to the database
  await connectToDatabase();

  try {
    const { teamId } = await params; // Await params before destructuring

    // Find the team by `teamId`
    const team = await Team.findOne({ teamId });

    // Check if the team exists
    if (!team) {
      return NextResponse.json({ error: 'Team not found' }, { status: 404 });
    }

    // Return the team data in JSON format
    return NextResponse.json(team);
  } catch (error) {
    console.error('Database fetch error:', error); // Log any errors
    return NextResponse.json({ error: 'Failed to fetch team' }, { status: 500 });
  }
}

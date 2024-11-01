import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Team from '@/models/Team';

export async function GET(request: Request, { params }: { params: { teamId: string } }) {
  await connectToDatabase(); // Ensure database connection

  try {
    const { teamId } = params;
    const team = await Team.findOne({ teamId }); // Find team by `teamId` field

    if (!team) {
      return NextResponse.json({ error: 'Team not found' }, { status: 404 });
    }

    return NextResponse.json(team); // Return the team data in JSON format
  } catch (error) {
    console.error('Database fetch error:', error); // Log any errors
    return NextResponse.json({ error: 'Failed to fetch team' }, { status: 500 });
  }
}

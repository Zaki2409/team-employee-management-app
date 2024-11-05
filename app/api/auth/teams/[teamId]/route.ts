import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Team from '@/models/Team';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../[...nextauth]/route';

export async function GET(request: Request, { params }: { params: { teamId: string } }) {
  // Connect to the database
  await connectToDatabase();

  try {
    const session = await getServerSession(authOptions);
    console.log(session);

    if (!session || !session.user || !session.user.employeeId) {
      return NextResponse.json({ error: 'You must be signed in to view team details' }, { status: 401 });
    }

    const { teamId } = await params; // Destructure params

    // Find the team by `teamId`
    const team = await Team.findOne({ teamId });

    // Check if the team exists
    if (!team) {
      return NextResponse.json({ error: 'Team not found' }, { status: 404 });
    }

    // Fetch the members of the team
    const membersResponse = await fetch(`${request.url}/members`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add any authentication headers if necessary
      },
    });

    if (!membersResponse.ok) {
      return NextResponse.json({ error: 'Failed to fetch team members' }, { status: 500 });
    }

    const members = await membersResponse.json();
    console.log('khanMembers:', members);

    // Check if the user is a member of the team
    const isMember = team.members.includes(session.user.employeeId); // Directly check if the employeeId is in the members array

    console.log('User employeeId:', session.user.employeeId); // Log the session employeeId
    console.log('isMember:', isMember); // Log if the user is a member or not

    if (!isMember) {
      return NextResponse.json({
        error: {
          title: 'Access Denied',
          message: 'You do not have permission to view this team.',
          suggestion: 'Please contact your administrator if you believe this is an error.'
        }
      }, { status: 403 });
    }
    

    // Return the team data in JSON format
    return NextResponse.json(team);
  } catch (error) {
    console.error('Database fetch error:', error); // Log any errors
    return NextResponse.json({ error: 'Failed to fetch team' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../[...nextauth]/route';
import Team from '@/models/Team';

export async function DELETE(request: Request, { params }: { params: { teamId: string } }) {
  const session = await getServerSession(authOptions);
  
  // Await the params before using them
  const { teamId } = await params; 

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user?.id; // Use optional chaining to avoid errors

  // if (!userId) {
  //   return NextResponse.json({ message: 'User ID not found in session' }, { status: 400 });
  // }

  try {
    // Find the team by teamId (make sure this matches your schema)
    const team = await Team.findOne({ teamId }); // or Team.findById(teamId) if teamId is an ObjectId
    if (!team) {
      return NextResponse.json({ message: 'Team not found' }, { status: 404 });
    }

    // Check if the user ID is part of the team members
    // if (!team.members.includes(userId)) {
    //   return NextResponse.json({ message: 'User not found in the team' }, { status: 400 });
    // }
    const userIsMember = team.members.includes(session.user.id); // Assuming session.user.id is the ID of the logged-in user
    if (!userIsMember) {
      return NextResponse.json({ message: 'You are not authorized to add users as you are not a team member.' }, { status: 403 });
    }
    // Remove the user from the team
    team.members = team.members.filter((id: string) => id !== userId);
    await team.save();

    return NextResponse.json({ message: 'User removed successfully', team }, { status: 200 });
  } catch (error) {
    console.error('Error removing user from team:', error); // Log the error for debugging

    // Check if error is an instance of Error
    if (error instanceof Error) {
      return NextResponse.json({ message: 'Server error', error: error.message }, { status: 500 });
    }

    // If the error is not an instance of Error, you can return a generic message
    return NextResponse.json({ message: 'Server error', error: 'An unknown error occurred' }, { status: 500 });
  }
}

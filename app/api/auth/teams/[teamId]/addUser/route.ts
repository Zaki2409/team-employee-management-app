import Team from "@/models/Team";
import { NextResponse } from "next/server";
import { authOptions } from "../../../[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function POST(request: Request, { params }: { params: { teamId: string } }) {
  const session = await getServerSession(authOptions);
  
  // Await the params before using them
  const { teamId } = await params; // <-- Make sure to await this

  if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
      const { userId } = await request.json(); // Expecting the user ID to add

      if (!userId) {
          return NextResponse.json({ message: 'User ID must be provided' }, { status: 400 });
      }

      const team = await Team.findOne({ teamId }); // Ensure you have the correct model to query
      if (!team) {
          return NextResponse.json({ message: 'Team not found' }, { status: 404 });
      }
      const userIsMember = team.members.includes(session.user.id); // Assuming session.user.id is the ID of the logged-in user
      if (!userIsMember) {
        return NextResponse.json({ message: 'You are not authorized to add users as you are not a team member.' }, { status: 403 });
      }

      // Add the user to the team
      if (!team.members.includes(userId)) {
          team.members.push(userId); // Add user only if they are not already a member
          await team.save();
      }

      return NextResponse.json({ message: 'User added successfully', team }, { status: 200 });
  } catch (error) {
      console.error('Error adding user to team:', error);
      return NextResponse.json({ message: 'Server error', error: error instanceof Error ? error.message : 'An unknown error occurred' }, { status: 500 });
  }
}

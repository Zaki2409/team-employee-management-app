import Team from "@/models/Team";
import { NextResponse } from "next/server";
import { authOptions } from "../../../[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function POST(request: Request, { params }: { params: { teamId: string } }) {
  // Ensure params are awaited
  const { teamId } = await params; // This line ensures params are resolved asynchronously

  const session = await getServerSession(authOptions);
  console.log(session);

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

    // Check if user is already a member
    if (team.members.includes(userId)) {
      return NextResponse.json({ message: 'User is already a member of this team.' }, { status: 400 });
    }

    // Add the user to the team
    team.members.push(userId); // Add user only if they are not already a member
    await team.save();

    return NextResponse.json({ message: 'User added successfully', team }, { status: 200 });
  } catch (error) {
    console.error('Error adding user to team:', error);
    return NextResponse.json({ message: 'Server error', error: error instanceof Error ? error.message : 'An unknown error occurred' }, { status: 500 });
  }
}

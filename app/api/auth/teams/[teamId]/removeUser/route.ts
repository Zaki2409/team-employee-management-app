// app/api/auth/teams/[teamId]/removeUser/route.ts

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../[...nextauth]/route';
import Team from '@/models/Team';

export async function DELETE(request: Request, { params }: { params: { teamId: string } }) {
  const session = await getServerSession(authOptions);
  const { teamId } = params;

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id; // Assuming the user ID is stored in the session

  try {
    const team = await Team.findById(teamId);
    if (!team) {
      return NextResponse.json({ message: 'Team not found' }, { status: 404 });
    }

    if (!team.members.includes(userId)) {
      return NextResponse.json({ message: 'User not found in the team' }, { status: 400 });
    }

    team.members = team.members.filter((id: string) => id !== userId);
    await team.save();

    return NextResponse.json({ message: 'User removed successfully', team }, { status: 200 });
  } catch (error) {
    return NextResponse.json({  }, { status: 500 });
  }
}

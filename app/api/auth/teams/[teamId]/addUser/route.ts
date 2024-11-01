// app/api/auth/teams/[teamId]/addUser/route.ts

import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import Team from '@/models/Team';
import { authOptions } from '../../../[...nextauth]/route';


export async function POST(request: Request, { params }: { params: { teamId: string } }) {
  const session = await getServerSession(authOptions);
  const { teamId } = params;

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id; // Assuming the user ID is stored in the session
  const userName = session.user.name; // Assuming the user name is stored in the session

  try {
    const team = await Team.findById(teamId);
    if (!team) {
      return NextResponse.json({ message: 'Team not found' }, { status: 404 });
    }

    if (team.members.includes(userId)) {
      return NextResponse.json({ message: 'User already in the team' }, { status: 400 });
    }

    team.members.push(userId);
    await team.save();

    return NextResponse.json({ message: 'User added successfully', team }, { status: 200 });
  } catch (error) {
    return NextResponse.json({  }, { status: 500 });
  }
}

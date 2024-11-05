// models/Team.ts
import mongoose, { Schema, model, models } from 'mongoose';

// Define a TypeScript interface for the team
export interface ITeam {
  teamId: string;
  name: string;
  description?: string; // Optional property
  members: string[]; // Array of user IDs
}

const TeamSchema = new Schema<ITeam>({
  teamId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: false },
  members: { type: [String], default: [] }, // Array of user IDs
});

const Team = models.Team || model<ITeam>('Team', TeamSchema);
export default Team;

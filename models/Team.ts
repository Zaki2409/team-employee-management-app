// models/Team.ts
import mongoose, { Schema, model, models } from 'mongoose';

const TeamSchema = new Schema({
  teamId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  members: { type: [String], default: [] }, // Array of user IDs
});

const Team = models.Team || model('Team', TeamSchema);
export default Team;

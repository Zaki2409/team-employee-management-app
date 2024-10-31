// models/Team.ts
import mongoose, { Schema, model, models } from 'mongoose';

const TeamSchema = new Schema({
  teamId: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  members: [{ type: String }], // Array of employeeId references
});

const Team = models.Team || model('Team', TeamSchema);
export default Team;

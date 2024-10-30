import mongoose, { Schema, model, models } from 'mongoose';

const EmployeeSchema = new Schema({
  employeeId: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  teams: [{ type: String }],  // Array of team IDs or references
});

const Employee = models.Employee || model('Employee', EmployeeSchema);
export default Employee;

import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Employee from '@/models/Employee';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library

export async function POST(request: Request) {
  try {
    const { name, username, password } = await request.json();
    await connectToDatabase();

    // Check if the username already exists
    const existingUser = await Employee.findOne({ username });
    if (existingUser) {
      return NextResponse.json({ message: 'Username already exists' }, { status: 400 });
    }

    // Generate a unique employeeId
    const employeeId = uuidv4(); // Generate a unique ID for the employee

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create a new employee record
    const newUser = new Employee({ 
      employeeId, // Include employeeId
      name, 
      username, 
      password: hashedPassword, 
      teams: [] 
    });
    
    await newUser.save();

    return NextResponse.json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

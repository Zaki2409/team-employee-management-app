import Employee from "@/models/Employee";
import { NextResponse } from "next/server";
console.log("test ",Employee); // Check if Employee is correctly imported
export async function GET() {
  try {
    const employees = await Employee.find(); // Fetch all employees
    return NextResponse.json({ employees }, { status: 200 });
  } catch (error) {
    console.error('Error fetching employees:', error);
    return NextResponse.json(
      { message: 'Server error', error: error instanceof Error ? error.message : 'An unknown error occurred' },
      { status: 500 }
    );
  }
}

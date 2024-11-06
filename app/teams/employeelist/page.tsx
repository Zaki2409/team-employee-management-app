// app/employees/page.tsx
"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Employee {
  _id: string;
  employeeId: string;
  name: string;
  position?: string; // Optional, since it's not in the API response
  description?: string; // Optional, since it's not in the API response
}

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/auth/employees');
        if (!response.ok) throw new Error('Failed to fetch employees');

        const data = await response.json();
        console.log(data);

        // Accessing `employees` key from the API response
        if (Array.isArray(data.employees)) {
          setEmployees(data.employees);
        } else {
          setError('The API response does not contain an employees array');
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  if (loading) return <p>Loading employees...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen text-white flex flex-col items-center justify-center p-6">
      <div className="bg-white p-6 shadow-lg rounded-lg w-full max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900 text-center">Employees</h1>
        <div className="flex flex-col space-y-6">
          {employees.map((employee) => (
            <div
              key={employee._id}
              className="bg-white p-6 shadow-lg rounded-lg hover:scale-105 transition-transform transform"
            >
              <h2 className="text-2xl font-semibold text-gray-900">{employee.name}</h2>
              <p className="mt-2 text-gray-700">Employee ID: {employee.employeeId}</p>
              <Link href={`/employees/${employee.employeeId}`}>
                <span className="inline-block text-blue-500 hover:underline mt-4 font-medium">
                  View Details
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;

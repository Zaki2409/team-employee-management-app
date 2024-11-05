This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# Team and Employee Management Application

## Project Objectives
Develop a web application using Next.js and MongoDB that manages employees and teams within a company. This application should include authentication and authorization features, allowing employees to log in and manage team-related activities based on their permissions.

## Project Scope

### Technology Stack
- **Frontend, Backend**: Next.js (latest stable version)
- **Database**: MongoDB (MongoDB Atlas or a local instance)

### Data Model

#### Employee
| Field      | Type    | Description                                   |
|------------|---------|-----------------------------------------------|
| employeeId | Unique ID | Primary key, unique employee identifier      |
| name       | String  | Name of the employee                          |
| username   | String  | Unique username for login                     |
| password   | String  | Hashed password                               |
| teams      | Array   | List of teamId references the employee belongs to |

#### Team
| Field      | Type    | Description                                   |
|------------|---------|-----------------------------------------------|
| teamId     | Unique ID | Primary key, unique team identifier          |
| name       | String  | Name of the team                              |
| members    | Array   | List of employeeId references (team members) |

## Functional Requirements

### Authentication & Authorization
- Implement a login system for employees.
- Implement a signup system for employees.
- Redirect users who are not logged in to the login page when attempting to access protected routes.
- Protect routes and API endpoints using middleware or higher-order components.

### Team List View
- Display a list of all teams.
- Pre-populate the database with at least three teams: Dev, Pro, and Biz.
- Allow logged-in employees to create new teams. The creator automatically becomes the first member of the team, and a form is provided for the team name.

### Team Detail View
- Allow access only to logged-in employees who are members of the team.
- Display team details, including the list of team members.
- Team members can:
  - Add other employees to the team (enable searching for employees).
  - Remove members from the team.
- If a logged-in employee who is not a member of the team attempts to access that team detail view, show an alert saying, "You do not have permission" and do not display any team information.


## API Specifications (Overview)

| Feature                           | Method | Endpoint                          | Request Body                        | Response                       |
|-----------------------------------|--------|----------------------------------|-------------------------------------|--------------------------------|
| Show team list                    | GET    | /teams                           | N/A                                 | A list of all teams           |
| Create a Team                     | POST   | /teams/create                    | Information about the team(name)   | Newly created team data        |
| Add a member to a team           | POST   | /teams/{teamId}/addMember       | Employee(s) id(s)                  | Updated team data              |
| Remove a member from a team      | DELETE | /teams/{teamId}/remove          | Employee’s id                       | Updated team data              |
| Sign in (Login)                  | POST   | /signin                          | Employee’s username, password       | Authentication token           |
| Sign up                           | POST   | /signup                          | Add Employee’s information          | Newly created employee data    |


Demonstration Video:

https://github.com/user-attachments/assets/5d293cde-43dd-486a-a325-ad44f2d83f9e


## Environment Setup

### `.env.local` File
To configure your local environment, create a `.env.local` file in the root of your project and add the following variables:
Replace `<Your MongoDB Connection String>` with your actual connection string from MongoDB Atlas or your local MongoDB instance.

### Dependencies
Run the following command to install the necessary dependencies for your Next.js application:

```bash
npm install



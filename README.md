# Online Live Polling System

This project is an Online Live Polling System developed using Nodejs + Express.js for the backend and Next.js for the frontend.

## Features

- **Admin Section**:

  - [Admin Login](http://localhost:4000/admin/login): Access the admin dashboard.
  - **Dashboard**:
    - Provides charts of votes.
    - Shows the vote count for each nominee.
    - Displays a Total Votes chart for the last created poll records.
    - View old records in Poll Management -> View.
  - **Poll Management**:
    - Lists created polls.
    - Create new polls with a button.
    - View poll information with charts.
  - **Profile**:
    - Check and update admin information.
  - **Logout**:
    - Log out from the current session.

- **User Section**:
  - [User Login](http://localhost:4000/): User login with email and password.
  - **User Register**:
    - Register as a new user with email, password, and other information.
  - **User Forgot Password**:
    - Reset the password with the email received with the reset link.
  - **Vote**:
    - Vote on remaining polls with nominees.
  - **Profile**:
    - Check and update user information.
  - **Logout**:
    - Log out from the current session.

## Technologies Used

- **Backend:**

  - Node.js
  - Express.js
  - MongoDB
  - Socket.IO

- **Frontend:**
  - Next.js
  - React.js
  - Chart.js
  - Socket.IO
  - MUI

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/harshm29/main.git
   ```

2. **Backend Setup:**

   - Navigate to the `back-end` folder.
   - Install dependencies: `npm install -f`
   - Set up environment variables in a `.env` file.

3. **Frontend Setup:**

   - Navigate to the `frontend` folder.
   - Install dependencies: `npm install -f`
   - Set up environment variables in a `.env` file.

4. **Run the Application:**

   - Start the backend server: `npm start` in the `back-end` folder.
   - Start the frontend development server: `npm run dev` in the `frontend` folder.

5. **Access the Application:**

   - Open your browser and go to `http://localhost:4000` to access the Online Live Polling System.

   - swagger ui `http://localhost:1500/api-docs`

## Usage

1. **Create Polls:**

   - Log in as an admin to create new polls.
   - Add nominees and define the poll question.

2. **Participate in Polls:**

   - Users can participate in polls by selecting nominees and submitting their votes.

3. **View Poll Results:**
   - Real-time updates of poll results are displayed using interactive charts.

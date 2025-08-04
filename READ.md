# Mini LinkedIn Platform

This is a full-stack web application that mimics some of the core features of LinkedIn. It allows users to sign up, log in, create posts, and view a feed of all posts. It also includes user profiles to see posts from specific users.

## Features

*   User authentication (Sign Up, Login)
*   Create and view posts in a central feed
*   View user profiles with their respective posts
*   Responsive design for a seamless experience on different devices

## Tech Stack

This project is built with the MERN stack and other modern technologies:

*   **Frontend:**
    *   **React:** A JavaScript library for building user interfaces.
    *   **Redux Toolkit:** For predictable state management.
    *   **Vite:** A fast build tool and development server.
    *   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.

*   **Backend:**
    *   **Node.js:** A JavaScript runtime for the server.
    *   **Express.js:** A web application framework for Node.js.
    *   **MongoDB:** A NoSQL database for storing application data.
    *   **Mongoose:** An ODM (Object Data Modeling) library for MongoDB and Node.js.

*   **Authentication:**
    *   **JSON Web Tokens (JWT):** For securing the API and managing user sessions.

## Project Setup

To get this project running on your local machine, follow these steps.

### Prerequisites

*   [Node.js](https://nodejs.org/) (v14 or later)
*   [npm](https://www.npmjs.com/) (usually comes with Node.js)
*   [MongoDB](https://www.mongodb.com/try/download/community) (or a MongoDB Atlas account)

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/Sandeep-singh-99/Assignment_Mini_linkedin_platform.git
cd Assignment_Mini_linkedin_platform
```
### 2. Backend Setup

The server handles the API, database, and authentication.

1.  **Navigate to the server directory:**
    ```bash
    cd server
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create a `.env` file:**
    Create a file named `.env` in the `server` directory and add the following environment variables.

    ```env
    MONGO_URL=your_mongodb_connection_string
    JWT_SECRET_TOKEN=your_jwt_secret_key
    PORT=8080
    ```

    *   Replace `your_mongodb_connection_string` with your actual MongoDB connection URL.
    *   Replace `your_jwt_secret_key` with a long, random string for securing tokens.

4.  **Start the server:**
    ```bash
    npm start
    ```
    The server will start on the port you specified (e.g., `http://localhost:8080`).

### 3. Frontend Setup

The client is a React application that provides the user interface.

1.  **Navigate to the client directory** (from the root folder):
    ```bash
    cd ../client
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The client application will be available at `http://localhost:5173` (or another port if 5173 is busy).

The client is configured to proxy API requests to the backend server, so you shouldn't encounter any CORS issues during development.

## How to Use

1.  Open your browser and go to the client URL (e.g., `http://localhost:5173`).
2.  Sign up for a new account or log in if you already have one.
3.  Create a new post using the form on the homepage.
4.  Browse the feed to see posts
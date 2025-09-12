# NOIR CAPITAL 

Welcome to the official repository for the Noir Capital project. This document provides all the necessary instructions to get the project running locally on your development machine.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables Setup](#environment-variables-setup)
  - [Backend Configuration](#backend-configuration)
  - [Frontend Configuration](#frontend-configuration)
- [Running the Application](#running-the-application)
  - [Running the Backend Server](#running-the-backend-server)
  - [Running the Frontend Client](#running-the-frontend-client)

## Prerequisites

Before you begin, ensure you have the following software installed on your system:

- **Node.js**: Version 18.x or higher. You can download it from [nodejs.org](https://nodejs.org/).
- **npm**: Node Package Manager, which comes bundled with Node.js.

## Installation

Follow these steps to get your development environment set up:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Palak-bansal-26/Noir-Capital.git](https://github.com/Palak-bansal-26/Noir-Capital.git)
    cd Noir-Capital
    ```

2.  **Install Backend Dependencies:**
    Navigate to the `Backend` directory and install the required npm packages.
    ```bash
    cd Backend
    npm install
    ```

3.  **Install Frontend Dependencies:**
    Navigate to the `Frontend` directory from the root folder and install its packages.
    ```bash
    cd ../Frontend 
    # Or from the root: cd Frontend
    npm install
    ```

## Environment Variables Setup

This project requires environment variables to store sensitive information like database connection strings and API keys. These are stored in `.env` files which are **not** committed to Git. You will need to create these files manually.

### Backend Configuration

1.  Create a new file named `.env` inside the `Backend` folder.
    `/Backend/.env`

2.  Copy the following template, paste it into the new file, and fill in the required values.

    ```env
    # The port the backend server will run on (e.g., 8000)
    PORT=

    # Your MongoDB connection string
    MONGO_URI=

    # A strong, secret string for signing JSON Web Tokens (JWT)
    JWT_SECRET=

    # The URL of the frontend application for CORS (e.g., http://localhost:5173)
    ORIGIN_URL=

    # --- Google OAuth Credentials ---
    # You can get these from the Google Cloud Console
    GOOGLE_CLIENT_ID=
    GOOGLE_CLIENT_SECRET=
    ```

### Frontend Configuration

1.  Create a new file named `.env` inside the `Frontend` folder.
    `/Frontend/.env`

2.  Copy the following template and paste it into the new file. This variable tells the frontend where to find the backend API.

    ```env
    # The full URL of your running backend server (e.g., http://localhost:8000)
    VITE_API_URL=
    ```

## Running the Application

To run the project, you will need to start both the backend and frontend servers in separate terminal windows.

### Running the Backend Server

1.  Navigate to the `Backend` directory.
2.  Start the server using the `dev` script.
    ```bash
    cd Backend
    npm run dev
    ```
    The backend API should now be running on the port you specified in your `Backend/.env` file.

### Running the Frontend Client

1.  Navigate to the `Frontend` directory.
2.  Start the Vite development server.
    ```bash
    cd Frontend
    npm run dev
    ```
    The frontend application will now be running, typically at `http://localhost:5173`. You can open this URL in your browser to see the application.

---


# Noir Capital Frontend

This is the React + Vite frontend for the Noir Capital project.

## Getting Started

### 1. Install dependencies
```
npm install
```

### 2. Configure environment variables
Create a `.env` file in this directory with the following content:
```
VITE_API_URL=http://localhost:5000/api/auth
```
This URL should match your backend API URL.

### 3. Start the development server
```
npm run dev
```
The app will be available at [http://localhost:5173](http://localhost:5173) by default.

## Login Test User

You can log in with the following test credentials (if created in the backend database):
- **Email:** test@example.com
- **Password:** 123

## Notes
- Make sure the backend server is running and accessible at the URL specified in `VITE_API_URL`.
- If you change the `.env` file, restart the dev server.

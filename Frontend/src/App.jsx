import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
  useSearchParams, // 1. IMPORT useSearchParams to read URL
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// --- Layout & Page Components ---
import MainLayout from './components/MainLayout.jsx';
import Layout from './components/Layout.jsx';
import Index from './pages/index.jsx';
import Services from './pages/Services.jsx';
import Careers from './pages/Careers.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';
import AuthPage from './pages/AuthPage.jsx';
import HrDashboardPage from './pages/HrDashboardPage.jsx';
import UserDashboard from './pages/UserDashboard.jsx';
import SetPasswordPage from './pages/SetPasswordPage.jsx';
import LandingPage from './pages/LandingPage.jsx';
import ApplyForm from "./pages/ApplyForm";


// --- Auth Utilities & Services ---
import { getToken, setToken, removeToken } from './utils/tokenManager';
import { fetchUserProfile } from './services/authService';

// --- React Query Client ---
const queryClient = new QueryClient();

// --- Authentication Context & Hook ---
const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

/**
 * @component AuthProvider
 * @description Manages and provides authentication state to the entire app.
 */
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setTokenState] = useState(getToken());
  const [isLoading, setIsLoading] = useState(true);

  // 2. GET ACCESS TO NAVIGATE AND SEARCHPARAMS HOOKS
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleLogout = useCallback(() => {
    removeToken();
    setTokenState(null);
    setUser(null);
    // Redirect to login after logout for better UX
    navigate('/login');
  }, [navigate]);
  
  const handleLogin = useCallback(async (receivedToken) => {
    setToken(receivedToken);
    setTokenState(receivedToken);
    try {
      const res = await fetchUserProfile();
      const userData = res.data.data;
      setUser(userData);
      return userData;
    } catch (error) {
      console.error("Failed to fetch profile on login", error);
      handleLogout();
      return null;
    }
  }, [handleLogout]);

  // 3. THIS useEffect IS THE CORE OF THE FIX
  useEffect(() => {
    const bootstrapAuth = async () => {
      // First, check if a token was passed in the URL (from Google OAuth)
      const tokenFromUrl = searchParams.get('token');
      
      if (tokenFromUrl) {
        // If a token is in the URL, log in with it
        await handleLogin(tokenFromUrl);
        // Clean the token from the URL so it doesn't stay in the address bar
        navigate(window.location.pathname, { replace: true });
      } else {
        // If no token in URL, check for an existing session in localStorage
        const currentToken = getToken();
        if (currentToken && !user) {
          await handleLogin(currentToken);
        }
      }
      
      // Authentication check is complete
      setIsLoading(false);
    };

    bootstrapAuth();
    // This effect should only run once on initial app load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = { user, token, isLoading, login: handleLogin, logout: handleLogout };

  // Show a loading indicator while we check for a token. This prevents the
  // redirect race condition.
  if (isLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <h2>Loading Session...</h2>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * @component ProtectedRoute
 * @description A wrapper for a route that requires authentication.
 */
const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { token, user } = useAuth();
  const location = useLocation();

  // This check is now safe because AuthProvider waits for isLoading to be false
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly && user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return children;
};

/**
 * @component AppRoutes
 * @description Defines all the application routes and their layouts.
 */
const AppRoutes = () => {
  const { token } = useAuth();

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/login" element={token ? <Navigate to="/" /> : <LandingPage />} />
        <Route path="/auth" element={token ? <Navigate to="/" /> : <AuthPage />} />
        <Route path="/set-password" element={<SetPasswordPage />} />
       <Route path="/apply/:jobTitle" element={<ApplyForm />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
        <Route path="/services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
        <Route path="/careers" element={<ProtectedRoute><Careers /></ProtectedRoute>} />
        <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
  <Route path="/hr-dashboard" element={<ProtectedRoute adminOnly={true}><HrDashboardPage /></ProtectedRoute>} />
  <Route path="/user-dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

/**
 * @component App
 * @description The root component that sets up all providers.
 */
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;

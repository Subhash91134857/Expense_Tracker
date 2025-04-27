import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import ExpensesPage from "./pages/ExpensesPage";
import DashboardPage from "./pages/Dashboard";
import Login from "./components/Auth/Login";
import UserProfile from "./components/Auth/UserProfile";

function AppContent() {
  const [user, setUser] = useState(null);
  const location = useLocation(); 

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const isLoginPage = location.pathname === "/login";

  return (
    <div className="min-h-screen bg-gray-100">
      {!isLoginPage &&
        user && (
          <header className="bg-white shadow-md p-4 flex items-center justify-between">
            <UserProfile />
          </header>
        )}

      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/expenses"
            element={user ? <ExpensesPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/dashboard"
            element={user ? <DashboardPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/"
            element={<Navigate to={user ? "/dashboard" : "/login"} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

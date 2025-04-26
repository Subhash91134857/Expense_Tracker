import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  const isLoginPage = location.pathname === "/login";

  return (
    <div className="w-full flex items-center justify-between p-4 shadow-md bg-white">
      {!isLoginPage && (
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
        >
          Logout
        </button>
      )}

      {/* User Info on Right */}
      {isLoginPage ? (
        <div className="flex items-center space-x-3">
          <img
            src="https://via.placeholder.com/48"
            alt="Default User"
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-300 shadow-md"
          />
        </div>
      ) : (
        user && (
          <div className="flex items-center space-x-3">
            <img
              src={user.photoURL}
              alt="User Profile"
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-300 shadow-md"
            />
            <span className="font-semibold text-lg text-gray-700">
              {user.displayName}
            </span>
          </div>
        )
      )}
    </div>
  );
};

export default UserProfile;

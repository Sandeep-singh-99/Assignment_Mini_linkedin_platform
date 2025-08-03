import React from "react";
import { Link } from "react-router-dom";
import { LogInIcon, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { SignOut } from "../redux/slice/authSlice";

export default function NavBar() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleLogout = () => {
    try {
      dispatch(SignOut())
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <div className="flex justify-between items-center bg-white text-black p-4 shadow-md">
      <Link to="/" className="text-2xl font-bold">
        Mini LinkedIn
      </Link>

      {isAuthenticated ? (
        <div className="flex items-center space-x-4">
          <Link
            to={"/profile"}
            className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded"
          >
            <User2 />
            <span className="hidden md:block">Profile</span>
          </Link>

          <button onClick={handleLogout} className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded">
            <LogInIcon />
            <span className="hidden md:block">Logout</span>
          </button>
        </div>
      ) : (
        <Link
          to="/login"
          className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded"
        >
          <LogInIcon />
          <span className="hidden md:block">Login</span>
        </Link>
      )}
    </div>
  );
}

import { Link } from "react-router-dom";
import { LogInIcon, User2, LogOutIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { SignOut } from "../redux/slice/authSlice";

export default function NavBar() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    try {
      dispatch(SignOut());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="flex justify-between items-center bg-white text-gray-800 p-4 md:px-8 shadow-lg sticky top-0 z-50 transition-all duration-300">
      {/* Brand Logo */}
      <Link to="/" className="text-2xl font-bold tracking-tight hover:text-blue-600 transition-colors duration-200">
        Mini LinkedIn
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center space-x-4 md:space-x-6">
        {isAuthenticated ? (
          <>
            <Link
              to="/profile"
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
            >
              <User2 size={20} />
              <span className="hidden md:inline">Profile</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors duration-200"
            >
              <LogOutIcon size={20} />
              <span className="hidden md:inline">Logout</span>
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
          >
            <LogInIcon size={20} />
            <span className="hidden md:inline">Login</span>
          </Link>
        )}
      </div>
    </nav>
  );
}
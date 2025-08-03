import React from "react";
import { Link } from "react-router-dom";
import  { LogInIcon, User2 } from "lucide-react"

export default function NavBar() {
  return (
    <div className="flex justify-between items-center bg-white text-black p-4 shadow-md">
      <Link to="/" className="text-2xl font-bold">Mini LinkedIn</Link>
      <div className="flex items-center space-x-4">
        <Link to={"/profile"} className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded">
          <User2 />
          <span className="hidden md:block">Profile</span>
        </Link>
        <Link to="/login" className="flex items-center space-x-2 bg-blue-500 text-white px-4 py-2 rounded">
          <LogInIcon />
          <span className="hidden md:block">Login</span>
        </Link>
      </div>
    </div>
  );
}

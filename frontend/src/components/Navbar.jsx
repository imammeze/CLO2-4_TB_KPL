import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-500 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-white font-bold text-xl">
            Sistem Manajemen Kost
          </Link>
          <div className="flex space-x-4">
            <Link
              to="/"
              className="text-white border border-white hover:bg-white hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
              Daftar Penghuni
            </Link>
            <Link
              to="/add"
              className="bg-white text-blue-500 hover:bg-indigo-100 px-3 py-2 rounded-md text-sm font-medium">
              Tambah Penghuni
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import TenantList from "./components/TenantList";
import AddTenant from "./components/AddTenant";
import EditTenant from "./components/EditTenant";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<TenantList />} />
            <Route path="/add" element={<AddTenant />} />
            <Route path="/edit/:id" element={<EditTenant />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

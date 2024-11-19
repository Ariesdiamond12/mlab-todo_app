import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

// Importing Pages
import Todo from "./Components/Todo";
import Registration from "./Components/Registration";
import Login from "./Components/Login";

const App = () => {
  const [users, setUsers] = useState([]);

  // Fetch users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const addUser = async (name, email, password) => {
    try {
      await axios.post("http://localhost:3001/users", {
        name,
        email,
        password,
      });
      fetchUsers(); // Refresh user list after adding
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  return (
    <BrowserRouter>
      <div className="bg-stone-300 grid py-4 min-h-screen content-center">
        <Routes>
          <Route path="/" element={<Login users={users} />} />
          <Route
            path="/Registration"
            element={<Registration addUser={addUser} />}
          />
          <Route path="/Todo" element={<Todo />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;

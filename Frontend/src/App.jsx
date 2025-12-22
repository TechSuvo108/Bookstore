import React from "react";
import Home from "./home/Home";
import Courses from "./courses/Courses";
import Signup from "./components/Signup";
import Contacts from "./contacts/Contacts";
import Aboutus from "./aboutus/Aboutus";
import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { useAuth } from "./context/AuthProvider";

const App = () => {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/course"
          element={authUser ? <Courses /> : <Navigate to="/signup" />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contacts />} />
        <Route path="/about" element={<Aboutus />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;

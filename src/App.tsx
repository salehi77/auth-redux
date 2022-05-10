import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAppSelector } from "./Store";

// layouts
import AuthLayout from "./Layouts/AuthLayout";
import UserLayout from "./Layouts/UserLayout";

// pages
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";

function Redirect({ to }: { to: string }) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  });
  return null;
}

export default function App() {
  const isLoggedin = useAppSelector((state) => state.auth.token);

  return (
    <>
      {isLoggedin ? (
        <UserLayout>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Redirect to="/dashboard" />} />
          </Routes>
        </UserLayout>
      ) : (
        <AuthLayout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Redirect to="/login" />} />
          </Routes>
        </AuthLayout>
      )}
    </>
  );
}

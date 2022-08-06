import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import './App.css'
import Navbar from "./components/Navbar";
import Quiz from "./pages/Quiz";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Loading from "./components/Loading";
import jwtDecode from "jwt-decode";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";


const App = () => {
  const [auth, setAuth] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchUser = async (token) => {
    setLoading(true);
    if (!token) {
      setAuth(false);
      setLoading(false);
      return
    }
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: token }),
      json: true,
    };
    const decode = await jwtDecode(token);
    if (decode.exp < Date.now() / 1000) {
      localStorage.removeItem("user");
      setAuth(false);
      setLoading(false);
      return
    } else {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/validate`,
          options
        );
        const data = await res.json();
        if (res.status === 200) {
          setAuth(true);
          setUser(data.user);
          setLoading(false);
          return
        } else {
          setLoading(false);
          setAuth(false);
          setUser({});
          return
        }
      } catch (error) {
        setLoading(false);
        setAuth(false);
        return
      }
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("user");
    fetchUser(token);
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("user");
    fetchUser(token);
  }, [auth]);

  return (
    <>
      {loading ? <Loading /> : " "}
      <Navbar auth={auth} setAuth={setAuth} />

      <Routes>
        <Route
          path="/"
          element={
            auth ? <Dashboard name={user.name} _id={user._id} /> : <Home />
          }
        />
        <Route
          path="/quiz"
          element={auth ? <Quiz _id={user._id} /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={auth ? <Navigate to="/" /> : <Login setAuth={setAuth} />}
        />
        <Route
          path="/register"
          element={auth ? <Navigate to="/" /> : <Register />}
        />
      </Routes>
      <Footer/>
    </>
  );
};

export default App;

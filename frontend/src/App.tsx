import React from "react";
import "./App.css";
import { Navbar } from "./components/layout";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen pt-20">
        <main className="flex-grow  flex  h-full">
          <Outlet />
        </main>
      </div>
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default App;

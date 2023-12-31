import React from "react";
import "./App.css";
import { Drawer, Navbar } from "./components/layout";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Navbar />
      <Drawer>
        <div className="flex flex-col min-h-screen pt-20">
          <main className="flex-grow  flex h-full">
            <Outlet />
          </main>
        </div>
      </Drawer>
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default App;

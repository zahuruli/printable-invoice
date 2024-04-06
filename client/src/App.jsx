import { useState } from "react";
import "./App.css";
import PosPage from "./pages/PosPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster />
      <PosPage />
    </>
  );
}

export default App;

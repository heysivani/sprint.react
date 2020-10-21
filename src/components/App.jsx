import React, { useState } from "react";
import "../styles/styles.css";
import Navbar from "./Navbar";

export default function App() {
  const [currentView, setCurrentView] = useState("AllPhotos");
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState("");

  return (
    <div className="app">
      <Navbar />
      <h1>Hello World!</h1>
    </div>
  );
}

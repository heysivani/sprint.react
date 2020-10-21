import React, { useState } from "react";
import "../styles/styles.css";
import Navbar from "./Navbar";
import SinglePhoto from "./SinglePhoto";
import AllPhotos from "./AllPhotos";

export default function App() {
  const [currentView, setCurrentView] = useState("AllPhotos");
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState("");

  return (
    <div className="app">
      <Navbar />
      {currentView === "AllPhotos" ? <AllPhotos /> : <SinglePhoto />}

      <h1>Hello World!</h1>
    </div>
  );
}

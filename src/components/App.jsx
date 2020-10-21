import React, { useState, useEffect } from "react";
import "../styles/styles.css";
import Navbar from "./Navbar";
import SinglePhoto from "./SinglePhoto";
import AllPhotos from "./AllPhotos";
import { listObjects } from "../utils/index.js";

export default function App() {
  const [currentView, setCurrentView] = useState("AllPhotos");
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState("");

  useEffect(() => {
    listObjects() // add all of the Keys to photos?
      .then(pics => {
        const picKeys = pics.map(pic => pic.Key);
        return picKeys;
      })
      .then(picKeys => {
        setPhotos(picKeys);
      });
  }, []);

  return (
    <div className="app">
      <Navbar />
      {currentView === "AllPhotos" ? <AllPhotos /> : <SinglePhoto />}

      <h1>Hello World!</h1>
    </div>
  );
}

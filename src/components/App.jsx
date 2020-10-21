import React from "react";
import "../styles/styles.css";

export default function App() {
  const [currentView, setCurrentView] = useState("AllPhotos");
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState("");

  return (
    <div className="app">
      <div className="navbar">Hi</div>
      <h1>Hello World!</h1>
    </div>
  );
}

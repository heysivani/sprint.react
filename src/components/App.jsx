import React, { useState, useEffect } from "react";
import "../styles/styles.css";
import Navbar from "./Navbar";
///THEME STUFF
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./globalStyles.js";
import { lightTheme, darkTheme } from "./Themes.js";
///THEME STUFF

import SinglePhoto from "./SinglePhoto";
import AllPhotos from "./AllPhotos";
import { getSingleObject, listObjects } from "../utils/index.js";

export default function App() {
  const [currentView, setCurrentView] = useState("AllPhotos");
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState("");

  //THEME STUFF
  const [theme, setTheme] = useState("light");
  const themeToggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };
  //THEME STUFF

  // Get photos on mount
  useEffect(() => {
    /// only call to s3 if we do not have photos in local storage
    if (localStorage.getItem("photos") === null) {
      listObjects()
        .then(pics => {
          console.log("CALLED BEZOS BEEP BEEP BEZOS");
          const picKeys = pics.map(pic => pic.Key);
          return picKeys;
        })
        .then(picKeys => {
          let TENphotos = picKeys.slice(0, 30);

          let pngsONLY = TENphotos.filter(photo => {
            return photo.endsWith("png");
          });

          localStorage.setItem("photos", JSON.stringify(pngsONLY));
          console.log(JSON.parse(localStorage.getItem("photos")));
          setPhotos(pngsONLY);
        });
    } else {
      /// else set state of photos tobe the photos that are held in the Widow.localStorage
      console.log("RETRIEVING FROM LOCAL WHEEE");
      setPhotos(JSON.parse(localStorage.getItem("photos")));
    }
  }, []);

  function updateView(string) {
    setCurrentView(string);
  }

  // update the photos array
  function updatePhotos(photo) {
    setPhotos([...photos, photo]);
  }

  function getSelectedPhoto(url) {
    setSelectedPhoto(url);
    setCurrentView("SinglePhoto");
  }

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <>
        <GlobalStyles />
        <div className="app">
          <button onClick={themeToggler}>Switch Theme</button>
          <Navbar
            currentView={currentView}
            updateView={updateView}
            updatePhotos={updatePhotos}
          />
          {currentView === "AllPhotos" ? (
            <AllPhotos photos={photos} getSelectedPhoto={getSelectedPhoto} />
          ) : (
            <SinglePhoto photo={selectedPhoto} />
          )}
        </div>
      </>
    </ThemeProvider>
  );
}

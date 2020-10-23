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
          console.log("Retrieveing from s3 on MOUNT");
          const picKeys = pics.map(pic => pic.Key);
          return picKeys;
        })
        .then(picKeys => {
          let TENphotos = picKeys.slice(0, 10);

          localStorage.setItem("photos", JSON.stringify(TENphotos));
          console.log(JSON.parse(localStorage.getItem("photos")));
          setPhotos(TENphotos);
        });
    } else {
      /// else set state of photos tobe the photos that are held in the Widow.localStorage
      console.log("RETRIEVING FROM LOCAL Storage on mount");
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

  function getFreshBucket() {
    listObjects()
      .then(pics => {
        const picKeys = pics.map(pic => pic.Key);
        return picKeys;
      })
      .then(picKeys => {
        let TENphotos = picKeys.slice(0, 10);
        localStorage.setItem("photos", JSON.stringify(TENphotos));
        console.log(
          "curent localSTORAGE after RESFRESH",
          JSON.parse(localStorage.getItem("photos"))
        );
        setPhotos(TENphotos);
      });
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
            getFreshBucket={getFreshBucket}
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

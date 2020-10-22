import React from "react";
import "../styles/navbar.css";
import _ from "lodash";
import Upload from "./Upload.jsx";
import { saveObject } from "../utils/index.js";

export default function Navbar(props) {
  // saves photo to aws bucket and calls update photos from app
  async function savePhoto(file) {
    const savedFile = await saveObject(file);
    if (file.Key) {
      props.updatePhotos(savedFile.Key);
    } else {
      props.updatePhotos(savedFile.name);
    }
  }

  return (
    <>
      <div className="navbar">
        <button
          onClick={() => {
            // When clicked, change current view value to "AllPhotos"
            if (props.currentView === "SinglePhoto") {
              props.updateView("AllPhotos");
            } else {
              props.updateView("SinglePhoto");
            }
          }}
        >
          {props.currentView}
        </button>

        <Upload savePhoto={savePhoto} />
      </div>
    </>
  );
}

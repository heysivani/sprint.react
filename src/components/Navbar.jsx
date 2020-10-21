import React from "react";
import "../styles/navbar.css";
import _ from "lodash";
import Upload from "./Upload.jsx";
import { saveObject } from "../utils/index.js";

export default function Navbar(props) {
  async function savePhoto(file) {
    console.log("FILE in navbar", file);
    // need to encode this into base-64? doesn't fit object interface they expect in saveObject
    const AWSfile = {
      Key: file.name,
      Body: file,
      ACL: "public-read"
    };
    console.log("AWSfile", AWSfile);
    const savedFile = await saveObject(AWSfile);
    console.log("saved file", savedFile);
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

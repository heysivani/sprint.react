import React, { useState, useRef, useEffect } from "react";
import _ from "lodash";
import "../styles/upload.css";

export default function Upload(props) {
  const [file, setFile] = useState();

  return (
    <>
      <div className="file-upload">
        <button
          onClick={() => {
            console.log("File to upload", file);
            if (file) {
              console.log("trying to save", file);
              props.savePhoto(file);
            }
          }}
        >
          upload
        </button>
        <input
          type="file"
          onChange={e => {
            setFile(e.target.files[0]);
          }}
        ></input>
      </div>
    </>
  );
}

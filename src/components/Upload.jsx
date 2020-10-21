import React, { useState } from "react";
import _ from "lodash";
import "../styles/upload.css";

export default function Upload(props) {
  const [file, setFile] = useState("");

  return (
    <>
      <div className="file-upload">
        <button>Upload{file}</button>
        <input
          onClick={e => {
            setFile(e.target.files[0]);
            console.log(e.target.files[0]);
            console.log("FILE", file.name);
            props.savePhoto(file);
          }}
          type="file"
        ></input>
      </div>
    </>
  );
}

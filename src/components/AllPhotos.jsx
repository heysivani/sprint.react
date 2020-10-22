import React, { useState, useEffect } from "react";
import _ from "lodash";
import { getSingleObject } from "../utils/index.js";

export default function AllPhotos(props) {
  const [photo, setPhoto] = useState();

  async function retrievePhoto(photo) {
    let retrievedPhoto = await getSingleObject(photo);
    setPhoto("data:image/png;base64," + retrievedPhoto);
    console.log("PHOTO", photo);
    console.log("BASE64PHOTO?", retrievedPhoto);
    return retrievedPhoto;
  }

  retrievePhoto(props.photos[0]);

  return (
    <>
      <div className="ALL">
        <img src={photo} />
      </div>
    </>
  );
}

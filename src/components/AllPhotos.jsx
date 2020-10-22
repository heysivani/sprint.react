import React, { useState, useEffect } from "react";
import _ from "lodash";
import { getSingleObject } from "../utils/index.js";

export default function AllPhotos(props) {
  const [photo, setPhoto] = useState();

  async function retrievePhotos(photos) {
    console.log("here");
    let promiseKeys = photos.map(photo => getSingleObject(photo));
    let retrievedPhotos = await Promise.all(promiseKeys).then(photosKeys => {
      console.log("B&$S", photosKeys);
    });

    //setPhoto("data:image/png;base64," + retrievedPhoto);

    //  return retrievedPhoto;
  }

  retrievePhotos(props.photos);

  return (
    <>
      <div className="ALL">
        <img className="imageCell" src={photo} />
      </div>
    </>
  );
}

// console.log("PHOTO", photo);
// console.log("BASE64PHOTO?", retrievedPhoto);

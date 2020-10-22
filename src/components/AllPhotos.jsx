import React, { useState, useEffect } from "react";
import _ from "lodash";
import { getSingleObject } from "../utils/index.js";

export default function AllPhotos(props) {
  const [photos, setPhotos] = useState([]);
  let urlsFun = [];
  //retrievePhotos(pngsONLY);

  useEffect(() => {
    // lets filter photos array to only keep pngs
    let TENphotos = props.photos.slice(0, 30);
    let pngsONLY = TENphotos.filter(photo => {
      return photo.endsWith("png");
    });
    console.log(pngsONLY);
    // async function retrievePhotos(photos) {
    let promiseKeys = pngsONLY.map(photo => getSingleObject(photo));
    //let retrievedPhotos = await
    Promise.all(promiseKeys)
      .then(photosKeys => {
        // a bunch of b64s
        return photosKeys;
      })
      .then(base => {
        let urls = [];
        for (let b of base) {
          urls.push("data:image/png;base64," + b);
        }
        console.log("urls", urls);
        //urlsFun = urls;
        setPhotos(urls);
      });
  }, [props.photos]);

  // useEffect(() => {
  //   console.log("photos", photos);
  // }, [photos])

  return (
    <>
      <div className="ALL">
        {photos.map(url => {
          return <img className="imageCell" src={url} />;
        })}
      </div>
    </>
  );
}

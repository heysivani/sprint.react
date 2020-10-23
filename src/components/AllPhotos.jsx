import React, { useState, useEffect } from "react";
import _ from "lodash";
import { getSingleObject } from "../utils/index.js";

export default function AllPhotos(props) {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    let promiseKeys = props.photos.map(photo => getSingleObject(photo));
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

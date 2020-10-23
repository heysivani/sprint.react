import React, { useState, useEffect } from "react";
import _ from "lodash";
import { getSingleObject } from "../utils/index.js";

export default function AllPhotos(props) {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    let promiseKeys = props.photos.map(photo => getSingleObject(photo));
    Promise.all(promiseKeys)
      .then(photosKeys => {
        return photosKeys;
      })
      .then(base => {
        let urls = [];
        for (let b of base) {
          urls.push("data:image;base64," + b);
        }
        setPhotos(urls);
      });
  }, [props.photos]);

  return (
    <>
      <div className="ALL">
        {photos.map((url, i) => {
          return (
            <img
              key={i}
              onClick={() => {
                photos.indexOf(url);
                props.getSelectedPhoto(url);
              }}
              className="imageCell"
              src={url}
            />
          );
        })}
      </div>
    </>
  );
}

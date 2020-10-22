import React, { useState, useEffect } from "react";
import _ from "lodash";
import { getSingleObject } from "../utils/index.js";

export default function AllPhotos(props) {
  // console.log("I am in ALL PHOTOS!!!!", props.photos);
  const [photo, setPhoto] = useState();

  useEffect(() => {
    getSingleObject(props.photos[0]).then(Rphoto => {
      console.log(Rphoto);
    });
  }, []);
  // async function retrievePhoto(photo) {
  //   let retrievedPhoto = await getSingleObject(photo);
  //   console.log("retrieved photo base 64? nintendo 64?", retrievedPhoto);
  //   setPhoto(retrievedPhoto);
  //   console.log(" got phorto!!!!!!!!!!!!!!!!!  ",photo);
  //   return photo;
  // }

  return (
    <>
      <div className="ALL"></div>
    </>
  );
}

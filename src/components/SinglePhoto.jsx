import React from "react";
import _ from "lodash";

export default function SinglePhotos(props) {
  return (
    <>
      <div className="single">
        <img className="imageCell" src={props.photo} />
      </div>
    </>
  );
}

import React from "react";
import "./App.css";

const Marker = (props: any) => {
  const { color, name, lat, lng, time, date, location } = props;
  return (
    <div>
      <div className="wrapper">
        <div
          className="pin bounce"
          style={{ backgroundColor: color, cursor: "pointer" }}
          title={name}
        />
        <div className="pulse" />
        <div className="coor">
          <p>
            Coordinate: {lat.toFixed(4)},{lng.toFixed(4)}
          </p>
          <p>Location: {location}</p>
          <p>Date: {date.toString()}</p>
          <p>Time: {time.toString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Marker;

import GoogleMapReact from "google-map-react";
import iss from "./img/iss.png";
import "./App.css";

function Map({ center, zoom }) {

  return (
      <div style={{ height: "50vh", width: "100vw" }} className="map-container">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBvbcIC2I9QjQxZp0YqS2WeX8kysRrP-ds" }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          <img
            src={iss}
            className="iss-img"
            lat={center.lat}
            lng={center.lng}
          />
        </GoogleMapReact>
      </div>
  );
}

// Map.defaultProps = {
//    center: {
//       lat: 4.2105,
//       lng: 101.9758,
//    },
//    zoom: 4
// }

export default Map;

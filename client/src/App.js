import "./App.css";
import Axios from "axios";
import Map from "./map.js";
import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(false);
  const [longitude, setLongitude] = useState(101.9758);
  const [latitude, setLatitude] = useState(4.2105);

  const getLocation = async () => {
    setLoading(true);

    const res = await Axios.get(
      "https://api.wheretheiss.at/v1/satellites/25544"
    );

    console.log(res);

    const { longitude, latitude } = await res.data;

    let tempLng = parseFloat(longitude);
    let tempLat = parseFloat(latitude);

    console.log(tempLng);
    console.log(tempLat);

    setLongitude(tempLng);
    setLatitude(tempLat);

    setLoading(false);
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div className="App">
      {!loading ? (
        <Map
          center={{
            lat: latitude,
            lng: longitude,
          }}
        />
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
}

export default App;

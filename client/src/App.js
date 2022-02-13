import "./App.css";
import Axios from "axios";
// import Map from "./map.js";
import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DateTimePicker from "react-datetime-picker";
import GoogleMapReact from "google-map-react";
import screen from "./img/loading.gif";
import Marker from "./Marker.tsx";
import Popup from "react";

function App() {
  const [loading, setLoading] = useState(false);
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [datetime, setDateTime] = useState(new Date());
  const [timeStamp, setTimeStamp] = useState(0);
  const [selectedDateList, setSelectedDateList] = useState([]);

  const initPage = async () => {
    setLoading(true); // Wait for response

    // const res = await Axios.get(
    //   "https://api.wheretheiss.at/v1/satellites/25544"
    // );

    // const { longitude, latitude } = await res.data;

    // let tempLng = parseFloat(longitude);
    // let tempLat = parseFloat(latitude);

    // console.log(res);
    // console.log(tempLng);
    // console.log(tempLat);

    // setLongitude(tempLng);
    // setLatitude(tempLat);
    setTimeStamp(parseInt(Math.floor(datetime.getTime() / 1000))); //Convert to seconds
    setTimeout(function() {
      setLoading(false);
    }, 1500);
    
  };

  const postTimestamp = async (e) => {
    e.preventDefault();

    await Axios.post("http://localhost:3001/post_date", {
      timeStamp,
    })
      .then((response) => {
        // console.log("response data");
        // console.log(response.data);
        setSelectedDateList(response.data);
        console.log(selectedDateList);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    initPage();
  }, []);

  return (
    <div className="App">
      {!loading ? (
        <center>
          <div
            style={{ height: "80vh", width: "100vw" }}
            className="map-container"
          >
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyBvbcIC2I9QjQxZp0YqS2WeX8kysRrP-ds",
              }}
              defaultCenter={{ lat: latitude, lng: longitude }}
              defaultZoom={2}
            >
              {selectedDateList.map((val, key) => {
                return (
                  <Marker
                    lat={val.latitude}
                    lng={val.longitude}
                    color="blue"
                    date={new Date(val.timestamp * 1000).toLocaleDateString()}
                    time={new Date(val.timestamp * 1000).toLocaleTimeString()}
                  />
                );
              })}
            </GoogleMapReact>
          </div>
        </center>
      ) : (
        <center><img src={screen} align="center"/></center>
      )}
      <p>
        <center>
          <form onSubmit={postTimestamp}>
            <DateTimePicker
              onChange={(datetime) => {
                setDateTime(datetime);
                setTimeStamp(parseInt(Math.floor(datetime.getTime() / 1000)));
              }}
              value={datetime}
            />
            {/* <p>{timeStamp}</p> */}
            <p>
              <button onCLick="update" type="submit">
                Track ISS
              </button>
            </p>
          </form>
        </center>
      </p>
    </div>
  );
}

export default App;

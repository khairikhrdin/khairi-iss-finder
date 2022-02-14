import "./App.css";
import Axios from "axios";
import { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DateTimePicker from "react-datetime-picker";
import GoogleMapReact from "google-map-react";
import screen from "./img/loading.gif";
import Marker from "./Marker.tsx";

function App() {
  const [loading, setLoading] = useState(false);
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [datetime, setDateTime] = useState(new Date());
  const [timeStamp, setTimeStamp] = useState(0);
  const [selectedDateList, setSelectedDateList] = useState([]);
  const [peopleList, setPeopleList] = useState([]);

  const initPage = async () => {
    setLoading(true); // Wait for response

    await Axios.get("http://localhost:3001/get_people")
      .then((response) => {
        // console.log(response.data.people);
        setPeopleList(response.data.people);
        // console.log(peopleList);
      })
      .catch((error) => {
        console.log(error);
      });

    setTimeStamp(parseInt(Math.floor(datetime.getTime() / 1000))); //Convert to seconds
    setTimeout(function () {
      setLoading(false);
    }, 1500);
  };

  const postTimestamp = async (e) => {
    e.preventDefault();

    await Axios.post("http://localhost:3001/post_date", {
      timeStamp,
    })
      .then((response) => {
        // console.log(response.data);
        setSelectedDateList(response.data);
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
                    key={key}
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
        <center>
          <img src={screen} align="center" />
        </center>
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
            <p>
              <button onCLick="update" type="submit">
                Track ISS
              </button>
            </p>
            <p>
              <hr></hr>
              <h3>People on ISS</h3>
              <table
                border="1"
                cellspacing="0"
                cellpadding="4"
                width="300px"
                align="center"
              >
                <tr>
                  <th>Craft</th>
                  <th>Name</th>
                </tr>
                {peopleList.map((val) => {
                  return (
                    <tr>
                      <td>{val.craft}</td>
                      <td>{val.name}</td>
                    </tr>
                  );
                })}
              </table>
            </p>
          </form>
        </center>
      </p>
    </div>
  );
}

export default App;

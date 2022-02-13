import "./App.css";
import Axios from "axios";
import Map from "./map.js";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import DateTimePicker from "react-datetime-picker";
// import "flatpickr/dist/themes/material_green.css";
// import Flatpickr from "react-flatpickr";

function App() {
  const [loading, setLoading] = useState(false);
  const [longitude, setLongitude] = useState(101.9758);
  const [latitude, setLatitude] = useState(4.2105);
  const [datetime, setDateTime] = useState(new Date());
  const [timeStamp, setTimeStamp] = useState(0);

  const getLocation = async () => {
    setLoading(true);

    const res = await Axios.get(
      "https://api.wheretheiss.at/v1/satellites/25544"
    );

    // const res1 = await Axios.get("http://api.open-notify.org/astros.json");

    console.log(res);
    // console.log(res1);

    const { longitude, latitude } = await res.data;
    // let people = await res.data.people;

    // let arr = [];
    // Object.keys(people).forEach(function(key) {
    //   arr.push(people[key]);
    // });

    let tempLng = parseFloat(longitude);
    let tempLat = parseFloat(latitude);

    console.log(tempLng);
    console.log(tempLat);

    setLongitude(tempLng);
    setLatitude(tempLat);
    setTimeStamp(parseInt(Math.floor(datetime.getTime() / 1000))); //Convert to seconds
    setLoading(false);
  };

  async function postDate(e) {
    e.preventDefault();

    try {
      await Axios.post("http://localhost:3001/post_date", {
        timeStamp,
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div className="App">
      {!loading ? (
        <center>
          <Map
            center={{
              lat: latitude,
              lng: longitude,
            }}
            zoom={6.5}
          />
          <p>
            <form onSubmit={postDate}>
              <DateTimePicker
                onChange={(datetime) => {
                  setDateTime(datetime);
                  setTimeStamp(parseInt(Math.floor(datetime.getTime() / 1000)));
                  // setTimeStamp(Date.parse(datetime));
                }}
                value={datetime}
              />
              {/* <Flatpickr
                data-enable-time
                key={datetime}
                value={datetime}
                onChange={onChange}
                options={{
                  // maxDate: "today",
                  time_24hr: "true",
                }}
              /> */}

              {/* <DatePicker
                selected={datetime}
                onChange={(datetime) => {
                  setDateTime(datetime);
                  return datetime;
                }}
                showTimeSelect
              /> */}
              {/* <input placeholder="testing here boi.." onChange={onChange} /> */}
              {/* <p>{inputValue}</p> */}
              {/* <p>{Math.floor(datetime.getTime() / 1000).toString()}</p> */}
              <p>{timeStamp}</p>
              <button onCLick="update" type="submit">
                Find Date
              </button>
            </form>
          </p>
        </center>
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
}

export default App;

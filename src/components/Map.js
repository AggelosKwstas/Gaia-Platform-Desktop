import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import "../css/LoadingScreen.css";
import Tooltip from "react-bootstrap/Tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "@fontsource/roboto/700.css";
import uoiPng from "../img/sensor_default.jpg";
import gardikiPng from "../img/gardikiSensor.jpg";
import ioannisPng from "../img/agiosIoannisSensor.jpg";
import eleousaPng from "../img/eleousaSensor.jpg";

const LegendAsset = React.lazy(() => import("./Legend"));

const greenIcon = L.icon({
  iconUrl: require("../img/GreenMarker.png"),
  iconSize: [28, 35],
});

const redIcon = L.icon({
  iconUrl: require("../img/RedMarker.png"),
  iconSize: [28, 35],
});

const orangeIcon = L.icon({
  iconUrl: require("../img/OrangeMarker.png"),
  iconSize: [28, 35],
});

const greyIcon = L.icon({
  iconUrl: require("../img/GreyMarker.png"),
  iconSize: [28, 35],
});

const renderTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props} style={{ zIndex: 300 }}>
    Simple tooltip
  </Tooltip>
);

export function convertDegreesCToSymbol(str) {
  return str.replace(/&deg;C/g, "°C");
}

export function convertSubscriptTagsToCharacters(str) {
  var regex = /<sub>(.*?)<\/sub>/g;
  return str.replace(regex, function (match, p1) {
    return p1.replace(/./g, function (char) {
      var charCode = char.charCodeAt(0);
      var subscriptCode = charCode + 8272;
      return String.fromCharCode(subscriptCode);
    });
  });
}

function loadingScreen(text) {
  return (
    <div>
      <div className="loading-screen">
        <div className="loading-text">
          <div className="container_loader">
            <div className="sound-wave">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div className="loading">{text}</div>
        </div>
      </div>
    </div>
  );
}

//check if a station is working or not
function checkNullStation(array, position) {
  return array.includes(position);
}

//check air quality and return icon
function checkQuality(arr, array, position, data) {
  const relevantIndices = [0, 5, 6, 7, 9];
  let conditions_bad = [];
  let conditions_fair = [];

  let found_bad = false;
  let found_fair = false;

  let fair_o3 = false;
  let bad_o3 = false;

  let fair_pm2 = false;
  let bad_pm2 = false;

  let fair_pm1 = false;
  let bad_pm1 = false;

  let fair_so2 = false;
  let bad_so2 = false;

  let fair_no2 = false;
  let bad_no2 = false;

  // If station is not working, return gray icon
  if (checkNullStation(arr, position)) {
    return { icon: greyIcon, condition: null, flag: null };
  }

  relevantIndices.forEach((index) => {
    let measurements = data[position][index];

    let sum = 0;
    let count = 0;

    measurements[array.sensor_node_id + "_measurements"].forEach((item) => {
      sum += item.value;
      count++;
    });

    const average = count > 0 ? sum / count : 0;

    const value = average;

    if (index === 0) {
      if (value >= 100 && value <= 240) {
        fair_o3 = true;
      } else if (value >= 240) {
        bad_o3 = true;
      }
    }

    if (index === 5) {
      if (value >= 20 && value <= 50) {
        fair_pm2 = true;
      } else if (value >= 50) {
        bad_pm2 = true;
      }
    }

    if (index === 6) {
      if (value >= 40 && value <= 100) {
        fair_pm1 = true;
      } else if (value >= 100) {
        bad_pm1 = true;
      }
    }

    if (index === 7) {
      if (value >= 100 && value <= 200) {
        fair_so2 = true;
      } else if (value >= 200) {
        bad_so2 = true;
      }
    }

    if (index === 9) {
      if (value >= 90 && value <= 230) {
        fair_no2 = true;
      } else if (value >= 230) {
        bad_no2 = true;
      }
    }
  });

  if (bad_so2) {
    found_bad = true;
    conditions_bad.push("SO<sub>2</sub>");
  }

  if (bad_no2) {
    conditions_bad.push("NO<sub>2</sub>");
    found_bad = true;
  }

  if (bad_o3) {
    conditions_bad.push("O<sub>3</sub>");
    found_bad = true;
  }

  if (bad_pm1) {
    conditions_bad.push("PM 10");
    found_bad = true;
  }

  if (bad_pm2) {
    conditions_bad.push("PM 2.5");
    found_bad = true;
  }

  if (fair_o3) {
    conditions_fair.push("O<sub>3</sub>");
    found_fair = true;
  }

  if (fair_so2) {
    conditions_fair.push("SO<sub>2</sub>");
    found_fair = true;
  }

  if (fair_no2) {
    conditions_fair.push("NO<sub>2</sub>");
    found_fair = true;
  }

  if (fair_pm1) {
    conditions_fair.push("PM 10");
    found_fair = true;
  }

  if (fair_pm2) {
    conditions_fair.push("PM 2.5");
    found_fair = true;
  }

  if (found_bad) {
    return { icon: redIcon, condition: conditions_bad, flag: "bad" };
  }

  if (!found_bad && found_fair) {
    return { icon: orangeIcon, condition: conditions_fair, flag: "fair" };
  }

  return { icon: greenIcon, condition: null, flag: null };
}

export default function Map() {
  const [isLoading1, setIsLoading1] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  const [isLoading3, setIsLoading3] = useState(true);
  const [isLoading4, setIsLoading4] = useState(true);
  const [stations, setStations] = useState(null);
  const [types, setTypes] = useState(null);
  const [coordinates, setCoordinates] = useState([]);
  const [apiIcon, setApiIcon] = useState([]);
  const [sensorData, setSensorData] = useState([]);
  const [found, setFound] = useState([]);
  const [sensorTypes, setSensorTypes] = useState([]);
  const [location, setLocation] = useState({
    name: "",
    longitude: 0,
    latitude: 0,
  });

  const mapRef = useRef(null); // Declare a ref variable

  const handleMapLoad = () => {
    if (mapRef.current) {
      const mapInstance = mapRef.current;
    }
  };

  const apiToken = "99f344c4-5afd-4962-a7e2-ddbc3467d4c8";

  const weather_icon =
    "https://api.openweathermap.org/data/2.5/weather?lat=39.6650&lon=20.8537&APPID=697f06f42d81bbda7d75e9349aefc162";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(
          "https://restapi.gaia-platform.eu/rest-api/items/readNode.php?project_id=2",
          {
            params: {
              token_auth: apiToken,
            },
          }
        );

        setStations(response1.data);
        response1.data["tbl_sensor_node"].forEach((sensorType, index) => {
          setLocation((prevState) => ({
            ...prevState,
            [index]: {
              name: sensorType.description,
              latitude: sensorType.latitude,
              longitude: sensorType.longitude,
            },
          }));
        });
        setIsLoading1(false);

        const sensorNodes = response1.data["tbl_sensor_node"];
        if (sensorNodes && sensorNodes.length > 0) {
          setCoordinates(sensorNodes);
        }

        const response2 = await axios.get(
          `https://restapi.gaia-platform.eu/rest-api/items/readNodeType.php?sensor_node_id=${response1.data["tbl_sensor_node"][0]["sensor_node_id"]}`,
          {
            params: {
              token_auth: apiToken,
            },
          }
        );

        setTypes(response2.data);
        setIsLoading2(false);

        // get sensor types for graphs page
        const sensorTypes = response2.data["tbl_sensor_type"];
        sensorTypes.map((sensorType, index) => {
          setSensorTypes((prev) => [...prev, sensorType["sensor_type_id"]]);
        });

        const response = await axios.get(weather_icon);
        setApiIcon(response.data["weather"][0]["icon"]);
        setIsLoading3(false);

        const date = new Date();
        let currentDate = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

        const sensorDataPromises = sensorNodes.map(
          async (sensorNode, index) => {
            const types = await Promise.all(
              sensorTypes.map(async (item) => {
                try {
                  const response = await axios.get(
                    `https://restapi.gaia-platform.eu/rest-api/items/readMeasurements.php`,
                    {
                      params: {
                        sensor_node_id: sensorNode.sensor_node_id,
                        date: currentDate,
                        sensor_type_id: item.sensor_type_id,
                        token_auth: apiToken,
                      },
                    }
                  );
                  return response.data;
                } catch (error) {
                  return null;
                }
              })
            );
            return types;
          }
        );

        const sensorData = await Promise.all(sensorDataPromises);
        const nullIndices = [];
        const filteredSensorData = sensorData.map((sensor, index) => {
          if (sensor[0] === null) {
            nullIndices.push(index);
          } else {
            return sensor;
          }
        });

        setFound((prevFound) => [...prevFound, ...nullIndices]);
        setSensorData(filteredSensorData);
        setIsLoading4(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const navigate = useNavigate();
  const handleRedirect = (sensor_id, type, name) => {
    navigate("/Graphs", {
      state: { sensor: sensor_id, sensor_type: type, sensor_name: name },
    });
  };

  if (isLoading1) {
    return loadingScreen("Initializing map components...");
  }

  if (isLoading2) {
    return loadingScreen("Gathering sensor nodes...");
  }

  if (isLoading3) {
    return loadingScreen("Gathering weather data...");
  }

  if (isLoading4) {
    return loadingScreen("Initializing marker data...");
  }

  return (
    <div className="map_components">
      <LegendAsset mapRef={mapRef} locations={location} />
      <MapContainer
        ref={mapRef}
        center={[39.665, 20.8537]}
        zoom={12}
        style={{ width: "100vw", height: "100vh" }}
        zoomControl={false}
        whenCreated={handleMapLoad}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution={"<b>Copyright © 2022</b>"}
        />
        {coordinates.map((coordinate, index) => (
          <Marker
            key={index}
            position={[coordinate.latitude, coordinate.longitude]}
            icon={checkQuality(found, coordinate, index, sensorData).icon}
          >
            {checkNullStation(found, index) && (
              <Popup>
                <div>
                  <h6 style={{ textAlign: "center" }}>
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="bounce-animation"
                    />
                    &nbsp;&nbsp;
                    <b>
                      {stations["tbl_sensor_node"][index][
                        "description"
                      ].replace("Air Monitor", "")}
                    </b>
                  </h6>
                  <div style={{ textAlign: "center" }}>
                    <img
                      style={{
                        display: "block",
                        margin: "auto",
                      }}
                      src={uoiPng}
                      alt="UOI"
                    />
                    Status: <b style={{ color: "#bb2124" }}>Inactive</b>
                  </div>
                  <div style={{ textAlign: "center", fontSize: "15px" }}>
                    <div>
                      <b>Station is under</b>
                    </div>
                    <div>
                      <b>maintenance</b>
                    </div>
                  </div>
                </div>
              </Popup>
            )}

            {!checkNullStation(found, index) && (
              <Popup>
                <div style={{ fontSize: "15px" }}>
                  <h6 style={{ textAlign: "center" }}>
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="bounce-animation"
                      style={{ fontSize: "20px" }}
                    />
                    &nbsp;&nbsp;
                    <b style={{ fontSize: "20px" }}>
                      {stations["tbl_sensor_node"][index][
                        "description"
                      ].replace("Air Monitor", "")}
                    </b>
                  </h6>
                  <div style={{ textAlign: "center" }}>
                    {index === 1 && (
                      <img
                        style={{
                          display: "block",
                          margin: "0 auto 10px auto",
                          width: "170px",
                        }}
                        src={gardikiPng}
                        alt="Gardiki"
                      />
                    )}
                    {index === 2 && (
                      <img
                        style={{
                          display: "block",
                          margin: "0 auto 10px auto",
                          width: "170px",
                        }}
                        src={ioannisPng}
                        alt="Gardiki"
                      />
                    )}
                    {index === 3 && (
                      <img
                        style={{
                          display: "block",
                          margin: "0 auto 10px auto",
                          width: "170px",
                        }}
                        src={eleousaPng}
                        alt="Gardiki"
                      />
                    )}
                    <b>Status: </b>
                    <b style={{ color: "#22bb33" }}>Active</b>
                  </div>
                  {apiIcon && (
                    <img
                      style={{
                        display: "block",
                        margin: "0 auto",
                        width: "85px",
                      }}
                      src={`http://openweathermap.org/img/w/${apiIcon}.png`}
                      alt="Weather"
                    />
                  )}
                  {types["tbl_sensor_type"].map((type, ind) =>
                    ind === 0 ? (
                      <>
                        <div
                          style={{ marginBottom: "5px", textAlign: "center" }}
                        >
                          <b>Sensor readings for:</b>
                          <div>
                            Today at{" "}
                            {new Date(
                              sensorData[index][ind][
                                coordinate["sensor_node_id"] + "_measurements"
                              ][
                                sensorData[index][ind][
                                  coordinate["sensor_node_id"] + "_measurements"
                                ].length - 1
                              ]["timestamp"]
                            )
                              .toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                              })
                              .replace("μ.μ.", "PM")
                              .replace("π.μ.", "ΑΜ")}
                          </div>
                        </div>
                        {checkQuality(found, coordinate, index, sensorData)
                          .condition !== null &&
                        checkQuality(found, coordinate, index, sensorData)
                          .flag === "bad" ? (
                          <div style={{ textAlign: "center" }}>
                            <div>
                              <b>Bad due to:</b>
                            </div>
                            <ul>
                              {checkQuality(
                                found,
                                coordinate,
                                index,
                                sensorData
                              ).condition.map((item) => (
                                <li style={{ color: "red" }}>
                                  <b>
                                    {convertSubscriptTagsToCharacters(item)}
                                  </b>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : checkQuality(found, coordinate, index, sensorData)
                            .flag === "fair" ? (
                          <div style={{ textAlign: "center" }}>
                            <div>
                              <b>Fair due to:</b>
                            </div>
                            <ul>
                              {checkQuality(
                                found,
                                coordinate,
                                index,
                                sensorData
                              ).condition.map((item) => (
                                <li style={{ color: "orange" }}>
                                  <b>
                                    {convertSubscriptTagsToCharacters(item)}
                                  </b>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : null}
                        <div className="row">
                          <div className="column">
                            <b>
                              {convertSubscriptTagsToCharacters(
                                type.description
                              )
                                .replace("Environment", "")
                                .replace("Sensor Node", "")}
                              :
                            </b>
                          </div>
                          <div className="column">
                            <div className="value-container">
                              <div>
                                {
                                  sensorData[index][ind][
                                    coordinate["sensor_node_id"] +
                                      "_measurements"
                                  ][
                                    sensorData[index][ind][
                                      coordinate["sensor_node_id"] +
                                        "_measurements"
                                    ].length - 1
                                  ]["value"]
                                }
                              </div>
                              <div>
                                &nbsp;{convertDegreesCToSymbol(type.unit)}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      sensorData[index] &&
                      sensorData[index][ind] && (
                        <div className="row">
                          <div className="column">
                            <b>
                              {convertSubscriptTagsToCharacters(
                                type.description
                              )
                                .replace("Environment", "")
                                .replace("Sensor Node", "")}
                              :
                            </b>
                          </div>
                          <div className="column">
                            <div className="value-container">
                              <div>
                                {
                                  sensorData[index][ind][
                                    coordinate["sensor_node_id"] +
                                      "_measurements"
                                  ][
                                    sensorData[index][ind][
                                      coordinate["sensor_node_id"] +
                                        "_measurements"
                                    ].length - 1
                                  ]["value"]
                                }
                              </div>
                              <div>
                                &nbsp;{convertDegreesCToSymbol(type.unit)}
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )
                  )}
                  <div style={{ textAlign: "center", marginTop: "5px" }}>
                    <button
                      style={{ fontWeight: 300 }}
                      className="button"
                      onClick={() => {
                        handleRedirect(
                          coordinate["sensor_node_id"],
                          sensorTypes,
                          stations["tbl_sensor_node"][index][
                            "description"
                          ].replace("Air Monitor", "")
                        );
                      }}
                    >
                      View station
                    </button>
                  </div>
                </div>
              </Popup>
            )}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

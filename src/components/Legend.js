import React, { useState, useEffect } from "react";
import "../css/Legend.css";
import "../css/Table.css";
import "aos/dist/aos.css";
import Modal from "react-bootstrap/Modal";
import logo from "../img/Logo Gaia Platform.png";
import air from "../img/air.png";
import noise from "../img/noise.png";
import plant from "../img/plant.png";
import town from "../img/town.png";
import linkedin from "../img/linkedin.png";
import facebook from "../img/facebook.png";
import twitter from "../img/twitter.png";
import pinterest from "../img/pinterest.png";
import CustomTooltip from "./CustomTooltip";
import "../css/InfoButton.css";
import { Autocomplete, TextField } from "@mui/material";

const Legend = ({ mapRef, locations }) => {
  const [show, setShow] = useState(false);
  const [greenPressed, setGreenPressed] = useState(false);
  const [yellowPressed, setYellowPressed] = useState(false);
  const [redPressed, setRedPressed] = useState(false);
  const [grayPressed, setGrayPressed] = useState(false);
  const [valuesFilter, setValuesFilter] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    Object.keys(locations).forEach((key) => {
      if (locations[key].name) {
        setValuesFilter((prev) => [...prev, locations[key].name]);
      }
    });
  }, []);

  // open links in the desktop app
  function openLinkInNewWindow(url) {
    window.open(url, "_blank");
  }

  function filterStations(filter) {
    let greenUrl =
      window.location.origin +
      "/static/media/GreenMarker.e39e59a10b9a686b1af9.png";
    let greyUrl =
      window.location.origin +
      "/static/media/GreyMarker.5eb815c5b986410f3e39.png";
    let redUrl =
      window.location.origin +
      "/static/media/RedMarker.0b044081b8067d93482e.png";
    let orangeUrl =
      window.location.origin +
      "/static/media/OrangeMarker.3ba4eff75e8e363d705b.png";

    let greyArray = [];
    let greenArray = [];
    let redArray = [];
    let orangeArray = [];

    //get marker icons
    var elements = document.getElementsByClassName("leaflet-pane");
    for (var i = 0; i < elements.length; i++) {
      var imgs = elements[i].getElementsByTagName("img");
      for (var j = 0; j < imgs.length; j++) {
        if (imgs[j].src === greenUrl) greenArray.push(imgs[j]);
        else if (imgs[j].src === greyUrl) greyArray.push(imgs[j]);
        else if (imgs[j].src === redUrl) redArray.push(imgs[j]);
        else if (imgs[j].src === orangeUrl) orangeArray.push(imgs[j]);
      }
    }

    if (filter === "bad") {
      if (!redPressed) {
        for (var k = 0; k < redArray.length; k++) {
          redArray[k].style.display = "none";
        }
        document.getElementById("red").style.backgroundColor = "#e0dede";
        setRedPressed(true);
      }

      if (redPressed) {
        for (var k = 0; k < redArray.length; k++) {
          redArray[k].style.display = "block";
        }
        document.getElementById("red").style.backgroundColor = "#ff0032";
        setRedPressed(false);
      }
    }

    if (filter === "green") {
      if (!greenPressed) {
        for (var k = 0; k < greenArray.length; k++) {
          greenArray[k].style.display = "none";
        }
        document.getElementById("green").style.backgroundColor = "#e0dede";
        setGreenPressed(true);
      }

      if (greenPressed) {
        for (var k = 0; k < greenArray.length; k++) {
          greenArray[k].style.display = "block";
        }
        document.getElementById("green").style.backgroundColor = "#5caa32";
        setGreenPressed(false);
      }
    }

    if (filter === "orange") {
      if (!yellowPressed) {
        for (var k = 0; k < orangeArray.length; k++) {
          orangeArray[k].style.display = "none";
        }
        document.getElementById("orange").style.backgroundColor = "#e0dede";
        setYellowPressed(true);
      }

      if (yellowPressed) {
        for (var k = 0; k < orangeArray.length; k++) {
          orangeArray[k].style.display = "block";
        }
        document.getElementById("orange").style.backgroundColor = "#FFA500";
        setYellowPressed(false);
      }
    }

    if (filter === "grey") {
      if (!grayPressed) {
        for (var k = 0; k < greyArray.length; k++) {
          greyArray[k].style.display = "none";
        }
        document.getElementById("grey").style.backgroundColor = "#e0dede";
        setGrayPressed(true);
      }

      if (grayPressed) {
        for (var k = 0; k < greyArray.length; k++) {
          greyArray[k].style.display = "block";
        }
        document.getElementById("grey").style.backgroundColor = "#9b9a9a";
        setGrayPressed(false);
      }
    }
  }

  const handleAutocompleteChange = (event, newValue) => {
    const mapInstance = mapRef.current;

    let element = document.querySelector("[title]");
    if (element.title === "Clear") {
      mapInstance.flyTo([39.665, 20.8537], 12, {
        animate: true,
        duration: 1.5,
      });
    }

    if (newValue) {
      if (mapRef.current) {
        Object.keys(locations).forEach((key) => {
          if (newValue === locations[key].name) {
            mapInstance.flyTo(
              [locations[key].latitude, locations[key].longitude],
              16,
              {
                animate: true,
                duration: 1.5,
              }
            );
          }
        });
      }
    }
  };

  return (
    <div>
      <div
        className="legend"
        data-aos="fade-right"
        data-aos-delay="50"
        data-aos-duration="1000"
        style={{ marginTop: "30px" }}
      >
        <h3 style={{ marginBottom: "10px", fontSize: "23px", cursor: "help" }}>
          <b>
            <CustomTooltip />
          </b>
        </h3>
        <div className="legend-item">
          <span
            id="green"
            className="legend-icon"
            style={{ background: "#82da43" }}
            onClick={() => filterStations("green")}
          ></span>
          <span>
            <b>Good</b>
          </span>
        </div>
        <div className="legend-item">
          <span
            id="orange"
            className="legend-icon"
            style={{ background: "#FFA500" }}
            onClick={() => filterStations("orange")}
          ></span>
          <span>
            <b>Fair</b>
          </span>
        </div>
        <div className="legend-item">
          <span
            id="red"
            className="legend-icon"
            style={{ background: "#ff0032" }}
            onClick={() => filterStations("bad")}
          ></span>
          <span>
            <b>Bad</b>
          </span>
        </div>
        <div className="legend-item">
          <span
            id="grey"
            className="legend-icon"
            style={{ background: "#9b9a9a" }}
            onClick={() => filterStations("grey")}
          ></span>
          <span>
            <b>No Data</b>
          </span>
        </div>
        <input
          className="button"
          type="button"
          value="Learn more"
          style={{ fontSize: "18px", width: "135px" }}
          onClick={handleShow}
        />
        <div className="pt-3">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={valuesFilter}
            onChange={handleAutocompleteChange}
            sx={{ width: "170px", height: "auto", borderColor: "black" }}
            renderInput={(params) => (
              <TextField {...params} label="Station Navigator" />
            )}
          />
        </div>
      </div>
      <Modal show={show} onHide={handleClose} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title
            data-aos="zoom-in"
            data-aos-delay="50"
            data-aos-duration="1000"
          >
            <img
              style={{ width: "150px", marginRight: 0 }}
              src={logo}
              alt="Logo"
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          data-aos="fade-down"
          data-aos-duration="1200"
          className="custom-modal-body"
        >
          <div className="text-md-center">
            <h3>
              <b>What we offer?</b>
            </h3>
          </div>
          <div className="grid-container">
            <div className="card" style={{ borderRadius: "15px" }}>
              <div style={{ textAlign: "center" }}>
                <img
                  style={{ width: "70px", marginRight: 0 }}
                  src={air}
                  alt="Logo"
                />
                <div className="container">
                  <h4>
                    <b>Air quality and pollution</b>
                  </h4>
                  <p>
                    Our platform utilizes advanced sensors to accurately measure
                    air quality and pollution levels. By analyzing various
                    factors we provide real-time data on the air quality in your
                    vicinity.
                  </p>
                </div>
              </div>
            </div>
            <div className="card" style={{ borderRadius: "15px" }}>
              <div style={{ textAlign: "center" }}>
                <img
                  style={{ width: "70px", marginRight: 0 }}
                  src={noise}
                  alt="Logo"
                />
                <div className="container">
                  <h4>
                    <b>Acoustic and noise levels</b>
                  </h4>
                  <p>
                    By continuously monitoring noise levels in different areas,
                    we aim to raise awareness about the detrimental effects of
                    excessive noise and help individuals identify sources of
                    noise pollution.
                  </p>
                </div>
              </div>
            </div>
            <div className="card" style={{ borderRadius: "15px" }}>
              <div style={{ textAlign: "center" }}>
                <img
                  style={{ width: "70px", marginRight: 0 }}
                  src={plant}
                  alt="Logo"
                />
                <div className="container">
                  <h4>
                    <b>Parks and gardens</b>
                  </h4>
                  <p>
                    {" "}
                    By understanding water usage patterns and gaining insights
                    into their irrigation practices communities can conserve
                    water resources while maintaining healthy and vibrant
                    landscapes.
                  </p>
                </div>
              </div>
            </div>
            <div className="card" style={{ borderRadius: "15px" }}>
              <div style={{ textAlign: "center" }}>
                <img
                  style={{ width: "70px", marginRight: 0 }}
                  src={town}
                  alt="Logo"
                />
                <div className="container">
                  <h4>
                    <b>Cities and towns management</b>
                  </h4>
                  <p>
                    {" "}
                    We provide comprehensive data on crucial aspects of urban
                    environments. By analyzing this data, local authorities can
                    optimize waste management routes and implement recycling
                    programs.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-md-center mt-2">
            <h3>
              <b>Case Study - Air Quality Index at Ioannina,Greece</b>
            </h3>
          </div>
          <p>
            The map markers indicate the positions of air quality monitoring
            stations, and the color assigned to each marker corresponds to the
            air quality index recorded at that specific station. The index is
            determined by considering concentration values of up to five primary
            pollutants, which include:
            <ul>
              <li>
                <b>Particulate matter (PM10)</b>
              </li>
              <li>
                <b>Fine particulate matter (PM2.5)</b>
              </li>
              <li>
                <b>Ozone (O3)</b>
              </li>
              <li>
                <b>Nitrogen dioxide (NO2)</b>
              </li>
              <li>
                <b>Sulphur dioxide (SO2)</b>
              </li>
            </ul>
            The calculation of the AQ Index involves different methodologies for
            different pollutants. For pollutants such as nitrogen dioxide (NO2),
            ozone (O3), and sulphur dioxide (SO2), the index levels are based on
            hourly concentrations. This means that the concentration values for
            these pollutants are measured and recorded on an hourly basis at the
            air quality monitoring stations. On the other hand, the AQ Index for
            particulate matter, specifically PM10 and PM2.5, is based on daily
            running means. This means that the concentration values for these
            pollutants are averaged over a 24-hour period. The use of daily
            running means helps to smooth out the variations that may occur
            throughout the day due to factors such as weather conditions,
            traffic patterns, and human activities.<br></br>
            By considering both hourly concentrations for NO2, O3, and SO2, and
            daily running means for PM10 and PM2.5, the AQ Index methodology
            aims to provide a comprehensive and representative assessment of air
            quality, enabling individuals and authorities to make informed
            decisions regarding air pollution management and public health.
          </p>
          <h5>
            <b>Bands of concentrations and index levels :</b>
          </h5>
          <table className="responsive-table">
            <thead className="responsive-table__head">
              <tr className="responsive-table__row">
                <th className="responsive-table__head__title responsive-table__head__title--name">
                  Pollutants
                </th>
                <th className="responsive-table__head__title responsive-table__head__title--status">
                  Good
                </th>
                <th className="responsive-table__head__title responsive-table__head__title--types go_right">
                  Fair
                </th>
                <th className="responsive-table__head__title responsive-table__head__title--update go_right">
                  Bad
                </th>
                <th className="responsive-table__head__title responsive-table__head__title--update">
                  No data
                </th>
              </tr>
            </thead>
            <tbody className="responsive-table__body">
              <tr className="responsive-table__row">
                <td className="responsive-table__body__text responsive-table__body__text--name">
                  O3 (ppm)
                </td>
                <td className="responsive-table__body__text responsive-table__body__text--status">
                  <span className="status-indicator status-indicator--active"></span>
                  ≤100
                </td>
                <td className="responsive-table__body__text responsive-table__body__text--status">
                  <span className="status-indicator status-indicator--new"></span>{" "}
                  100-240
                </td>
                <td className="responsive-table__body__text responsive-table__body__text--status">
                  <span className="status-indicator status-indicator--bad"></span>
                  ≥240
                </td>
                <td className="responsive-table__body__text responsive-table__body__text--status">
                  <span className="status-indicator status-indicator--inactive"></span>
                  NULL
                </td>
              </tr>
              <tr className="responsive-table__row">
                <td className="responsive-table__body__text responsive-table__body__text--name">
                  PM 2.5 (μg/m3)
                </td>
                <td className="responsive-table__body__text responsive-table__body__text--status">
                  <span className="status-indicator status-indicator--active"></span>
                  ≤20
                </td>
                <td className="responsive-table__body__text responsive-table__body__text--status">
                  <span className="status-indicator status-indicator--new"></span>
                  20-50
                </td>
                <td className="responsive-table__body__text responsive-table__body__text--status">
                  <span className="status-indicator status-indicator--bad"></span>
                  ≥50
                </td>
                <td className="responsive-table__body__text responsive-table__body__text--status">
                  <span className="status-indicator status-indicator--inactive"></span>
                  NULL
                </td>
              </tr>
              <tr className="responsive-table__row">
                <td className="responsive-table__body__text responsive-table__body__text--name">
                  PM 10 (μg/m3)
                </td>
                <td className="responsive-table__body__text responsive-table__body__text--status">
                  <span className="status-indicator status-indicator--active"></span>
                  ≤40
                </td>
                <td className="responsive-table__body__text responsive-table__body__text--status">
                  <span className="status-indicator status-indicator--new"></span>
                  40-100
                </td>
                <td className="responsive-table__body__text responsive-table__body__text--status">
                  <span className="status-indicator status-indicator--bad"></span>
                  ≥100
                </td>
                <td className="responsive-table__body__text responsive-table__body__text--status">
                  <span className="status-indicator status-indicator--inactive"></span>
                  NULL
                </td>
              </tr>
              <tr className="responsive-table__row">
                <td className="responsive-table__body__text responsive-table__body__text--name">
                  SO2 (ppm)
                </td>
                <td className="responsive-table__body__text responsive-table__body__text--status">
                  <span className="status-indicator status-indicator--active"></span>
                  ≤100
                </td>
                <td className="responsive-table__body__text responsive-table__body__text--status">
                  <span className="status-indicator status-indicator--new"></span>
                  100-200
                </td>
                <td className="responsive-table__body__text responsive-table__body__text--status">
                  <span className="status-indicator status-indicator--bad"></span>
                  ≥200
                </td>
                <td className="responsive-table__body__text responsive-table__body__text--status">
                  <span className="status-indicator status-indicator--inactive"></span>
                  NULL
                </td>
              </tr>
              <tr className="responsive-table__row">
                <td className="responsive-table__body__text responsive-table__body__text--name">
                  NO2 (ppm)
                </td>
                <td className="responsive-table__body__text responsive-table__body__text--status">
                  <span className="status-indicator status-indicator--active"></span>
                  ≤90
                </td>
                <td className="responsive-table__body__text responsive-table__body__text--status">
                  <span className="status-indicator status-indicator--new"></span>
                  90-230
                </td>
                <td className="responsive-table__body__text responsive-table__body__text--status">
                  <span className="status-indicator status-indicator--bad"></span>
                  ≥230
                </td>
                <td className="responsive-table__body__text responsive-table__body__text--status">
                  <span className="status-indicator status-indicator--inactive"></span>
                  NULL
                </td>
              </tr>
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <div className="text-left">
            <h6 style={{ marginLeft: "7px" }}>
              {" "}
              © 2022 |{" "}
              {/* <a
                href="https://www.neuronenergy.com/"
                onClick={(e) => {
                  e.preventDefault();
                  openLinkInNewWindow("https://www.neuronenergy.com/");
                }}
              >
                Neuron Energy Solutions
              </a>
              . */}
               All rights reserved.
            </h6>
          </div>
          <div style={{ float: "right" }}>
            <a
              href="https://www.linkedin.com/company/neuron-energy-solutions/about/"
              target="_blank"
              onClick={(e) => {
                e.preventDefault();
                openLinkInNewWindow(
                  "https://www.linkedin.com/company/neuron-energy-solutions/about/"
                );
              }}
            >
              <img className="footer-icons" src={linkedin} alt="Logo" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100051469122856"
              target="_blank"
              onClick={(e) => {
                e.preventDefault();
                openLinkInNewWindow(
                  "https://www.facebook.com/profile.php?id=100051469122856"
                );
              }}
            >
              <img className="footer-icons" src={facebook} alt="Facebook" />
            </a>
            <a
              href="https://twitter.com/SolarEye_PV"
              target="_blank"
              onClick={(e) => {
                e.preventDefault();
                openLinkInNewWindow("https://twitter.com/SolarEye_PV");
              }}
            >
              <img className="footer-icons" src={twitter} alt="Twitter" />
            </a>
            <a
              href="https://gr.pinterest.com/solareye/"
              target="_blank"
              onClick={(e) => {
                e.preventDefault();
                openLinkInNewWindow("https://gr.pinterest.com/solareye/");
              }}
            >
              <img className="footer-icons" src={pinterest} alt="Pinterest" />
            </a>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Legend;

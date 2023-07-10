import React, { useEffect, useState, Fragment } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/graphLoading.css";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DatePicker from "./DatePicker";
import GraphsLoader from "./GraphsLoader";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import ScrollToTop from "react-scroll-to-top";
import ChartBigger from "../components/ChartBig";
import GaugeChart from "../components/GaugeChart";
import { convertDegreesCToSymbol, convertSubscriptTagsToCharacters } from "./Map";
import "@fontsource/roboto/400.css";
import o3 from "../img/o3.png";
import temperature from "../img/thermometer.png";
import humidity from "../img/humidity.png";
import pm1 from "../img/pm1.png";
import pm10 from "../img/pm10.png";
import pm25 from "../img/pm25.png";
import so2 from "../img/so2.png";
import no from "../img/no.png";
import no2 from "../img/no2.png";
import pressure from "../img/pressure.jpg";

const TableAsset = React.lazy(() => import("../components/Table"));
const SumAsset = React.lazy(() => import("../components/StatisticNavbar"));
const NavAsset = React.lazy(() => import("../components/GraphNavbar"));
const TopAsset = React.lazy(() => import("../components/GraphTopbar"));
const NavbarAsset = React.lazy(() => import("../components/Navbar"));
const ChartAsset = React.lazy(() => import("../components/Chart"));

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

const Graphs = React.memo(() => {
  const [isLoading1, setIsLoading1] = useState(true);
  const [data, setData] = useState([]);
  const location = useLocation();
  const apiToken = "99f344c4-5afd-4962-a7e2-ddbc3467d4c8";
  const [sensorFilter, setSensorFilter] = useState(false);
  const [size, setSize] = useState(false);
  const [arraySize, setArraySize] = useState(false);

  const [timestamps, setTimestamps] = useState([]);
  const [value_3, setValue3] = useState([]);
  const [value_4, setValue4] = useState([]);
  const [value_5, setValue5] = useState([]);
  const [value_6, setValue6] = useState([]);
  const [value_8, setValue8] = useState([]);
  const [value_9, setValue9] = useState([]);
  const [value_10, setValue10] = useState([]);
  const [value_11, setValue11] = useState([]);
  const [value_12, setValue12] = useState([]);
  const [value_13, setValue13] = useState([]);
  const [value_14, setValue14] = useState([]);

  const [isClicked, setIsClicked] = useState(false);
  const [sensor, setSensor] = useState(null);
  const [types, setTypes] = useState(null);
  const [readDates, setReadDates] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [readTimestamps, setReadTimestamps] = useState([]);
  const [readValue3, setReadValue3] = useState([]);
  const [readValue4, setReadValue4] = useState([]);
  const [readValue5, setReadValue5] = useState([]);
  const [readValue6, setReadValue6] = useState([]);
  const [readValue8, setReadValue8] = useState([]);
  const [readValue9, setReadValue9] = useState([]);
  const [readValue10, setReadValue10] = useState([]);
  const [readValue11, setReadValue11] = useState([]);
  const [readValue12, setReadValue12] = useState([]);
  const [readValue13, setReadValue13] = useState([]);
  const [readValue14, setReadValue14] = useState([]);

  const [tableValues, setTableValues] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      //get current date
      const date = new Date();
      let currentDate = `${date.getFullYear()}-${String(
        date.getMonth() + 1
      ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

      const sensorDataPromises = location.state.sensor_type.map(
        async (type, index) => {
          try {
            const response = await axios.get(
              `https://restapi.gaia-platform.eu/rest-api/items/readMeasurements.php`,
              {
                params: {
                  sensor_node_id: location.state.sensor,
                  date: currentDate,
                  sensor_type_id: type,
                  token_auth: apiToken,
                },
              }
            );
            return response.data;
          } catch (error) {
            console.error(`Error fetching data`, error);
            return null;
          }
        }
      );

      setSensor(location.state.sensor);
      setTypes(location.state.sensor_type);

      const sensor = location.state.sensor;
      const measurements = "_measurements";
      const mergedString = `${sensor}${measurements}`;
      setSensorFilter(mergedString);

      const responseData = await Promise.all(sensorDataPromises);
      setArraySize(responseData[0][mergedString].length);
      setData(responseData);

      //get timestamps
      responseData[0][mergedString].map((item, index) => {
        setTimestamps((prev) => [...prev, item["timestamp"]]);
      });

      //get each sensor type data
      responseData.map((data, index) => {
        data[mergedString].map((item, index) => {
          if (item.sensor_type_id === 3)
            setValue3((prev) => [...prev, item["value"]]);
          else if (item.sensor_type_id === 4)
            setValue4((prev) => [...prev, item["value"]]);
          else if (item.sensor_type_id === 5)
            setValue5((prev) => [...prev, item["value"]]);
          else if (item.sensor_type_id === 6)
            setValue6((prev) => [...prev, item["value"]]);
          else if (item.sensor_type_id === 8)
            setValue8((prev) => [...prev, item["value"]]);
          else if (item.sensor_type_id === 9)
            setValue9((prev) => [...prev, item["value"]]);
          else if (item.sensor_type_id === 10)
            setValue10((prev) => [...prev, item["value"]]);
          else if (item.sensor_type_id === 11)
            setValue11((prev) => [...prev, item["value"]]);
          else if (item.sensor_type_id === 12)
            setValue12((prev) => [...prev, item["value"]]);
          else if (item.sensor_type_id === 13)
            setValue13((prev) => [...prev, item["value"]]);
          else if (item.sensor_type_id === 14)
            setValue14((prev) => [...prev, item["value"]]);
        });
      });

      setSize(responseData[responseData.length - 1][mergedString].length);
      setIsLoading1(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (readDates && readDates[sensorFilter] && readDates[sensorFilter][0]) {
      setTableValues([]);
      setReadValue3([]);
      setReadValue4([]);
      setReadValue5([]);
      setReadValue6([]);
      setReadValue8([]);
      setReadValue9([]);
      setReadValue10([]);
      setReadValue11([]);
      setReadValue12([]);
      setReadValue13([]);
      setReadValue14([]);
      readDates[sensorFilter].map((item, index) => {
        if (item.sensor_type_id === 3) {
          setReadTimestamps((prev) => [...prev, item["timestamp"]]);
          setReadValue3((prev) => [...prev, item["value"]]);
        } else if (item.sensor_type_id === 4)
          setReadValue4((prev) => [...prev, item["value"]]);
        else if (item.sensor_type_id === 5)
          setReadValue5((prev) => [...prev, item["value"]]);
        else if (item.sensor_type_id === 6)
          setReadValue6((prev) => [...prev, item["value"]]);
        else if (item.sensor_type_id === 8)
          setReadValue8((prev) => [...prev, item["value"]]);
        else if (item.sensor_type_id === 9)
          setReadValue9((prev) => [...prev, item["value"]]);
        else if (item.sensor_type_id === 10)
          setReadValue10((prev) => [...prev, item["value"]]);
        else if (item.sensor_type_id === 11)
          setReadValue11((prev) => [...prev, item["value"]]);
        else if (item.sensor_type_id === 12)
          setReadValue12((prev) => [...prev, item["value"]]);
        else if (item.sensor_type_id === 13)
          setReadValue13((prev) => [...prev, item["value"]]);
        else if (item.sensor_type_id === 14)
          setReadValue14((prev) => [...prev, item["value"]]);
      });
      setTableValues((prev) => [...prev, readValue3]);
      setTableValues((prev) => [...prev, readValue4]);
      setTableValues((prev) => [...prev, readValue5]);
      setTableValues((prev) => [...prev, readValue6]);
      setTableValues((prev) => [...prev, readValue8]);
      setTableValues((prev) => [...prev, readValue9]);
      setTableValues((prev) => [...prev, readValue10]);
      setTableValues((prev) => [...prev, readValue11]);
      setTableValues((prev) => [...prev, readValue12]);
      setTableValues((prev) => [...prev, readValue13]);
      setTableValues((prev) => [...prev, readValue14]);
    }
  }, [readDates]);

  if (isLoading1) return loadingScreen("Initializing graphs...");

  const handleRedirect = () => {
    navigate("/");
  };

  function handleDatepickerClick(isClicked) {
    setIsClicked(isClicked);
  }

  function handleReadDates(readDates, start, end) {
    setReadDates(readDates);
    setStartDate(start);
    setEndDate(end);
  }

  function formatTime(timeString) {
    const [hours, minutes] = timeString.split(":");
    let time = "";

    if (parseInt(hours) >= 12) {
      time =
        (hours === "12" ? "12" : parseInt(hours) - 12) + ":" + minutes + " PM";
    } else {
      time = hours + ":" + minutes + " AM";
    }

    return time;
  }

  const MemoizedChart = React.memo(ChartAsset);

  return (
    <div style={{ marginTop: "30px" }}>
      <NavbarAsset
        sensorName={location.state.sensor_name}
        lastTimestamp={
          data[data.length - 1][sensorFilter][size - 1]["timestamp"].split(
            " "
          )[0]
        }
        handleRedirect={handleRedirect}
      />
      <ScrollToTop
        smooth
        color="#292725"
        viewBox="0 0 24 24"
        svgPath="M17,13.41,12.71,9.17a1,1,0,0,0-1.42,0L7.05,13.41a1,1,0,0,0,0,1.42,1,1,0,0,0,1.41,0L12,11.29l3.54,3.54a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29A1,1,0,0,0,17,13.41Z"
      />
      <div style={{ paddingTop: "3em" }}>
        <Container fluid>
          <TopAsset
            transmission={formatTime(
              data[data.length - 1][sensorFilter][size - 1]["timestamp"].split(
                " "
              )[1]
            )}
            battery={value_6[value_6.length - 1]}
          />
          <div>
            <Row className="pt-1 mb-3">
              <Container fluid>
                <section
                  className="bg-light"
                  style={{ height: "auto", borderRadius: "4px" }}
                >
                  <Row
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      paddingTop: "15px",
                    }}
                  >
                    <Col
                      lg="2"
                      md="3"
                      sm="4"
                      xs="6"
                      style={{ height: "100px" }}
                      data-aos="fade-right" data-aos-duration="1000"
                    >
                      <Row>
                        <Col style={{display:'block'}}>
                            <Col><b className="val-class">{convertSubscriptTagsToCharacters('O<sub>3</sub>')}</b></Col>
                          <img src={o3} style={{ width: "50px" }}></img>
                          <b className="value-class">{value_3[value_3.length-1]} ppm</b>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <b
                            className="val"
                            style={{ marginLeft: "3em" }}
                          >
                            Range: 0 - 18(ppm)
                          </b>
                        </Col>
                      </Row>
                    </Col>
                    <Col
                      lg="2"
                      md="3"
                      sm="4"
                      xs="6"
                      style={{ height: "100px" }}
                      data-aos="fade-right" data-aos-duration="1000" data-aos-delay="200"
                    >
                      <Row>
                        <Col style={{display:'block'}}>
                            <Col><b className="val-class" style={{marginLeft:'2.8em'}}>{convertSubscriptTagsToCharacters('Temperature')}</b></Col>
                          <img src={temperature} style={{ width: "50px" }}></img>
                          <b className="value-class">{value_4[value_4.length-1]} {convertDegreesCToSymbol('&deg;C')}</b>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <b
                            className="val"
                            style={{ marginLeft: "3em" }}
                          >
                            Range: -40 - 85({convertDegreesCToSymbol('&deg;C')})
                          </b>
                        </Col>
                      </Row>
                    </Col>
                    <Col
                      lg="2"
                      md="3"
                      sm="4"
                      xs="6"
                      style={{ height: "100px" }}
                      data-aos="fade-right" data-aos-duration="1000" data-aos-delay="400"
                    >
                      <Row>
                        <Col style={{display:'block'}}>
                            <Col><b className="val-class" style={{marginLeft:'1.7em'}}>{convertSubscriptTagsToCharacters('Humidity')}</b></Col>
                          <img src={humidity} style={{ width: "50px" }}></img>
                          <b className="value-class">{value_5[value_5.length-1]} %</b>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <b
                            className="val"
                            style={{ marginLeft: "3em" }}
                          >
                            Range: 0 - 100(%)
                          </b>
                        </Col>
                      </Row>
                    </Col>
                    <Col
                      lg="2"
                      md="3"
                      sm="4"
                      xs="6"
                      style={{ height: "100px" }}
                      data-aos="fade-right" data-aos-duration="1000" data-aos-delay="600"
                    >
                      <Row>
                        <Col style={{display:'block'}}>
                            <Col><b className="val-class" style={{marginLeft:'1.5em'}}>{convertSubscriptTagsToCharacters('PM 1.0')}</b></Col>
                          <img src={pm1} style={{ width: "50px" }}></img>
                          <b className="value-class">{value_8[value_8.length-1]} μg/m3</b>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <b
                            className="val"
                            style={{ marginLeft: "3em" }}
                          >
                            Range: 0 - 300(μg/m3)
                          </b>
                        </Col>
                      </Row>
                    </Col>
                 <Col
                      lg="2"
                      md="3"
                      sm="4"
                      xs="6"
                      style={{ height: "100px" }}
                      data-aos="fade-right" data-aos-duration="1000" data-aos-delay="800"
                    >
                      <Row>
                        <Col style={{display:'block'}}>
                            <Col><b className="val-class" style={{marginLeft:'1.5em'}}>{convertSubscriptTagsToCharacters('PM 1.0')}</b></Col>
                          <img src={pm1} style={{ width: "50px" }}></img>
                          <b className="value-class">{value_10[value_10.length-1]} μg/m3</b>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <b
                            className="val"
                            style={{ marginLeft: "3em" }}
                          >
                            Range: 0 - 300(μg/m3)
                          </b>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      paddingTop: "100px",
                    }}
                  >
                <Col
                      lg="2"
                      md="3"
                      sm="4"
                      xs="6"
                      style={{ height: "100px" }}
                      data-aos="fade-right" data-aos-duration="1000"
                    >
                      <Row>
                        <Col style={{display:'block'}}>
                            <Col><b className="val-class" style={{marginLeft:'1.5em'}}>{convertSubscriptTagsToCharacters('PM 2.5')}</b></Col>
                          <img src={pm25} style={{ width: "70px" }}></img>
                          <b className="value-class">{value_9[value_9.length-1]} μg/m3</b>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <b
                            className="val"
                            style={{ marginLeft: "3em" }}
                          >
                            Range: 0 - 300(μg/m3)
                          </b>
                        </Col>
                      </Row>
                    </Col>
                    <Col
                      lg="2"
                      md="3"
                      sm="4"
                      xs="6"
                      style={{ height: "100px" }}
                      data-aos="fade-right" data-aos-duration="1000" data-aos-delay="200"
                    >
                      <Row>
                        <Col style={{display:'block'}}>
                            <Col><b className="val-class" style={{marginLeft:'2.8em'}}>{convertSubscriptTagsToCharacters('SO<sub>2</sub>')}</b></Col>
                          <img src={so2} style={{ width: "80px" }}></img>
                          <b className="value-class">{value_11[value_11.length-1]} {convertSubscriptTagsToCharacters('SO<sub>2</sub>')}</b>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <b
                            className="val"
                            style={{ marginLeft: "3em" }}
                          >
                            Range: 0 - 20(ppm)
                          </b>
                        </Col>
                      </Row>
                    </Col>
                    <Col
                      lg="2"
                      md="3"
                      sm="4"
                      xs="6"
                      style={{ height: "100px" }}
                      data-aos="fade-right" data-aos-duration="1000" data-aos-delay="400"
                    >
                      <Row>
                        <Col style={{display:'block'}}>
                            <Col><b className="val-class" style={{marginLeft:'2.8em'}}>{convertSubscriptTagsToCharacters('NO')}</b></Col>
                          <img src={no} style={{ width: "65px" }}></img>
                          <b className="value-class">{value_12[value_12.length-1]} ppm</b>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <b
                            className="val"
                            style={{ marginLeft: "3em" }}
                          >
                            Range: 0 - 20(ppm)
                          </b>
                        </Col>
                      </Row>
                    </Col>
                    <Col
                      lg="2"
                      md="3"
                      sm="4"
                      xs="6"
                      style={{ height: "100px" }}
                      data-aos="fade-right" data-aos-duration="1000" data-aos-delay="600"
                    >
                      <Row>
                        <Col style={{display:'block'}}>
                            <Col><b className="val-class" style={{marginLeft:'2.8em'}}>{convertSubscriptTagsToCharacters('NO<sub>2</sub>')}</b></Col>
                          <img src={no2} style={{ width: "65px" }}></img>
                          <b className="value-class">{value_12[value_12.length-1]} {convertSubscriptTagsToCharacters('NO<sub>2</sub>')}</b>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <b
                            className="val"
                            style={{ marginLeft: "3em" }}
                          >
                            Range: 0 - 20(ppm)
                          </b>
                        </Col>
                      </Row>
                    </Col>
                    <Col
                      lg="2"
                      md="3"
                      sm="4"
                      xs="6"
                      style={{ height: "170px" }}
                      data-aos="fade-right" data-aos-duration="1000" data-aos-delay="800"
                    >
                      <Row>
                        <Col style={{display:'block'}}>
                            <Col><b className="val-class" style={{marginLeft:'2.8em'}}>{convertSubscriptTagsToCharacters('Pressure')}</b></Col>
                          <img src={pressure} style={{ width: "65px" }}></img>
                          <b className="value-class">{value_14[value_14.length-1]} Pa</b>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <b
                            className="val"
                            style={{ marginLeft: "3em" }}
                          >
                            Range: 30000 - 110000(Pa)
                          </b>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </section>
              </Container>
            </Row>
          </div>
        </Container>
        <Container fluid>
          <Row>
            <Col lg="6" sm="12" xs="12" className="mb-3 mb-sm-2 mb-md-2">
              <MemoizedChart
                xValues={timestamps}
                yValues={value_3}
                title={convertSubscriptTagsToCharacters("O<sub>3</sub>")}
                measurementUnit={"ppm"}
              />
            </Col>
            <Col lg="6" sm="12" xs="12" className="mb-3 mb-sm-2 mb-md-2">
              <MemoizedChart
                xValues={timestamps}
                yValues={value_4}
                title={"Environment Temperature"}
                measurementUnit={convertSubscriptTagsToCharacters("°C")}
              />
            </Col>
          </Row>
          <Row className="pt-1 mb-1">
            <Col lg="6" sm="12" xs="12" className="mb-3 mb-sm-2 mb-md-2">
              <MemoizedChart
                xValues={timestamps}
                yValues={value_5}
                title={"Humidity"}
                measurementUnit={"%"}
              />
            </Col>
            <Col lg="6" sm="12" xs="12" className="mb-3 mb-sm-2 mb-md-2">
              <MemoizedChart
                xValues={timestamps}
                yValues={value_6}
                title={"Battery"}
                measurementUnit={"%"}
              />
            </Col>
          </Row>
          <Row className="pt-1 mb-1">
            <Col lg="6" sm="12" xs="12" className="mb-3 mb-sm-2 mb-md-2">
              <MemoizedChart
                xValues={timestamps}
                yValues={value_8}
                title={"PM 1.0"}
                measurementUnit={convertSubscriptTagsToCharacters("μg/m3")}
              />
            </Col>
            <Col lg="6" sm="12" xs="12" className="mb-3 mb-sm-2 mb-md-2">
              <MemoizedChart
                xValues={timestamps}
                yValues={value_9}
                title={"PM 2.5"}
                measurementUnit={convertSubscriptTagsToCharacters("μg/m3")}
              />
            </Col>
          </Row>
          <Row className="pt-1 mb-1">
            <Col lg="6" sm="12" xs="12" className="mb-3 mb-sm-2 mb-md-2">
              <MemoizedChart
                xValues={timestamps}
                yValues={value_10}
                title={"PM 10"}
                measurementUnit={convertSubscriptTagsToCharacters("μg/m3")}
              />
            </Col>
            <Col lg="6" sm="12" xs="12" className="mb-3 mb-sm-2 mb-md-2">
              <MemoizedChart
                xValues={timestamps}
                yValues={value_11}
                title={convertSubscriptTagsToCharacters("SO<sub>2</sub>")}
                measurementUnit={"ppm"}
              />
            </Col>
          </Row>
          <Row className="pt-1 mb-1" style={{ borderRadius: "4px" }}>
            <Col lg="6" sm="12" xs="12" className="mb-3 mb-sm-2 mb-md-2">
              <MemoizedChart
                xValues={timestamps}
                yValues={value_12}
                title={"NO"}
                measurementUnit={"ppm"}
              />
            </Col>
            <Col lg="6" sm="12" xs="12" className="mb-3 mb-sm-2 mb-md-2">
              <MemoizedChart
                xValues={timestamps}
                yValues={value_13}
                title={convertSubscriptTagsToCharacters("NO<sub>2</sub>")}
                measurementUnit={"ppm"}
              />
            </Col>
          </Row>
          <Row className="pt-1 mb-3">
            <Col lg="12" sm="12" xs="12" className="mb-3 mb-sm-2 mb-md-2">
              <MemoizedChart
                xValues={timestamps}
                yValues={value_14}
                title={"Pressure"}
                measurementUnit={"Pa"}
              />
            </Col>
          </Row>
        </Container>
      </div>
      <div>
        <a
          className="tooltip-asset"
          data-tooltip-id="my-tooltip"
          data-tooltip-content="Select between two dates to show specific measurements."
          data-tooltip-place="right"
          data-tooltip-offset="6"
        >
          <DatePicker
            callback={handleDatepickerClick}
            sensor={sensor}
            handleData={handleReadDates}
          />
        </a>
        <Tooltip id="my-tooltip" />
        {isClicked && <GraphsLoader />}
        {readDates &&
          readDates[sensorFilter] &&
          readDates[sensorFilter][0] &&
          !isClicked && (
            <>
              <Container fluid style={{ marginTop: "1em" }}>
                <SumAsset />
                <div style={{ marginTop: "0.1em" }}>
                  <Row className="pt-1 mb-3">
                    <Container fluid>
                      <section className="bg-light" style={{ height: "auto" }}>
                        <TableAsset
                          value_3={readValue3}
                          value_4={readValue4}
                          value_5={readValue5}
                          value_6={readValue6}
                          value_8={readValue8}
                          value_9={readValue9}
                          value_10={readValue10}
                          value_11={readValue11}
                          value_12={readValue12}
                          value_13={readValue13}
                          value_14={readValue14}
                        />
                      </section>
                    </Container>
                  </Row>
                </div>

                <NavAsset start={startDate} end={endDate} />
                <div style={{ marginTop: "0.1em" }}>
                  <Row className="pt-1 mb-3 h-75">
                    <Col
                      lg="12"
                      sm="12"
                      xs="12"
                      className="mb-3 mb-sm-2 mb-md-2"
                    >
                      <ChartBigger
                        xValues={readTimestamps}
                        yValues={readValue3}
                        title={convertSubscriptTagsToCharacters(
                          "O<sub>3</sub>"
                        )}
                        measurementUnit={"ppm"}
                      />
                    </Col>
                  </Row>
                  <Row className="pt-1 mb-3">
                    <Col
                      lg="12"
                      sm="12"
                      xs="12"
                      className="mb-3 mb-sm-2 mb-md-2"
                    >
                      <ChartBigger
                        xValues={readTimestamps}
                        yValues={readValue4}
                        title={"Environment Temperature"}
                        measurementUnit={convertSubscriptTagsToCharacters("°C")}
                      />
                    </Col>
                  </Row>
                  <Row className="pt-1 mb-3">
                    <Col
                      lg="12"
                      sm="12"
                      xs="12"
                      className="mb-3 mb-sm-2 mb-md-2"
                    >
                      <ChartBigger
                        xValues={readTimestamps}
                        yValues={readValue5}
                        title={"Humidity"}
                        measurementUnit={"%"}
                      />
                    </Col>
                  </Row>
                  <Row className="pt-1 mb-3">
                    <Col
                      lg="12"
                      sm="12"
                      xs="12"
                      className="mb-3 mb-sm-2 mb-md-2"
                    >
                      <ChartBigger
                        xValues={readTimestamps}
                        yValues={readValue6}
                        title={"Battery"}
                        measurementUnit={"%"}
                      />
                    </Col>
                  </Row>
                  <Row className="pt-1 mb-3">
                    <Col
                      lg="12"
                      sm="12"
                      xs="12"
                      className="mb-3 mb-sm-2 mb-md-2"
                    >
                      <ChartBigger
                        xValues={readTimestamps}
                        yValues={readValue8}
                        title={"PM 1.0"}
                        measurementUnit={convertSubscriptTagsToCharacters(
                          "μg/m3"
                        )}
                      />
                    </Col>
                  </Row>
                  <Row className="pt-1 mb-3">
                    <Col
                      lg="12"
                      sm="12"
                      xs="12"
                      className="mb-3 mb-sm-2 mb-md-2"
                    >
                      <ChartBigger
                        xValues={readTimestamps}
                        yValues={readValue9}
                        title={"PM 2.5"}
                        measurementUnit={convertSubscriptTagsToCharacters(
                          "μg/m3"
                        )}
                      />
                    </Col>
                  </Row>
                  <Row className="pt-1 mb-3">
                    <Col
                      lg="12"
                      sm="12"
                      xs="12"
                      className="mb-3 mb-sm-2 mb-md-2"
                    >
                      <ChartBigger
                        xValues={readTimestamps}
                        yValues={readValue10}
                        title={"PM 10"}
                        measurementUnit={convertSubscriptTagsToCharacters(
                          "μg/m3"
                        )}
                      />
                    </Col>
                  </Row>
                  <Row className="pt-1 mb-3">
                    <Col
                      lg="12"
                      sm="12"
                      xs="12"
                      className="mb-3 mb-sm-2 mb-md-2"
                    >
                      <ChartBigger
                        xValues={readTimestamps}
                        yValues={readValue11}
                        title={convertSubscriptTagsToCharacters(
                          "SO<sub>2</sub>"
                        )}
                        measurementUnit={"ppm"}
                      />
                    </Col>
                  </Row>
                  <Row className="pt-1 mb-3">
                    <Col
                      lg="12"
                      sm="12"
                      xs="12"
                      className="mb-3 mb-sm-2 mb-md-2"
                    >
                      <ChartBigger
                        xValues={readTimestamps}
                        yValues={readValue12}
                        title={convertSubscriptTagsToCharacters("NO")}
                        measurementUnit={"ppm"}
                      />
                    </Col>
                  </Row>
                  <Row className="pt-1 mb-3">
                    <Col
                      lg="12"
                      sm="12"
                      xs="12"
                      className="mb-3 mb-sm-2 mb-md-2"
                    >
                      <ChartBigger
                        xValues={readTimestamps}
                        yValues={readValue13}
                        title={convertSubscriptTagsToCharacters(
                          "NO<sub>2</sub>"
                        )}
                        measurementUnit={"ppm"}
                      />
                    </Col>
                  </Row>
                  <Row className="pt-1 mb-3">
                    <Col
                      lg="12"
                      sm="12"
                      xs="12"
                      className="mb-3 mb-sm-2 mb-md-2"
                    >
                      <ChartBigger
                        xValues={readTimestamps}
                        yValues={readValue14}
                        title={"Pressure"}
                        measurementUnit={"Pa"}
                      />
                    </Col>
                  </Row>
                </div>
              </Container>
            </>
          )}
      </div>
    </div>
  );
});

export default Graphs;

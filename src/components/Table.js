import React from "react";
import "../css/graphLoading.css";
import {convertSubscriptTagsToCharacters, convertDegreesCToSymbol} from "./Map";

export default function Table({
                                  value_3,
                                  value_4,
                                  value_5,
                                  value_6,
                                  value_8,
                                  value_9,
                                  value_10,
                                  value_11,
                                  value_12,
                                  value_13,
                                  value_14
                              }) {
    return (
        <div>
            <table className="table">
                <thead>
                <tr>
                    <th></th>
                    <th>{convertSubscriptTagsToCharacters('O<sub>3</sub>')}</th>
                    <th>Temperature</th>
                    <th>Humidity</th>
                    <th>Battery</th>
                    <th>PM 1.0</th>
                    <th>PM 2.5</th>
                    <th>PM 10</th>
                    <th>{convertSubscriptTagsToCharacters('SO<sub>2</sub>')}</th>
                    <th>{convertSubscriptTagsToCharacters('NO')}</th>
                    <th>{convertSubscriptTagsToCharacters('NO<sub>2</sub>')}</th>
                    <th>Pressure</th>
                </tr>
                </thead>

                <tbody>
                <tr>
                    <td><b>Average Values</b></td>
                    <td>{value_3.length === 0 ? '0' : (value_3.reduce((x, y) => x + y) / value_3.length === 0 ? 0 : (value_3.reduce((x, y) => x + y) / value_3.length).toFixed(2)) + ' ppm'}</td>
                    <td>{value_4.length === 0 ? '0' : (value_4.reduce((x, y) => x + y) / value_4.length === 0 ? 0 : (value_4.reduce((x, y) => x + y) / value_4.length).toFixed(2)) + ' ' + convertDegreesCToSymbol('&deg;C')}</td>
                    <td>{value_5.length === 0 ? '0' : (value_5.reduce((x, y) => x + y) / value_5.length === 0 ? 0 : (value_5.reduce((x, y) => x + y) / value_5.length).toFixed(2)) + ' %'}</td>
                    <td>{value_6.length === 0 ? '0' : (value_6.reduce((x, y) => x + y) / value_6.length === 0 ? 0 : (value_6.reduce((x, y) => x + y) / value_6.length).toFixed(2)) + ' %'}</td>
                    <td>{value_8.length === 0 ? '0' : (value_8.reduce((x, y) => x + y) / value_8.length === 0 ? 0 : (value_8.reduce((x, y) => x + y) / value_8.length).toFixed(2)) + ' μg/m3'}</td>
                    <td>{value_9.length === 0 ? '0' : (value_9.reduce((x, y) => x + y) / value_9.length === 0 ? 0 : (value_9.reduce((x, y) => x + y) / value_9.length).toFixed(2)) + ' μg/m3'}</td>
                    <td>{value_10.length === 0 ? '0' : (value_10.reduce((x, y) => x + y) / value_10.length === 0 ? 0 : (value_10.reduce((x, y) => x + y) / value_10.length).toFixed(2)) + ' μg/m3'}</td>
                    <td>{value_11.length === 0 ? '0' : ((value_11.reduce((x, y) => x + y) / value_11.length) === 0 ? '0' : (value_11.reduce((x, y) => x + y) / value_11.length).toFixed(2)) + ' ppm'}</td>
                    <td>{value_12.length === 0 ? '0' : (value_12.reduce((x, y) => x + y) / value_12.length === 0 ? 0 : (value_12.reduce((x, y) => x + y) / value_12.length).toFixed(2)) + ' ppm'}</td>
                    <td>{value_13.length === 0 ? '0' : (value_13.reduce((x, y) => x + y) / value_13.length === 0 ? 0 : (value_13.reduce((x, y) => x + y) / value_13.length).toFixed(2)) + ' ppm'}</td>
                    <td>{value_14.length === 0 ? '0' : (value_14.reduce((x, y) => x + y) / value_14.length === 0 ? 0 : (value_14.reduce((x, y) => x + y) / value_14.length).toFixed(2)) + ' Pa'}</td>
                </tr>

                <tr>
                    <td><b>Maximum Values</b></td>
                    <td>{Math.max(...value_3)} ppm</td>
                    <td>{Math.max(...value_4)} {convertDegreesCToSymbol('&deg;C')}</td>
                    <td>{Math.max(...value_5)} %</td>
                    <td>{Math.max(...value_6)} %</td>
                    <td>{Math.max(...value_8)} μg/m3</td>
                    <td>{Math.max(...value_9)} μg/m3</td>
                    <td>{Math.max(...value_10)} μg/m3</td>
                    <td>{Math.max(...value_11)} ppm</td>
                    <td>{Math.max(...value_12)} ppm</td>
                    <td>{Math.max(...value_13)} ppm</td>
                    <td>{Math.max(...value_14)} Pa</td>
                </tr>

                <tr>
                    <td><b>Minimum Values</b></td>
                    <td>{Math.min(...value_3)} ppm</td>
                    <td>{Math.min(...value_4)} {convertDegreesCToSymbol('&deg;C')}</td>
                    <td>{Math.min(...value_5)} %</td>
                    <td>{Math.min(...value_6)} %</td>
                    <td>{Math.min(...value_8)} μg/m3</td>
                    <td>{Math.min(...value_9)} μg/m3</td>
                    <td>{Math.min(...value_10)} μg/m3</td>
                    <td>{Math.min(...value_11)} ppm</td>
                    <td>{Math.min(...value_12)} ppm</td>
                    <td>{Math.min(...value_13)} ppm</td>
                    <td>{Math.min(...value_14)} Pa</td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}
import React from "react";
import "../css/TableGraphs.css";
import { convertSubscriptTagsToCharacters } from "./Map";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

export default function Table() {
    return (
        <div class="container" style={{ paddingBottom: '4em' }}>
            <table class="rwd-table">
                <tbody>
                    <tr>
                        <th style={{ display: 'flex', justifyContent: 'center' }}> <FontAwesomeIcon icon={faList}
                            style={{ height: '22px' }} /></th>
                        <th>Temperature</th>
                        <th>Humidity</th>
                        <th>Battery</th>
                        <th>PM 1.0</th>
                        <th>PM 2.5</th>
                        <th>PM 10</th>
                        <th>{convertSubscriptTagsToCharacters('SO<sub>2</sub>')}</th>
                        <th>{convertSubscriptTagsToCharacters('NO')}</th>
                        <th>{convertSubscriptTagsToCharacters('NO<sub>2</sub>')}</th>
                        <th>{convertSubscriptTagsToCharacters('O<sub>3</sub>')}</th>
                        <th>Pressure</th>
                    </tr>
                    <tr>
                        <td style={{ fontWeight: 'bold' }}>
                            Average Values
                        </td>
                        <td>
                            20
                        </td>
                        <td>
                            20
                        </td>
                        <td>
                            20
                        </td>
                        <td>
                            20
                        </td>
                        <td>
                            20
                        </td>
                        <td>
                            20
                        </td>
                        <td>
                            20
                        </td>
                        <td>
                            20
                        </td>
                        <td>
                            20
                        </td>
                        <td>
                            20
                        </td>
                        <td>
                            20
                        </td>
                    </tr>
                    <tr>
                        <td style={{ fontWeight: 'bold' }}>
                            Max Values
                        </td>
                        <td>
                            20
                        </td>
                        <td>
                            20
                        </td>
                        <td>
                            20
                        </td>
                        <td>
                            20
                        </td>
                        <td>
                            20
                        </td>
                        <td>
                            20
                        </td>
                        <td>
                            20
                        </td>
                        <td>
                            20
                        </td>
                        <td>
                            20
                        </td>
                        <td>
                            20
                        </td>
                        <td>
                            20
                        </td>
                    </tr>
                    <tr>
                        <td style={{ fontWeight: 'bold' }}>
                            Min Values
                        </td>
                        <td>
                            20
                        </td>
                        <td>
                            20
                        </td>
                        <td>
                            20
                        </td>
                        <td>
                            20
                        </td>
                        <td>
                            20
                        </td>
                        <td>
                            20
                        </td>
                        <td>
                            20
                        </td>
                        <td>
                            20
                        </td>
                        <td>
                            20
                        </td>
                        <td>
                            20
                        </td>
                        <td>
                            20
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
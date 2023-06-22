import React from "react";
import "../css/graphLoading.css";
import { convertSubscriptTagsToCharacters } from "./Map";

export default function Table() {
    return (
      <div>
          <table className="table">
              <thead>
              <tr>
              <th></th>
              <th>PM 1.0</th>
              <th>PM 2.5</th>
              <th>PM 10</th>
              <th>Temperature</th>
              <th>Humidity</th>
              <th>Pressure</th>
              <th>{convertSubscriptTagsToCharacters('SO<sub>2</sub>')}</th>
              <th>{convertSubscriptTagsToCharacters('O<sub>3</sub>')}</th>
              <th>{convertSubscriptTagsToCharacters('NO')}</th>
              <th>{convertSubscriptTagsToCharacters('NO<sub>2</sub>')}</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                  <td data-label="S.No"><b>Average Values</b></td>
                  <td data-label="Name">Dinesh</td>
                  <td data-label="Age">34</td>
                  <td data-label="Marks%">50%</td>
                  <td data-label="Staus">Passed</td>
                  <td data-label="Staus">Passed</td>
                  <td data-label="Staus">Passed</td>
                  <td data-label="Staus">Passed</td>
                  <td data-label="Staus">Passed</td>
                  <td data-label="Staus">Passed</td>
                  <td data-label="Staus">Passed</td>

              </tr>

              <tr>
                  <td data-label="S.No"><b>Maximum Values</b></td>
                  <td data-label="Name">Kamal</td>
                  <td data-label="Age">23</td>
                  <td data-label="Marks%">70%</td>
                  <td data-label="Staus">Passed</td>
                  <td data-label="Staus">Passed</td>
                  <td data-label="Staus">Passed</td>
                  <td data-label="Staus">Passed</td>
                  <td data-label="Staus">Passed</td>
                  <td data-label="Staus">Passed</td>
                  <td data-label="Staus">Passed</td>

              </tr>

              <tr>
                  <td data-label="S.No"><b>Minimum Values</b></td>
                  <td data-label="Name">Neha</td>
                  <td data-label="Age">20</td>
                  <td data-label="Marks%">90%</td>
                  <td data-label="Staus">Passed</td>
                  <td data-label="Staus">Passed</td>
                  <td data-label="Staus">Passed</td>
                  <td data-label="Staus">Passed</td>
                  <td data-label="Staus">Passed</td>
                  <td data-label="Staus">Passed</td>
                  <td data-label="Staus">Passed</td>

              </tr>
              </tbody>
          </table>
        </div>
    )
}
import React, {useEffect} from 'react';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import '../css/Calendar.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCalendarDays} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default function DatePicker({callback, sensor, handleData}) {

    function handleButtonClick(event, picker) {
        callback(true);
        const apiToken = "99f344c4-5afd-4962-a7e2-ddbc3467d4c8";
        const endDate = picker.endDate._d;
        const startDate = picker.startDate._d;

        const formattedStartDate = new Date(startDate.getTime() - startDate.getTimezoneOffset() * 60000).toISOString().split('T')[0];
        const formattedEndDate = new Date(endDate.getTime() - endDate.getTimezoneOffset() * 60000).toISOString().split('T')[0];

        const fetchData = async () => {
            try {
                const response1 = await axios.get(
                    `https://restapi.gaia-platform.eu/rest-api/items/readDates.php`,
                    {
                        params: {
                            sensor_node_id: sensor,
                            date1: formattedStartDate,
                            date2: formattedEndDate,
                            token_auth: apiToken
                        }
                    }
                );

                handleData(response1.data, formattedStartDate, formattedEndDate);
                callback(false);
            } catch (error) {
                console.error(`Error fetching data`, error);
                return null;
            }
        }
        fetchData();
    }

    return (
        <DateRangePicker onApply={handleButtonClick}>
            <button className="custom-button" style={{marginBottom: '0.5rem'}}>
                Choose dates &nbsp;&nbsp;
                <FontAwesomeIcon icon={faCalendarDays}/>
            </button>
        </DateRangePicker>
    );
}

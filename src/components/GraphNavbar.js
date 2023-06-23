import React from 'react';
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarItem,
    MDBNavbarNav,
} from 'mdb-react-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPieChart } from '@fortawesome/free-solid-svg-icons';
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'

export default function GraphNavbar({ start, end }) {
    return (

        <MDBNavbar style={{ backgroundColor: '#292725', height: '3em',borderRadius:'4px' }}>
            <MDBContainer fluid>
                <MDBNavbarItem className='justify-content-center d-flex w-auto'>
                    <MDBNavbarNav>
                        <div>
                            <FontAwesomeIcon icon={faPieChart} style={{ color: 'white', marginRight: '10px' }} />
                            <span
                                style={{ color: 'white' }}>Data Analysis for selected date range:&nbsp;
                                <a style={{textDecoration: 'none', color: 'white'}}
                                    className="tooltip-asset"
                                    data-tooltip-id="my-tooltip"
                                    data-tooltip-content="Click on each graph to zoom for a more detailed view."
                                    data-tooltip-place="top"
                                    data-tooltip-offset="6"
                                >
                                     {start} to {end}.

                                </a>
                                <Tooltip id="my-tooltip" />
                            </span>
                        </div>
                    </MDBNavbarNav>
                </MDBNavbarItem>
            </MDBContainer>
        </MDBNavbar>

    );
}

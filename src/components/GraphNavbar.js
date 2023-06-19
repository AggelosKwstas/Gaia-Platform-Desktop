import React from 'react';
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarItem,
    MDBNavbarNav,
} from 'mdb-react-ui-kit';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPieChart} from '@fortawesome/free-solid-svg-icons';

export default function GraphNavbar({start, end}) {
    return (

        <MDBNavbar style={{backgroundColor: '#292725', height: '3em'}}>
            <MDBContainer fluid>
                <MDBNavbarItem className='justify-content-center d-flex w-auto'>
                    <MDBNavbarNav>
                        <div>
                            <FontAwesomeIcon icon={faPieChart} style={{color: 'white', marginRight: '10px'}}/>
                            <span
                                style={{color: 'white'}}>Data Analysis for selected date range: {start} to {end}.</span>
                        </div>
                    </MDBNavbarNav>
                </MDBNavbarItem>
            </MDBContainer>
        </MDBNavbar>

    );
}

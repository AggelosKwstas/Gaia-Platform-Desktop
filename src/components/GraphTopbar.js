import React from 'react';
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarItem,
    MDBNavbarNav,
} from 'mdb-react-ui-kit';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChartSimple} from '@fortawesome/free-solid-svg-icons';

export default function GraphTopbar({transmission}) {
    return (

        <MDBNavbar style={{backgroundColor: '#292725', height:'3em'}}>
            <MDBContainer fluid>
                <MDBNavbarItem className='justify-content-center d-flex w-auto'>
                    <MDBNavbarNav>
                        <div>
                            <FontAwesomeIcon icon={faChartSimple} style={{color: 'white', marginRight: '10px'}}/>
                            <span
                                style={{color: 'white'}}>Showing values for most recent transmission: {transmission}. </span>
                        </div>
                    </MDBNavbarNav>
                </MDBNavbarItem>
            </MDBContainer>
        </MDBNavbar>

    );
}

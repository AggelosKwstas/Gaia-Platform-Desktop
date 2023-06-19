import React from 'react';
import logo from '../img/Logo Gaia Platform.png';
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarItem,
    MDBNavbarNav,
} from 'mdb-react-ui-kit';

export default function Navbar({sensorName, lastTimestamp, handleRedirect}) {
    return (
        <MDBNavbar expand='lg' light bgColor="white" className="shadow">
            <MDBContainer fluid>
                <MDBNavbarBrand onClick={handleRedirect}>
                    <img
                        style={{display: 'block', margin: '0 auto', width: '160px', cursor: 'pointer'}}
                        src={logo}
                        alt="Logo"
                        title="Go back"
                    />
                </MDBNavbarBrand>

                <MDBNavbarItem className='justify-content-center d-flex w-auto'>
                    <MDBNavbarNav>
                        <b>{sensorName} Air Monitor - Environmental PRO</b>
                    </MDBNavbarNav>
                </MDBNavbarItem>

                <MDBNavbarItem className='d-flex w-auto'>
                    <MDBNavbarNav>
                        <b>{lastTimestamp}</b>
                    </MDBNavbarNav>
                </MDBNavbarItem>
            </MDBContainer>
        </MDBNavbar>
    );
}

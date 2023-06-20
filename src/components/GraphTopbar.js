import React from 'react';
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarItem,
    MDBNavbarNav,
} from 'mdb-react-ui-kit';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import BatteryGauge from 'react-battery-gauge'



export default function GraphTopbar({ transmission,battery }) {
    return (

        <MDBNavbar style={{ backgroundColor: '#292725', height: '3em' }}>
            <MDBContainer fluid>
                <MDBNavbarItem className='justify-content-center d-flex w-auto'>
                    <MDBNavbarNav>
                        <div>
                            <SignalCellularAltIcon style={{ color: 'white', marginRight: '10px' }} />
                            <span
                                style={{ color: 'white' }}>Showing values for most recent transmission: {transmission}. </span>
                        </div>
                    </MDBNavbarNav>
                </MDBNavbarItem>
                <div style={{ float: 'right' }}>
      <span style={{ color: 'white' }}>Station battery:</span>
      <BatteryGauge
        value={battery}
        animated={true}
        style={{ width: '50px', marginLeft: '0.5em', height: '30px', color: 'white' }}
      />
    </div>
            </MDBContainer>
        </MDBNavbar>

    );
}

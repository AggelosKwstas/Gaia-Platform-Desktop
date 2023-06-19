import React from "react";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export default function CustomTooltip() {
    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            <h6>
                Click on each color code to filter stations.
            </h6>
        </Tooltip>
    );

    return (
        <OverlayTrigger
            placement="right"
            delay={{show: 250, hide: 400}}
            overlay={renderTooltip}
        >
            {({ref, ...triggerHandler}) => (
                <span {...triggerHandler} ref={ref}>
                     Air Quality
                </span>
            )}
        </OverlayTrigger>
    );
}

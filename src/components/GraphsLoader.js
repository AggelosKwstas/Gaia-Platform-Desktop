import React from 'react';

function GraphsLoader() {
    return (
        <>
            <div style={{paddingBottom:'2em'}}>
                <b>Processing time of this task may vary based on the input provided.</b>
            </div>
            <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </>
    );
}

export default GraphsLoader;

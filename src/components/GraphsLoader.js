import React from 'react';

function GraphsLoader() {
    return (
        <div style={{textAlign:'center'}}>
            <div style={{ paddingBottom: '2em' }}>
                <b>Processing time of this task may vary based on the input provided.</b>
            </div>
            <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    );
}

export default GraphsLoader;

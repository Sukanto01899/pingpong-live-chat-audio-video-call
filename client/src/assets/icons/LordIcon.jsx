import React from 'react';

const LordIcon = ({icon, width = "18px", play = "hover"}) => {
    return (
        <>
            <lord-icon
                src={`https://cdn.lordicon.com/${icon}.json`}
                trigger={play}
                stroke="bold"
                colors="primary:#c7166f,secondary:#e8308c"
                style={{ width: `${width}px` }}>
            </lord-icon>
        </>
    );
};

export default LordIcon;
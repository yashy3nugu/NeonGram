import { SpinnerCircular } from 'spinners-react';

import React from 'react'

const SpinnerIcon = ({enabled,size,styles}) => {
    return (
        <SpinnerCircular enabled={enabled} size={size} className={styles} color={"#7527f5"} secondaryColor={"rgba(0,0,0,0)"} speed={150} />
    )
}

export default SpinnerIcon

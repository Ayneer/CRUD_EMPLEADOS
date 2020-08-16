import React from 'react';
import LoadingState from '..';

const AllPage = ({message}) => {
    return (
        <div className="loading-state-all-page" >
            <LoadingState message={message} />
        </div>
    )
}

export default AllPage;
import React from 'react';
import PropTypes from 'prop-types';

const ProgressBar = ({ percentage }) => {
    return (
        <div className='progress'>
            <div
                className='for-ProgressBar progress-bar-striped bg-success'
                role='progressbar'
                aria-valuenow={percentage}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: `${percentage}%` }}
            >
                {percentage}%
            </div>
        </div>
    );
};

ProgressBar.propTypes = {
    percentage: PropTypes.number.isRequired
};

export default ProgressBar;
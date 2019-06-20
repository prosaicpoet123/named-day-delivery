import React from 'react';
import PropTypes from 'prop-types';

import Carousel from './components/carousel';

const NamedDayDeliverySelector = ({ deliverydays }) => (
    <div>
        <h3>Choose a day:</h3>
        <Carousel {...deliverydays} />
    </div>
);

NamedDayDeliverySelector.defaultProps = {
    deliverydays: {}
};

NamedDayDeliverySelector.propTypes = {
    deliverydays: PropTypes.instanceOf(Object)
};

export default NamedDayDeliverySelector;

import React from 'react';

import Carousel from './components/carousel';

const data = [
    {
        day: 'Monday'
    },
    {
        day: 'Tuesday'
    },
    {
        day: 'Wednesday'
    },
    {
        day: 'Thursday'
    },
    {
        day: 'Friday'
    },

]

const NamedDayDeliverySelector = () => {
    return (
        <div>
            <Carousel />
        </div>
    )
}

export default NamedDayDeliverySelector;
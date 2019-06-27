import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Carousel from './components/carousel';

class NamedDayDeliverySelector extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            selected: ''
        };

        this.selectDate = this.selectDate.bind(this);
    }

    selectDate(bookingCode) {
        this.setState({ selected: bookingCode });
    }

    render() {
        const { selected } = this.state;
        const { deliverydays } = this.props;
        return (
            <div>
                <h3>Choose a day:</h3>
                <Carousel
                    {...deliverydays}
                    selected={selected}
                    onSelect={this.selectDate}
                />
                <input type="hidden" value={selected} name="bookingCode" />
            </div>
        );
    }
}

NamedDayDeliverySelector.defaultProps = {
    deliverydays: {}
};

NamedDayDeliverySelector.propTypes = {
    deliverydays: PropTypes.instanceOf(Object)
};

export default NamedDayDeliverySelector;

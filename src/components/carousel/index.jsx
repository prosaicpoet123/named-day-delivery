import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

class Carousel extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            selected: 0
        };
    }

    render() {
        const settings = {
            dots: false,
            infinite: false,
            speed: 200,
            slidesToShow: 5,
            slidesToScroll: 1
        };

        const {
            selected
        } = this.state;

        const {
            dates
        } = this.props;

        if (!dates.length) {
            // in case we get no data back
            return <div>Sorry something went wrong! Please try refreshing the page...</div>;
        }

        const radioStyles = {
            visibility: 'hidden',
            height: '0px',
            width: '0px',
            padding: '0px',
            margin: '0px',
            overflow: 'hidden',
            position: 'absolute'
        };

        return (
            <Slider {...settings}>
                {dates.map((date, index) => (
                    <label
                        htmlFor={`${date.day}-${index}`}
                        className={`carousel-item ${selected === index ? 'carousel-item-selected' : ''} ${!date.available ? 'carousel-item-disabled' : ''}`}
                        key={`${date} ${index}`}
                    >
                        <p>{date.day}</p>
                        <p>{date.price}</p>
                        <input
                            type="radio"
                            name="Day"
                            id={`${date.day}-${index}`}
                            style={radioStyles}
                            onChange={() => this.setState({ selected: index })}
                            aria-checked={selected === index && 'checked'}
                            disabled={!date.available}
                        />
                    </label>
                ))}
            </Slider>
        );
    }
}

Carousel.defaultProps = {
    dates: []
};

Carousel.propTypes = {
    dates: PropTypes.instanceOf(Array)
};

export default Carousel;

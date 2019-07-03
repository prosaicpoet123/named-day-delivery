import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import classNames from 'classnames';

const Carousel = ({ dates, selected, onSelect }) => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 200,
        slidesToShow: 7,
        slidesToScroll: 1,
        draggable: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    draggable: true
                }
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    draggable: true
                }
            }
        ]
    };

    if (!dates.length) {
        // in case we get no data back
        return (
            <div>
                Sorry something went wrong! Please try refreshing the page...
            </div>
        );
    }

    // I've made this a constant for now as the value is static
    const GROUP_CODE = 'NOMDD';

    const radioStyles = {
        visibility: 'hidden',
        height: '0px',
        width: '0px',
        padding: '0px',
        margin: '0px',
        overflow: 'hidden',
        position: 'absolute'
    };

    const onChange = (e) => {
        onSelect(e.target.value);
    };

    return (
        <Slider {...settings}>
            {dates.map((date, index) => {
                const isSelected = selected === date.bookingCode;
                const isAvailable = date.available;
                const labelClasses = classNames(
                    'carousel-item',
                    { 'carousel-item-selected': isSelected },
                    { 'carousel-item-disabled': !isAvailable }
                );
                const inputClasses = classNames(
                    'delivery-day-block',
                    { 'selected-day': isSelected }
                );
                return (
                    <label
                        htmlFor={`${date.day}-${index}`}
                        className={labelClasses}
                        key={`${date} ${index}`}
                    >
                        <p>{date.day}</p>
                        <p>
                            <strong>{date.date}</strong>
                        </p>
                        <p>{date.month}</p>
                        {/* <p>{date.price}</p> */}
                        <input
                            className={inputClasses}
                            type="radio"
                            name="Day"
                            data-booking-code={date.bookingCode}
                            data-group-code={GROUP_CODE}
                            id={`${date.day}-${index}`}
                            value={date.bookingCode}
                            style={radioStyles}
                            onChange={onChange}
                            aria-checked={selected === index && 'checked'}
                            disabled={!date.available}
                        />
                    </label>
                );
            })}
        </Slider>
    );
};

Carousel.defaultProps = {
    dates: [],
    selected: '',
    onSelect: () => {}
};

Carousel.propTypes = {
    dates: PropTypes.instanceOf(Array),
    selected: PropTypes.string,
    onSelect: PropTypes.instanceOf(Function)
};

export default Carousel;

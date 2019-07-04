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
        const btn = document.getElementsByClassName('js-delivery-option-submit-button');
        btn[0].disabled = false;
    };

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; // will need to be translated
    const weekDays = ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']; // will need to be translated

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
                // this date logic should probably be extracted into its own function with
                // its own unit test will create a separate story for this technical debt
                const parsedDate = new Date(date.date);
                const thisMonth = months[parsedDate.getMonth()];
                const thisDay = weekDays[parsedDate.getDay()];
                const thisDate = parsedDate.getDate();
                return (
                    <label
                        htmlFor={`${thisDay}-${index}`}
                        className={labelClasses}
                        key={`${date.date} ${index}`}
                    >
                        <p>{thisDay}</p>
                        <p>
                            <strong>{thisDate}</strong>
                        </p>
                        <p>{thisMonth}</p>
                        <input
                            type="radio"
                            name="Day"
                            data-booking-code={date.bookingCode}
                            data-group-code={GROUP_CODE}
                            className={inputClasses}
                            id={`${thisDay}-${index}`}
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

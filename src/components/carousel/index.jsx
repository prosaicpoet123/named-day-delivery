import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import classNames from 'classnames';

class Carousel extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            selected: ''
        };
    }

    render() {
        const {
            dates,
            locale
        } = this.props;
        const { selected } = this.state;
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
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 400,
                    settings: {
                        slidesToShow: 5,
                        slidesToScroll: 1
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
        // const GROUP_CODE = 'NOMDD';

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
            // onSelect(e.target.value);
            this.setState({
                selected: e.target.value
            });
            const btn = document.getElementsByClassName('js-delivery-option-submit-button');
            btn[0].disabled = false;
        };
        return (
            <Slider {...settings}>
                {dates.map((date, index) => {
                    const isSelected = selected === date.bookingCode;
                    const isAvailable = date.enabled === 'true';
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
                    const thisMonth = new Intl.DateTimeFormat(locale || 'en', { month: 'short' }).format(parsedDate);
                    const thisDay = new Intl.DateTimeFormat(locale || 'en', { weekday: 'short' }).format(parsedDate);
                    const thisDate = new Intl.DateTimeFormat(locale || 'en', { day: 'numeric' }).format(parsedDate);

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
                                data-group-code={date.groupCodes}
                                className={inputClasses}
                                id={`${thisDay}-${index}`}
                                value={date.bookingCode}
                                style={radioStyles}
                                onChange={onChange}
                                aria-checked={selected === index && 'checked'}
                                disabled={!isAvailable}
                            />
                        </label>
                    );
                })}
            </Slider>
        );
    }
}

Carousel.defaultProps = {
    dates: [],
    selected: '',
    onSelect: () => {},
    locale: ''
};

Carousel.propTypes = {
    dates: PropTypes.instanceOf(Array),
    selected: PropTypes.string,
    onSelect: PropTypes.instanceOf(Function),
    locale: PropTypes.string
};

export default Carousel;

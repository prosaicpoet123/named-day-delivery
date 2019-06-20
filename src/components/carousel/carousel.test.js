import React from 'react';
import { mount } from 'enzyme';
import Carousel from './index.jsx';

const deliveryDays = {
    dates: [
        {
            day: 'Thur',
            date: '15',
            month: 'Feb',
            available: true,
            price: '£12.99'
        },
        {
            day: 'Thur',
            date: '15',
            month: 'Feb',
            available: true,
            price: '£12.99'
        },
        {
            day: 'Thur',
            date: '15',
            month: 'Feb',
            available: true,
            price: '£12.99'
        }
    ]
}

describe('Carousel component', () => {
    it('should show the error message if no data is available', () => {
        const wrapper1 = mount(<Carousel />);
        expect(wrapper1.find('.carousel-error').length).toBe(1)
    });

    const wrapper2 = mount(<Carousel {...deliveryDays} />)

    it('should show the carousel if there is data available', () => {
        expect(wrapper2.length).toBe(1)
    })

    it('should show the correct number of carousel items', () => {
        expect(wrapper2.find('.slick-slide').length).toBe(3)
    })
});

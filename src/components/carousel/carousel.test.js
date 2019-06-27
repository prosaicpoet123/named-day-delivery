import React from 'react';
import { mount } from 'enzyme';
import Carousel from './index.jsx';

const deliveryDays = {
    dates: [  
        {  
            day: "Mon",
            date: "17",
            month: "June",
            price: "£2.99",
            available: true,
            bookingCode: "HERMNDG/2019-06-17/*-*/*/*-*"
        },
        {  
            day: "Tues",
            date: "18",
            month: "June",
            price: "£2.99",
            available: true,
            bookingCode: "HERMNDG/2019-06-18/*-*/*/*-*"
        },
        {  
            day: "Wed",
            date: "19",
            month: "June",
            price: "£2.99",
            available: true,
            bookingCode: "HERMNDG/2019-06-19/*-*/*/*-*"
        },
    ]
}

describe('Carousel component', () => {
    it('should show no carousel items if there is no data available', () => {
        const wrapper1 = mount(<Carousel />);
        expect(wrapper1.find('.slick-slide').length).toBe(0)
    });

    const wrapper2 = mount(<Carousel {...deliveryDays} />)

    it('should show the carousel if there is data available', () => {
        expect(wrapper2.length).toBe(1)
    })

    it('should show the correct number of carousel items', () => {
        expect(wrapper2.find('.slick-slide').length).toBe(3)
    })
});

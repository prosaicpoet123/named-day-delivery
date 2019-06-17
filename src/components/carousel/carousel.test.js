import React from 'react';
import { shallow } from 'enzyme';
import Carousel from './index.jsx';

describe('Carousel component', () => {
    it('renders without crashing', () => {
        shallow(<Carousel />);
    });
});
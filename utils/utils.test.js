import { getLocale } from './utils.js';

describe('getLocale', () => {
    it('should return the locale based on the url', () => {
        const location1 = {
            origin: 'https://www.hollandandbarrett.nl',
            pathname: ''
        };
        const expected = 'nl';
        expect(getLocale(location1)).toEqual(expected);
    })

    it('should return the locale based on the url', () => {
        const location2 = {
            origin: 'https://www.hollandandbarrett.nl',
            pathname: '/fr/home.jsp'
        };
        const expected = 'fr';
        expect(getLocale(location2)).toEqual(expected);
    })
});

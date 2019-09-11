// I am aware this is super hacky, but we don't really have another option
// eslint-disable-next-line
export const getLocale = (location) => {
    let locale = 'en';
    const origin = location && location.origin;
    const path = location && location.pathname;
    const origins = [
        'https://www.hollandandbarrett.nl',
        'https://dt-preprod.hollandandbarrett.net/',
        'https://www.hollandandbarrett.be',
        'https://be-preprod.hollandandbarrett.net/'
    ];
    if (origins.includes(origin)) {
        locale = 'nl';
        if (path.split('/').includes('fr')) {
            locale = 'fr';
        }
    }
    return locale;
};

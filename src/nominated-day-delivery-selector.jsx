import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation, Trans } from 'react-i18next';
import Carousel from './components/carousel';

import { getLocale } from '../utils/utils';

const NominatedDayDeliverySelector = ({ deliverydays }) => {
    const location = window && window.location;
    const locale = getLocale(location);

    const { i18n } = useTranslation();
    i18n.changeLanguage(locale);

    return (
        // couple of classes to borrow styles from ATG
        <div className="checkout-fieldset-area ndd-react-component">
            <h3 className="heading-2"><Trans i18nKey="chooseDay">Choose a day:</Trans></h3>
            <Carousel dates={deliverydays} locale={locale} />
        </div>
    );
};

NominatedDayDeliverySelector.defaultProps = {
    deliverydays: {}
};

NominatedDayDeliverySelector.propTypes = {
    deliverydays: PropTypes.instanceOf(Object)
};

export default NominatedDayDeliverySelector;

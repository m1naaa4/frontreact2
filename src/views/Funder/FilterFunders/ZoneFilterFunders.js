import React from "react";
import { useTranslation } from 'react-i18next';
import countries from '../../../countries'


function ZoneFilterFunders ({filter, ...others }) {
    const { t, i18n } = useTranslation();

    return (
        <select className="user-type" name="zone" {...others} defaultValue={filter.zone}>
            <option key="all" value="all" >{t('localite')}</option>
            {countries.map((item) => (
                <option key={item.value} value={item.value} >{item.label}</option>
            ))}
        </select>
    )
}

export default ZoneFilterFunders;
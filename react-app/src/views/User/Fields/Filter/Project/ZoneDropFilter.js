import React from "react";
import { useTranslation } from 'react-i18next';
import countries from '../../../../../data/countries'


function ZoneDropFilter ({field, label, ...others }) {
    const { t, i18n } = useTranslation();

    return (
        <select className="user-type" name={field} {...others} required={others.required && "required"}>
            {countries.map((item) => (
                <option key={item.value} value={item.value} >{item.label}</option>
            ))}
        </select>
    )
}

export default ZoneDropFilter;
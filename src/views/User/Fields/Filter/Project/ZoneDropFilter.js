import React from "react";
import { useTranslation } from 'react-i18next';
import countries from '../../../../../countries'


function ZoneDropFilter ({ label, ...others }) {
    const { t, i18n } = useTranslation();

    return (
        <select className="user-type" name="project_area" defaultValue={'MA'} {...others}>
            {countries.map((item) => (
                <option key={item.value} value={item.value} >{item.label}</option>
            ))}
        </select>
    )
}

export default ZoneDropFilter;
import React from "react";
import { useTranslation } from 'react-i18next';

const finances = [
    ['', 'filter.secteur.finance'],
    ['2500', 'filter.secteur.2500'],
    ['10000', 'filter.secteur.10000'],
    ['25000', 'filter.secteur.25000'],
    ['40000', 'filter.secteur.40000'],
    ['55000', 'filter.secteur.55000'],
    ['70000', 'filter.secteur.70000'],
    ['85000', 'filter.secteur.85000'],
    ['100000', 'filter.secteur.100000'],
];

function FinanceDropFilter ({ label, ...others }) {
    const { t, i18n } = useTranslation();

    return (
        <select className="user-type" name="funding_search"  {...others}  required={others.required && "required"}>
            {finances.map(([value, name]) => (
                <option key={name} value={value}>{t(name)}</option>
            ))}
        </select>
       /*  <div className="input-row input-select">
           
        </div> */
    )
}

export default FinanceDropFilter;
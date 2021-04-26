import React from "react";
import { useTranslation } from 'react-i18next';

const finances = [
    ['', 'filter.secteur.finance'],
    ['', 'filter.secteur.2500'],
    ['', 'filter.secteur.10000'],
    ['', 'filter.secteur.25000'],
    ['', 'filter.secteur.40000'],
    ['', 'filter.secteur.55000'],
    ['', 'filter.secteur.70000'],
    ['', 'filter.secteur.85000'],
    ['', 'filter.secteur.100000'],
];

function FinanceDropFilter ({ label, ...others }) {
    const { t, i18n } = useTranslation();

    return (
        <div className="input-row input-select">
            <select className="user-type" name="funding_search"  {...others}>
                {finances.map(([value, name]) => (
                    <option key={name} value={value}>{t(name)}</option>
                ))}
            </select>
        </div>
    )
}

export default FinanceDropFilter;
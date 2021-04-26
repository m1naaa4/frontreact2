import React from "react";
import { useTranslation } from 'react-i18next';

const sectors = [
    ['','filter.secteur'],
    ['','filter.secteur.agroalimentaire'],
    ['','filter.secteur.architecture'],
    ['','filter.secteur.art'],
    ['','filter.secteur.big_data'],
    ['','filter.secteur.bio'],
    ['','filter.secteur.btp'],
    ['','filter.secteur.commerce'],
    ['','filter.secteur.communication'],
    ['','filter.secteur.design'],
    ['','filter.secteur.divertissement'],
    ['','filter.secteur.droit'],
    ['','filter.secteur.ecommerce'],
    ['','filter.secteur.education'],
    ['','filter.secteur.energie'],
    ['','filter.secteur.environement'],
    ['','filter.secteur.finance'],
    ['','filter.secteur.information'],
    ['','filter.secteur.ia'],
    ['','filter.secteur.internet_objets'],
    ['','filter.secteur.mode'],
    ['','filter.secteur.robotique'],
    ['','filter.secteur.sante'],
    ['','filter.secteur.villes_intelligences'],
    ['','filter.secteur.technologie'],
    ['','filter.secteur.transport'],
    ['','filter.secteur.other'],
];

function SectorDropFilter ({ label, ...others }){
    const { t, i18n } = useTranslation();

    return (
        <div className="input-row input-select">
            <select className="user-type" name="sector_id"  {...others}>
                {sectors.map(([value, name]) => (
                    <option key={name} value={value}>{t(name)}</option>
                ))}
            </select>
        </div>
    )
}

export default SectorDropFilter;
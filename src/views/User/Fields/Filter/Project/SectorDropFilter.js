import React from "react";
import { useTranslation } from 'react-i18next';

const sectors = [
    ['','filter.secteur'],
    ['agroalimentaire','filter.secteur.agroalimentaire'],
    ['architecture','filter.secteur.architecture'],
    ['art','filter.secteur.art'],
    ['big_data','filter.secteur.big_data'],
    ['bio','filter.secteur.bio'],
    ['btp','filter.secteur.btp'],
    ['commerce','filter.secteur.commerce'],
    ['communication','filter.secteur.communication'],
    ['design','filter.secteur.design'],
    ['divertissement','filter.secteur.divertissement'],
    ['droit','filter.secteur.droit'],
    ['ecommerce','filter.secteur.ecommerce'],
    ['education','filter.secteur.education'],
    ['energie','filter.secteur.energie'],
    ['environement','filter.secteur.environement'],
    ['finance','filter.secteur.finance'],
    ['information','filter.secteur.information'],
    ['ia','filter.secteur.ia'],
    ['internet_objets','filter.secteur.internet_objets'],
    ['mode','filter.secteur.mode'],
    ['robotique','filter.secteur.robotique'],
    ['sante','filter.secteur.sante'],
    ['villes_intelligences','filter.secteur.villes_intelligences'],
    ['technologie','filter.secteur.technologie'],
    ['transport','filter.secteur.transport'],
    ['other','filter.secteur.other'],
];

function SectorDropFilter ({ label, ...others }){
    const { t, i18n } = useTranslation();

    return (
        <select className="user-type" name="sector_id"  {...others} required={others.required && "required"}>
            {sectors.map(([value, name]) => (
                <option key={name} value={value}>{t(name)}</option>
            ))}
        </select>
/*         <div className="input-row input-select">
            
        </div> */
    )
}

export default SectorDropFilter;
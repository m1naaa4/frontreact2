import React from "react";
import { useTranslation } from 'react-i18next';
import finances from "../../../../../data/financesCreate";



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
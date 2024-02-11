import React from "react";
import types from "../../../../data/types";
import { useTranslation } from "react-i18next";

const TypeDrop = ({ label, ...others }) => (
    
    <>
        <div className="input-row input-select">
            <select className="user-type" name="user-type" required {...others}>
                {types.map(([value, name]) => (
                    <option key={name} value={value}>{name}</option>
                ))}
            </select>
        </div>
    </>
);

export default TypeDrop;
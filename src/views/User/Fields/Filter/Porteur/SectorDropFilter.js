import React from "react";

const sectors = [
    ["", "Secteurs d’activité"],
    ["EC", "Economic"],
    ["AG", "Agreculture"],
    ["CM", "Commerce"],
    ["TS", "Tourist"],
    ["AR", "Artisana"]
];

const SectorDropFilter = ({ label, ...others }) => (
    <>
        <div className="input-row input-select">
            <select className="user-type" name="sector"  {...others}>
                {sectors.map(([value, name]) => (
                    <option key={name} value={value}>{name}</option>
                ))}
            </select>
        </div>
    </>
);

export default SectorDropFilter;
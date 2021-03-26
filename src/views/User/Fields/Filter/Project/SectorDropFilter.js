import React from "react";

const sectors = [
    ["", "Secteurs d’activité"],
    ["Economic", "Economic"],
    ["Agreculture", "Agreculture"],
    ["Commerce", "Commerce"],
    ["Tourist", "Tourist"],
    ["Artisana", "Artisana"]
];

const SectorDropFilter = ({ label, ...others }) => (
    <>
        <div className="input-row input-select">
            <select className="user-type" name="sector_id"  {...others}>
                {sectors.map(([value, name]) => (
                    <option key={name} value={value}>{name}</option>
                ))}
            </select>
        </div>
    </>
);

export default SectorDropFilter;
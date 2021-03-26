import React from "react";

const zones = [
    ["", "Zones ciblées"],
    ["Maroc", "Maroc"],
    ["cameron", "cameron"],
    ["Turk", "Turk"],
    ["Goulmima", "Goulmima"],
    ["casablanca", "casablanca"],
    ["Rabat", "Rabat"],
];

const ZoneDropFilter = ({ label, ...others }) => (
    <>
            <select className="user-type" name="project_area"  {...others}>
                {zones.map(([value, name]) => (
                    <option key={name} value={value}>{name}</option>
                ))}
            </select>
    </>
);

export default ZoneDropFilter;
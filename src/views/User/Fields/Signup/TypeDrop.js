import React from "react";

const types = [
    ["", "Vous êtes ?"],
    ["PP", "Porteur de projet"],
    ["BF", "Bailleur de fonds"],
    ["ACMPT", "Accompagnateur"]
];

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
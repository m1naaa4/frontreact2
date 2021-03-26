import React from "react";
import {Text,Input} from "../../../../../containers/Language";

const etats = [
    ["", "Etat du projet"],
    ["10", "10%"],
    ["25", "25%"],
    ["50", "50%"],
    ["75", "75%"],
    ["100", "100%"]
];

const EtatDropFilter = ({ label, ...others }) => (
    <>
        <div className="input-row input-select">
            <select className="user-type" name="project_status"  {...others}>
                {etats.map(([value, name]) => (
                    <option key={name} value={value}>{name}</option>
                ))}
            </select>
        </div>
    </>
);

export default EtatDropFilter;
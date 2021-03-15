import React from "react";

const finances = [
    ["", "Financement recherché"],
    ["2000$ a 5000$", "2000$ a 5000$"],
    ["8500$ a 10000$", "8500$ a 10000$"],
    ["15000$ a 20000$", "15000$ a 20000$"],
    ["25000$ a 30000$", "25000$ a 30000$"],
    ["40000$ a 50000$", "40000$ a 50000$"],
    ["100000$ a 200000$", "100000$ a 200000$"],
    ["300000$ a 500000$", "300000$ a 500000$"],
];

const FinanceDropFilter = ({ label, ...others }) => (
    <>
        <div className="input-row input-select">
            <select className="user-type" name="funding_search"  {...others}>
                {finances.map(([value, name]) => (
                    <option key={name} value={value}>{name}</option>
                ))}
            </select>
        </div>
    </>
);

export default FinanceDropFilter;
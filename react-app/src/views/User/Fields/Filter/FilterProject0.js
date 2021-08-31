import React from 'react'



function FilterProject0({ searchValue, handleChangeValue ,handleSubmitValue }) {

    const [items] = React.useState([

        {label: Text.tid="projectHolder", value: "PP"},
        {label: Text.tid="donor", value: "BF"},
        {label: Text.tid="accompanyingPerson", value: "ACMPT"},
    ]);
    const sectors = [
        ["", "Secteurs d’activité"],
        ["EC", "Economic"],
        ["AG", "Agreculture"],
        ["CM", "Commerce"],
        ["TS", "Tourist"],
        ["AR", "Artisana"]
    ];
    const zones = [
        ["", "Zones ciblées"],
        ["Maroc", "Maroc"],
        ["cameron", "cameron"],
        ["Turk", "Turk"],
        ["Goulmima", "Goulmima"],
        ["casablanca", "casablanca"],
        ["Rabat", "Rabat"],
    ];

    return (
            <div className="Filter-Row">
                <form className="Filter-Form" onSubmit={ handleSubmitValue}>
                    <div className="row">
                        <div className="col-sm-11 col-md-12 col-lg-11">
                            <div className="display-flex">
                                <div className="input-row input-select input-small">
                                    <select className="user-type" name="type" value={searchValue.type}
                                            onChange={(e) => handleChangeValue(e)}>
                                        {
                                            items.map(item => (
                                                <option
                                                    key={item.value}
                                                    value={item.value}>
                                                    {item.label}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                                <div className="input-row input-select input-medium">
                                    <select className="user-type" name="sector" value={searchValue.sector}
                                            onChange={(e) => handleChangeValue(e)}>
                                        {sectors.map(([value, name]) => (
                                            <option key={name} value={value}>{name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="input-row input-select input-small">
                                    <select className="user-type" name="zone" value={searchValue.zone}
                                            onChange={(e) => handleChangeValue(e)}>
                                        {zones.map(([value, name]) => (
                                            <option key={name} value={value}>{name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="input-row">
                                    <input type="text" name="financement" value={searchValue.financement} data-testid="filter-input-financement"
                                           onChange={(e) => handleChangeValue(e)} placeholder="Financement recherché" />
                                </div>
                                <div className="input-row">

                                    <input type="text" name="search" value={searchValue.search} data-testid="filter-input-search"
                                           onChange={(e) => handleChangeValue(e)} placeholder="Mot clé" />
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-1 col-md-12 col-lg-1">
                            <div className="input-row form-button">
                                <button type="submit" name="submit" className="filter-button"><i
                                    className="uil uil-search"></i> <span>Filter</span></button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
    )
}

export default FilterProject0;

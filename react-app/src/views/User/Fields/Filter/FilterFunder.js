import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';
import sectors from "../../../../data/sectors"
import finances from "../../../../data/finances"
import countries from "../../../../data/countries"
import AllMultiSelectCheckboxSector from '../../../../utils/Filters/AllMultiselectCheckboxSector';
import AllMultiSelectCheckboxZone from '../../../../utils/Filters/AllMultiselectCheckboxZone';
import AllMultiSelectCheckboxFinance from '../../../../utils/Filters/AllMultiselectCheckboxFinance';
import { GetFunders } from '../../../../store/actions/Funder/FunderActions';



function FilterFunder({ filterInput }) {
    const { t } = useTranslation();
    const [open, setOpen] = useState(false);

    const [selectedzone, setSelectedcountry] = useState();
    const [selectedsector, setSelectedsector] = useState();
    const [selectedfinance, setSelectedfinance] = useState();
    const [search, setSearch] = useState();

    const dispatch = useDispatch();

    const handleSubmitValue = (e) => {
        e.preventDefault();


        filterInput.filters = true;

        let dfinance = selectedfinance?.map((name, index) => (
            name.value
        ))

        let dzone = selectedzone?.map((name, index) => (
            name.value
        ))

        let dsector = selectedsector?.map((name, index) => (
            name.value
        ))

        filterInput.funding_search = dfinance
        filterInput.project_area = dzone
        filterInput.sector = dsector
        filterInput.search = search

        dispatch(GetFunders(filterInput));
    }

    const display = () => {
        setOpen(!open)
    }

    return (
        <div className="Filter-Row">
            <div className="Filter-Form"  >
                <div className="row">
                    <div className="col-sm-11 col-md-12 col-lg-12">
                        <div className="display-flex">
                            <div className="input-row w300">
                                <input type="text" data-testid="filter-input-search"
                                    onChange={(e) => setSearch(e.target.value)} placeholder={t('filter.search')} />
                            </div> 
                            <div className="input-row input-multi-filter input-small">
                                <AllMultiSelectCheckboxSector {...{ setSelectedsector }} datas={sectors} />
                            </div>
                            <div className="input-row input-multi-filter input-small">
                                <AllMultiSelectCheckboxFinance {...{ setSelectedfinance }} datas={finances} />
                            </div>
                            <div className="input-row input-multi-filter input-small">
                                
                                <AllMultiSelectCheckboxZone {...{ setSelectedcountry }} datas={countries} />
                            </div>
                            <div className='input-row'>
                                <button className="DadupaModal-BTNSubmit advenced-btn-search"
                                    onClick={display}
                                    aria-controls="example-collapse-text"
                                    aria-expanded={open}
                                    data-toggle="tooltip" data-placement="bottom" title="Advanced Search"
                                >
                                    <i className="uil uil-setting"></i>
                                </button>
                                <button type="submit" name="submit" onClick={handleSubmitValue} className="filter-button custom-filter-btn">
                                        <i className="uil uil-search"></i> Search
                                    </button>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterFunder;

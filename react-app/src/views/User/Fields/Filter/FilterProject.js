import React, { useState } from 'react'
import ZoneDropFilter from "./Project/ZoneDropFilter";
import SectorDropFilter from "./Project/SectorDropFilter";
import FinanceDropFilter from "./Project/FinanceDropFilter";
import {useDispatch} from "react-redux";
import {loadProjectAction} from "../../../../store/actions/User/Project/ProjectActions";
import { useTranslation } from 'react-i18next';
import MultiselectCheckbox from '../../../../utils/MultiselectCheckbox';
import sectors from "../../../../data/sectors"
import etats from "../../../../data/etats"
import finances from "../../../../data/finances"
import countries from "../../../../data/countries"
import AllMultiSelectCheckboxStatus from '../../../../utils/Filters/AllMultiselectCheckboxStatus';
import AllMultiSelectCheckboxSector from '../../../../utils/Filters/AllMultiselectCheckboxSector';
import AllMultiSelectCheckboxZone from '../../../../utils/Filters/AllMultiselectCheckboxZone';
import AllMultiSelectCheckboxFinance from '../../../../utils/Filters/AllMultiselectCheckboxFinance';



function FilterProject({ filterInput, setFilterInput, props }) {
    const { t } = useTranslation();

    const [selectedstatus, setSelectedstatus] = useState();
    const [selectedsector, setSelectedsector] = useState();
    const [selectedfinance, setSelectedfinance] = useState();
    const [selectedzone, setSelectedzone] = useState();
    const [search, setSearch] = useState();

    const dispatch = useDispatch();

    const handleSubmitValue = (e) => {
        e.preventDefault();

        
        filterInput.filters = true;

        let dstatus = selectedstatus?.map((name, index) => (
            name.value
        ))
        
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
        filterInput.project_status = dstatus
        filterInput.project_area = dzone
        filterInput.sector = dsector
        filterInput.search = search

        dispatch(loadProjectAction(filterInput));
    }

    return (
            <div className="Filter-Row">
                <form className="Filter-Form" onSubmit={ handleSubmitValue} >
                    <div className="row">
                        <div className="col-sm-11 col-md-12 col-lg-11">
                            <div className="display-flex">
                                <div className="input-row input-select input-small">
                                    <AllMultiSelectCheckboxStatus {...{ setSelectedstatus }}  datas={etats} />
                                    {/* <MultiselectCheckbox {...{ setSelectedzone }} datas={countries} onChange={setFilterInput}/> */}
                                </div>
                                <div className="input-row input-select input-small">
                                    {/* <SectorDropFilter value={sector} onChange={setFilterInput} /> */}
                                    <AllMultiSelectCheckboxSector {...{ setSelectedsector }} datas={sectors} />
                                </div>
                                <div className="input-row input-select input-small">
                                    <AllMultiSelectCheckboxFinance {...{ setSelectedfinance }} datas={finances} />
                                    {/* <ZoneDropFilter field='project_area' value={zone} onChange={setFilterInput} /> */}
                                </div>
                                <div className="input-row input-select input-small">
                                    {/* <FinanceDropFilter value={financement} onChange={setFilterInput} /> */}
                                    {/* <AllMultiSelectCheckboxZone {...{ setSelectedzone }} datas={countries} onChange={setFilterInput}/> */}
                                    <MultiselectCheckbox {...{ setSelectedzone }} datas={countries} />
                                </div>
                                <div className="input-row">
                                    <input type="text" name="search" data-testid="filter-input-search"
                                           onChange={setSearch} placeholder={t('filter.search')} />
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

export default FilterProject;

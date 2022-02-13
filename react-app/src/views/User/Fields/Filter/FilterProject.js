import React, { useEffect, useState } from 'react'
import ZoneDropFilter from "./Project/ZoneDropFilter";
import SectorDropFilter from "./Project/SectorDropFilter";
import FinanceDropFilter from "./Project/FinanceDropFilter";
import {useDispatch, useSelector} from "react-redux";
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
import { Collapse } from 'react-bootstrap';
import InputTags from '../../../../utils/tags/TagsInput';



function FilterProject({ filterInput }) {
    const { t } = useTranslation();
    const tag_state = useSelector(state => state.generaleVariable.tag);
    const tags = tag_state ? tag_state : [];
    const [open, setOpen] = useState(false);

    const [selectedzone, setSelectedcountry] = useState();
    const [selectedstatus, setSelectedstatus] = useState();
    const [selectedsector, setSelectedsector] = useState();
    const [selectedfinance, setSelectedfinance] = useState();
    const [search, setSearch] = useState();
    const [tag, setTag] = useState(tags);

    useEffect(()=>{
        if (tag_state) {
            setOpen(true);
        }
    },[])

    useEffect(()=>{
        setTag(tag_state)   
    },[tag_state])

    const selectedTags = tags => {
        setTag(tags)
    };

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
        filterInput.tags = tag

        dispatch(loadProjectAction(filterInput));
    }

    const display = () =>{
        setOpen(!open)
    }

    return (
            <div className="Filter-Row">
                <div className="Filter-Form"  >
                    <div className="row">
                        <div className="col-sm-11 col-md-12 col-lg-12">
                            <div className="display-flex">
                                <div className="input-row input-multi-filter input-small">
                                    <AllMultiSelectCheckboxStatus {...{ setSelectedstatus }}  datas={etats} />
                                    {/* <MultiselectCheckbox {...{ setSelectedzone }} datas={countries} onChange={setFilterInput}/> */}
                                </div>
                                <div className="input-row input-multi-filter input-small">
                                    {/* <SectorDropFilter value={sector} onChange={setFilterInput} /> */}
                                    <AllMultiSelectCheckboxSector {...{ setSelectedsector }} datas={sectors} />
                                </div>
                                <div className="input-row input-multi-filter input-small">
                                    <AllMultiSelectCheckboxFinance {...{ setSelectedfinance }} datas={finances} />
                                    {/* <ZoneDropFilter field='project_area' value={zone} onChange={setFilterInput} /> */}
                                </div>
                                <div className="input-row input-multi-filter input-small">
                                    {/* <FinanceDropFilter value={financement} onChange={setFilterInput} /> */}
                                    {/* <AllMultiSelectCheckboxZone {...{ setSelectedzone }} datas={countries} onChange={setFilterInput}/> */}
                                    {/* <MultiselectCheckbox {...{ setSelectedzone }} datas={countries} /> */}
                                <AllMultiSelectCheckboxZone {...{ setSelectedcountry }} datas={countries}/>
                                </div>
                                <div className="input-row">
                                    <div className="input-row form-button">
                                        <button type="submit" name="submit" onClick={handleSubmitValue} className="filter-button custom-filter-btn"><i
                                        className="uil uil-search"></i> <span>Filter</span></button>
                                    </div>
                                    <button className="DadupaModal-BTNSubmit"
                                        onClick={display}
                                        aria-controls="example-collapse-text"
                                        aria-expanded={open}
                                        >
                                        Advanced Search
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-1 col-md-12 col-lg-1">
                            {/* <button className="DadupaModal-BTNSubmit"
                                onClick={display}
                                aria-controls="example-collapse-text"
                                aria-expanded={open}
                            >
                                Advanced Search
                            </button> */}
                            {/* <div className="input-row form-button">
                                <button type="submit" name="submit" onClick={handleSubmitValue} className="filter-button"><i
                                    className="uil uil-search"></i> <span>Filter</span></button>
                            </div> */}
                        </div>

                        {/* <button className="DadupaModal-BTNSubmit"
                            onClick={display}
                            aria-controls="example-collapse-text"
                            aria-expanded={open}
                        >
                            Advanced Search
                        </button> */}
                        <Collapse in={open} className="mt-10">
                            <div className="col-sm-11 col-md-12 col-lg-12">
                                <div className="display-flex">
                                    <div className="input-row w300">
                                        <input type="text"  data-testid="filter-input-search"
                                                onChange={(e)=>setSearch(e.target.value)} placeholder={t('filter.search')} /> 
                                    </div>
                                    <div className="input-row input-tags">
                                        <InputTags onChange={selectedTags}  selectedTags={selectedTags} tags={tags}/>
                                    </div>
                                </div>
                            </div>
                        </Collapse>
                    </div>
                </div>
            </div>
    )
}

export default FilterProject;

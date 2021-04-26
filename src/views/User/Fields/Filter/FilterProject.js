import React, {useEffect} from 'react'
import ZoneDropFilter from "./Project/ZoneDropFilter";
import EtatDropFilter from "./Project/EtatDropFilter";
import SectorDropFilter from "./Project/SectorDropFilter";
import FinanceDropFilter from "./Project/FinanceDropFilter";
import {useDispatch} from "react-redux";
import {loadProjectAction} from "../../../../store/actions/User/Project/ProjectActions";
import { useTranslation } from 'react-i18next';



function FilterProject({ filterInput, setFilterInput, props }) {
    const { t, i18n } = useTranslation();

    const { zone, etat, sector, financement } = filterInput;

    const dispatch = useDispatch();

    const handleSubmitValue = (e) => {
        e.preventDefault();
        filterInput.filters = true;

        dispatch(loadProjectAction(filterInput));
    }
    // fecth data on mounted
    // useEffect(() => {
    //     dispatch(loadProjectAction(filterInput,props));
    // }, [dispatch])

    return (
            <div className="Filter-Row">
                <form className="Filter-Form" onSubmit={ handleSubmitValue} >
                    <div className="row">
                        <div className="col-sm-11 col-md-12 col-lg-11">
                            <div className="display-flex">
                                <div className="input-row input-select input-small">
                                    <EtatDropFilter value={etat} onChange={setFilterInput} />
                                </div>
                                <div className="input-row input-select input-small">
                                    <SectorDropFilter value={sector} onChange={setFilterInput} />
                                </div>
                                <div className="input-row input-select input-small">
                                    <ZoneDropFilter value={zone} onChange={setFilterInput} />
                                </div>
                                <div className="input-row input-select input-small">
                                    <FinanceDropFilter value={financement} onChange={setFilterInput} />
                                </div>
                                <div className="input-row">
                                    <input type="text" name="search" data-testid="filter-input-search"
                                           onChange={setFilterInput} placeholder={t('filter.search')} />
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

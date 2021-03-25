import React, {useState, useEffect} from 'react'
import ZoneDropFilter from "./Porteur/ZoneDropFilter";
import EtatDropFilter from "./Porteur/EtatDropFilter";
import SectorDropFilter from "./Porteur/SectorDropFilter";
import FinanceDropFilter from "./Porteur/FinanceDropFilter";
import {useDispatch} from "react-redux";
import {loadProjectAction} from "../../../../store/actions/User/Project/ProjectActions";



function FilterProject({ filterInput, setFilterInput, props }) {

    const { zone, etat, sector, financement } = filterInput;

    const dispatch = useDispatch();

    const handleSubmitValue = (e) => {
        e.preventDefault();
        dispatch(loadProjectAction(filterInput));
    }
    //fecth data on mounted
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
                                           onChange={setFilterInput} placeholder="Mot clé" />
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

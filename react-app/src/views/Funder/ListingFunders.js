import React, {useRef, useCallback, useState, useEffect} from 'react'
import ProjectView from "../Projects/ProjectGridView";
import ProjectSkeleton from "../../skeleton/ProjectSkeleton";
import {useDispatch, useSelector} from "react-redux";
import {loadProjectAction, loadProjectOnceAction} from "../../store/actions/User/Project/ProjectActions";
import {GetFunders} from "../../store/actions/Funder/FunderActions";
import {Redirect} from 'react-router-dom';
import TypeFilterFunders from './FilterFunders/TypeFilterFunders';
import { useForm } from "react-hooks-helper";
import FinanceFilterFunders from './FilterFunders/FinanceFilterFunders';
import ZoneFilterFunders from './FilterFunders/ZoneFilterFunders';
import SectorFilterFunders from './FilterFunders/SectorFilterFunders';
import { useTranslation } from 'react-i18next';
import NotFound from '../../pages/404';
import ListingItemFunder from './ListingItemFunder';
import typeusers from '../../data/typeusers';
import AllMultiSelectCheckboxFinance from '../../utils/funderFilters/AllMultiselectCheckboxFinance';
import AllMultiSelectCheckboxStatus from '../../utils/funderFilters/AllMultiselectCheckboxStatus';
import AllMultiSelectCheckboxSector from '../../utils/funderFilters/AllMultiselectCheckboxSector';
import AllMultiSelectCheckboxZone from '../../utils/funderFilters/AllMultiselectCheckboxZone';
import sectors from '../../data/sectors';
import finances from '../../data/finances';
import countries from '../../data/countries';


export default function ListingFunders(props) {
    const { t, i18n } = useTranslation();
    
    const defaultFilter = {
        type: 'all',
        sector_id: 'all',
        zone: 'MA',
        finances: 'all',
        keyword: '',
    };

    const [filter, setFilter] = useForm(defaultFilter);
    const [isLoaded, setIsLoaded] = useState(false);

    const dispatch = useDispatch();

    const projects =  useSelector(state => state.funders.data);
    const hasMore = useSelector(state => state.funders.hasMore);
    const loading = useSelector(state => state.funders.loading);
    const [selectedzone, setSelectedcountry] = useState();
    const [selectedusertype, setSelectedusertype] = useState();
    const [selectedsector, setSelectedsector] = useState();
    const [selectedfinance, setSelectedfinance] = useState();
    const [keyword, setKeyword] = useState();

    const current = useSelector(state => state.funders.current);


    const observer = useRef()
    const lastProjectElementRef = useCallback( node =>{
        if (projects.loading) return
       
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver( entries =>{
            if (entries[0].isIntersecting && hasMore  ){  
              //  filterInput.filters = false;              
          //      dispatch(loadProjectAction( filterInput, props, current+1));
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

    useEffect(() => {
        dispatch(GetFunders( filter, props, 1));
    }, [dispatch]);

    useEffect(() => {
        if(projects.success === true){
            setIsLoaded(true);
        }

    }, [projects])


    const handleFilter = (e) => {
        e.preventDefault();
        console.log(filter);

        let usertype = selectedusertype?.map((name, index) => (
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

        filter.funding_search = dfinance
        filter.type = usertype
        filter.project_area = dzone
        filter.sector_id = dsector
        
        dispatch(GetFunders( filter, props, 1));
    }

    return (
            <div className="Page-Wrapper" >
                <div className="container">
                    <div className="Filter-Row">
                        <form className="Filter-Form" action="#">
                            <div className="row">
                                <div className="col-sm-11 col-md-12 col-lg-11">
                                    <div className="display-flex">
                                    <div className="input-row input-multi-filter input-small">
                                        {/* <TypeFilterFunders filter={filter} onChange={setFilter} /> */}
                                        
                                        <AllMultiSelectCheckboxStatus {...{ setSelectedusertype }} datas={typeusers} />

                                    </div>
                                    <div className="input-row input-multi-filter input-small">
                                        {/* <SectorFilterFunders filter={filter} onChange={setFilter} /> */}
                                        <AllMultiSelectCheckboxSector {...{ setSelectedsector }} datas={sectors} />
                                        
                                    </div>
                                    <div className="input-row input-multi-filter input-small">
                                        {/* <ZoneFilterFunders filter={filter} onChange={setFilter} /> */}
                                        <AllMultiSelectCheckboxFinance {...{ setSelectedfinance }} datas={finances}/>
                                    </div>
                                    <div className="input-row input-multi-filter input-small">
                                        {/* <FinanceFilterFunders filter={filter} onChange={setFilter} /> */}
                                        <AllMultiSelectCheckboxZone {...{ setSelectedcountry }} datas={countries}/>
                                    </div>
                                    <div className="input-row">
                                        <input type="text" name="keyword" onChange={(e)=> {filter.key=e.target.value}} placeholder={ t('filter.search')} />
                                    </div>
                                    </div>
                                </div>
                                <div className="col-sm-1 col-md-12 col-lg-1">
                                    <div className="input-row form-button">
                                        <button onClick={handleFilter} name="submit" className="filter-button"><i className="uil uil-search"></i> <span>Filter</span></button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                     <div className="offers-list">
                        <div className="row" >
                            {
                                !isLoaded ? (
                                    <ProjectSkeleton/>
                                ) : projects.success === false ? (
                                    <Redirect to={{pathname: '/opps'}} />
                                ) : (
                                    () => {
                                        if  (
                                            projects!==undefined && 
                                            projects.success !== false && 
                                            projects.funders != undefined && 
                                            projects.funders.data.length > 0
                                        ) {

                                            return (
                                                projects.funders.data.map((project, index) => {
                                                    if (projects.funders.data.length === index +1){
                                                        return (
                                                            <div  className="col-md-4" key={project.id} ref={lastProjectElementRef}>
                                                                <ListingItemFunder project={project} />
                                                            </div>
                                                        )

                                                    }else{
                                                        return(
                                                            <div  className="col-md-4" key={project.id}>
                                                                <ListingItemFunder  project={project} />
                                                            </div>

                                                        )
                                                    }
                                                })
                                            )
                                        }
                                    }
                                )
                                ()
                            }
                        </div>
                    </div>
                </div>
            </div>

    )
}


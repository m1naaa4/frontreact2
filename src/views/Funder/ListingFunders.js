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
import ViewFunder from './ViewFunder';

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
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const projects =  useSelector(state => state.funders.data);
    const hasMore = useSelector(state => state.funders.hasMore);
    const loading = useSelector(state => state.funders.loading);

    const current = useSelector(state => state.funders.current);


    const observer = useRef()
    const lastProjectElementRef = useCallback( node =>{
        if (projects.loading) return
       
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver( entries =>{
            if (entries[0].isIntersecting && hasMore  ){  
              //  filterInput.filters = false;              
          //      dispatch(loadProjectAction( filterInput, props, current+1));
                setIsLoading(true)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

    useEffect(() => {
        if(!isLoading){
           dispatch(GetFunders( filter, props, 1));
        }
    }, [dispatch]);  

    const handleFilter = (e) => {
        e.preventDefault();
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
                                    <div className="input-row input-select input-medium">
                                        <TypeFilterFunders filter={filter} onChange={setFilter} />
                                    </div>
                                    <div className="input-row input-select">
                                        <SectorFilterFunders filter={filter} onChange={setFilter} />
                                    </div>
                                    <div className="input-row input-select">
                                        <ZoneFilterFunders filter={filter} onChange={setFilter} />
                                    </div>
                                    <div className="input-row input-select">
                                        <FinanceFilterFunders filter={filter} onChange={setFilter} />
                                    </div>
                                    <div className="input-row">
                                        <input type="text" name="keyword" value={filter.keyword} onChange={setFilter} placeholder={ t('filter.search')} />
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
                                loading === true ? (
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
                                                                <ViewFunder project={project} />
                                                            </div>
                                                        )

                                                    }else{
                                                        return(
                                                            <div  className="col-md-4" key={project.id}>
                                                                <ViewFunder  project={project} />
                                                            </div>

                                                        )
                                                    }
                                                })
                                            )
                                        }else {
                                            return (
                                                <NotFound header="show" />
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


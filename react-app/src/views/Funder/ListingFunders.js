import React, {useRef, useCallback, useState, useEffect} from 'react'
import ProjectSkeleton from "../../skeleton/ProjectSkeleton";
import {useDispatch, useSelector} from "react-redux";
import {GetFunders, loadFunderOnceAction} from "../../store/actions/Funder/FunderActions";
import {Redirect} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ListingItemFunder from './ListingItemFunder';
import FilterFunder from '../User/Fields/Filter/FilterFunder';
import $ from "jquery";

export default function ListingFunders(props) {
    const { t } = useTranslation();
    const [filterInput, setFilterInput] = useState({
        'filters': true,
        'project_area': '',
        'funding_search': '',
        'sector': '',
        'search': '',
    });

    const data = {
        filterInput,
        setFilterInput,
        props
    };

    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const projects =  useSelector(state => state.funders);
    const hasMore = useSelector(state => state.funders.hasMore);
    const current = useSelector(state => state.funders.current);
    const loading = useSelector(state => state.funders.loading);
    const totalFunders =  useSelector(state => state.funders.totalFunders);
    const [total, setTotal] = useState(0);
    const [currentLength, setCurrentLength] = useState(0);

    const observer = useRef()
    const lastProjectElementRef = useCallback( node =>{
        if (projects.loading) return

        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                filterInput.filters = false;
                dispatch(GetFunders(filterInput, current + 1));
                setIsLoading(true)                
            } else {
                setIsLoading(false)
            }
        })
        setTotal(totalFunders);
        setCurrentLength(projects.funders.length);
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

    useEffect(() => {
        if (!isLoading) {
            dispatch(loadFunderOnceAction(filterInput, 1));
        }
    }, [dispatch]);

    const FilterMenu = () => {
        $('.Filter-Row').slideToggle('active-filter-form');
    }

    return (
            <div className="Page-Wrapper" >
                <div className="container">
                    <div className='filter-mobile'>
                        <h4>Filters</h4>
                        <button onClick={FilterMenu}><i className="uil uil-filter"></i></button>
                    </div>
                    {/* <div className="Filter-Row"> */}
                        < FilterFunder {
                            ...data
                        }
                        />
                    {/* </div> */}

                     <div className="offers-list">
                        <div className='offer-title' style={{width: '100px', pointerEvents: 'none'}}>
                            <span className='offer-sector-name'>{currentLength} of {totalFunders}</span><br/>
                        </div>
                        <div className="row" >
                            {
                                loading ? (
                                    <ProjectSkeleton/>
                                ) : projects.success === false ? (
                                    <Redirect to={{pathname: '/opps'}} />
                                ) : (
                                    () => {
                                        if  (
                                            projects!==undefined && 
                                            projects.success !== false && 
                                            projects.funders != undefined && 
                                            projects.funders.length > 0
                                        ) {

                                            return (
                                                projects.funders.map((project, index) => {
                                                    if (projects.funders.length === index +1){
                                                        return (
                                                            <div  className="col-lg-4 col-md-6" key={project.id} ref={lastProjectElementRef}>
                                                                <ListingItemFunder project={project} />
                                                            </div>
                                                        )

                                                    }else{
                                                        return(
                                                            <div  className="col-lg-4 col-md-6" key={project.id}>
                                                                <ListingItemFunder  project={project} />
                                                            </div>

                                                        )
                                                    }
                                                })
                                            )
                                        }else{
                                            return (
                                                <div className="col-md-12">
                                                <div className="offer-box">
                                                    <div className="offer-box">
                                                    {t('noresultfound')}
                                                    </div>
                                                </div>
                                            </div>
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


import React, {useRef, useCallback, useState, useEffect} from 'react'
import FilterProject from "../User/Fields/Filter/FilterProject";
import ProjectView from "./ProjectGridView";
import ProjectSkeleton from "../../skeleton/ProjectSkeleton";
import {useDispatch, useSelector} from "react-redux";
import $ from "jquery";
// import {loadProjectAction, loadProjectOnceAction} from "../../store/actions/User/Project/ProjectActions";
import {loadProjectAction, loadProjectOnceAction} from "../../store/actions/Project/ProjectAction"
import {Redirect} from 'react-router-dom';
import { useTranslation } from 'react-i18next';


export default function ListProjectView({ props}) {
    const tag_state = useSelector(state => state.generaleVariable.tag);
    const [total, setTotal] = useState(0);
    const [currentLength, setCurrentLength] = useState(0);
    const tags = tag_state ? tag_state : [];
    const {t} = useTranslation();
    
    const [filterInput, setFilterInput ]  = useState({
        'filters' : true,
        'project_area' : '',
        'funding_search' : '',
        'project_status' : '',
        'sector' : '',
        'search' : '',
        'tags'   : tags,
        'total' : total,
        'currentLength' : currentLength
    });

    const data = { filterInput, setFilterInput, props };

    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const projects =  useSelector(state => state.projects);
    const totalProjects =  useSelector(state => state.projects.totalProjects);
    const hasMore = useSelector(state => state.projects.hasMore);
    const current = useSelector(state => state.projects.current);
    const loading = useSelector(state => state.projects.loading);

    const observer = useRef()
    const lastProjectElementRef = useCallback( node =>{
        if (projects.loading) return
       
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver( entries =>{
            if (entries[0].isIntersecting && hasMore  ){  
                filterInput.filters = false;              
                dispatch(loadProjectAction( filterInput,current+1));
                setIsLoading(true)
            } else {
                setIsLoading(false)
            }
        })
        setTotal(totalProjects);
        setCurrentLength(projects.projects.length);
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

    useEffect(() => {
        if(!isLoading){
            dispatch(loadProjectOnceAction( filterInput, 1));
        }
    }, [dispatch]);


    const FilterMenu = () => {
        $('.Filter-Row').slideToggle('active-filter-form');
    }

    return (
        <>
            <div className="Page-Wrapper" >
                <div className="container">
                    <div>
                        <div className='filter-mobile'>
                            <h4>Filters</h4>
                            <button onClick={FilterMenu}><i className="uil uil-filter"></i></button>
                        </div>
                        {/* <div className="Filter-Row"> */}
                            <FilterProject
                               {...data}
                            />
                        {/* </div> */}
                    </div>
                    <div className="offers-list">
                        <div className='offer-title' style={{width: '100px', pointerEvents: 'none'}}>
                            <span className='offer-sector-name'>{currentLength} of {totalProjects}</span><br/>
                        </div>
                        <div className="row" >
                            {
                                loading === true ? (
                                    <ProjectSkeleton/>
                                ) : projects.success === false ? (
                                    <Redirect to={{pathname: '/opps'}} />
                                ) : (
                                    () => {
                                        
                                        if  (
                                            projects.success !== false && 
                                            projects !== undefined && 
                                            projects.projects !== undefined && 
                                            projects !== "loading" && 
                                            projects.projects.length > 0
                                        ) {

                                            return (
                                                projects.projects.map((project, index) => {
                                                    
                                                    if (projects.projects.length === index +1){
                                                        return (
                                                            <div  className="col-lg-4 col-md-6"   key={project.id} ref={lastProjectElementRef}>
                                                                <ProjectView   project={project} />
                                                            </div>
                                                        )

                                                    }else{
                                                        return(
                                                            <div  className="col-lg-4 col-md-6" key={project.id}>
                                                                <ProjectView   project={project} />
                                                            </div>

                                                        )
                                                    }
                                                })
                                            )
                                        }else {
                                        return (
                                            <div className="col-md-12">
                                                <div className="offer-box">
                                                    <div className="offer-box">
                                                    {t('noresultfound')}
                                                    </div>
                                                </div>
                                            </div>)
                                        }
                                    }
                                )
                                ()
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}


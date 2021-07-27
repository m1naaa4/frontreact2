import React, {useRef, useCallback, useState, useEffect} from 'react'
import {Text} from "../../containers/Language";
import FilterProject from "../User/Fields/Filter/FilterProject";
import ProjectView from "./ProjectGridView";
import ProjectSkeleton from "../../skeleton/ProjectSkeleton";
import {useDispatch, useSelector} from "react-redux";
import {loadProjectAction, loadProjectOnceAction} from "../../store/actions/User/Project/ProjectActions";
import {Redirect} from 'react-router-dom';


export default function ListProjectView({filterInput, setFilterInput, props}) {

    const data = { filterInput, setFilterInput, props };

    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const observer = useRef()

    const projects =  useSelector(state => state.projects.projects);

    const hasMore = useSelector(state => state.projects.hasMore);
    const current = useSelector(state => state.projects.current);
    const loading = useSelector(state => state.projects.loading);
    const lastProjectElementRef = useCallback( node =>{
        if (projects.loading) return
       
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver( entries =>{
            if (entries[0].isIntersecting && hasMore  ){  
                filterInput.filters = false;              
                dispatch(loadProjectAction( filterInput, props, current+1));
                setIsLoading(true)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

    useEffect(() => {
        if(!isLoading){
            dispatch(loadProjectOnceAction( filterInput, props, 1));
        }
    }, [dispatch]);  

    const goToShowproject = (id) => {
  //      props.history.push('/project/show/'+ id)
    };

    return (
        <>
            <div className="Page-Wrapper" >
                <div className="container">
                    <div className="page-header">
                        <h3><Text tid="listproject" /></h3>
                    </div>
                    <div>
                        <div className="Filter-Row">
                            <FilterProject
                                {...data}
                            />
                        </div>
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
                                        
                                        if  (projects.success !== false && projects!==undefined && projects!=="loading" && projects.length>0) {

                                            return (
                                                projects.map((project, index) => {
                                                    if (projects.length === index +1){
                                                        return (
                                                            <div  className="col-md-4"   key={index +1} ref={lastProjectElementRef}>
                                                                <ProjectView   project={project} />
                                                            </div>
                                                        )

                                                    }else{
                                                        return(
                                                            <div  className="col-md-4" key={index +1}>
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
                                                        no result found
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
                    {/*<input type="button" value="click" onClick={handleFilterProjects}/>*/}
                </div>
            </div>
        </>

    )
}


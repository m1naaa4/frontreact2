import React, {useRef, useCallback} from 'react'
import {Text} from "../../../containers/Language";
import FilterProject from "../Fields/Filter/FilterProject";
import ProjectView from "../Project/ProjectView";
import ProjectSkeleton from "../../../skeleton/ProjectSkeleton";
import {useDispatch, useSelector} from "react-redux";
import {loadProjectAction} from "../../../store/actions/User/Project/ProjectActions";


export default function PorteurView({filterInput, setFilterInput, props}) {

    const data = { filterInput, setFilterInput, props };

    const dispatch = useDispatch();
    const observer = useRef()

    const projects =  useSelector(state => state.projects.projects);

    const hasMore = useSelector(state => state.projects.hasMore);
    const current = useSelector(state => state.projects.current);
    const loading = useSelector(state => state.projects.loading);

    const lastProjectElementRef = useCallback(node =>{
        if (projects.loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver( entries =>{
            if (entries[0].isIntersecting && hasMore){
                dispatch(loadProjectAction( filterInput, props,current+1));
            }
        })
        if (node) observer.current.observe(node)
    }, [loading,hasMore])

    const goToDetailProject = () =>
    {
        // console.log("props", props)
        props.history.push('/projects/detail');
    };

    const goToShowproject = (id) => {
        props.history.push('/project/show', { id: id });
    };

    return (
             <>
                 <div className="Page-Wrapper">
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
                                         <div data-testid="error-message">ERROR</div>
                                     ) : (
                                         () => {
                                             // console.log("projectoooooo",projects)
                                             if  (projects.success !== false && projects!==undefined && projects!=="loading" && projects.length>0) {

                                                 return (
                                                     projects.map((project, index) => {
                                                         if (projects.length === index +1){
                                                             return (
                                                                 <div  className="col-md-4" onClick={() => goToShowproject(project.id) }   key={index +1} ref={lastProjectElementRef}>
                                                                     <ProjectView   project={project} />
                                                                 </div>
                                                             )

                                                         }else{
                                                             return(
                                                                 <div  className="col-md-4" onClick={() => goToShowproject(project.id) } key={index +1}>
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
                                                     </div>
                                                 )
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


import React, {useRef, useState, useReducer, useCallback, useEffect} from 'react'
import Footer from "../../../layout/footer/footer";
import {Text} from "../../../containers/Language";
import ProjectView from "../Project/ProjectView";
import searchAction from "../../../store/actions/User/Project/SearchAction";
import ProjectSkeleton from "../../../skeleton/ProjectSkeleton";
import FilterProject0 from "../Fields/Filter/FilterProject0";


export default function PorteurView0(props) {
    console.log("props", props)
    const [filterInput, setFilterInput] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            sector: "",
            zone: "",
            search: "",
            financement: "",
        }
    );

    const [pageNumber, setPageNumber] = useState(0)

    const {projects, hasMore, loading, error} = searchAction (filterInput, pageNumber)

    const observer = useRef()

    // console.log(observer)
    const lastProjectElementRef = useCallback(node =>{
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver( entries =>{
            if (entries[0].isIntersecting && hasMore){
                setPageNumber(hasMore+1)
                console.log("Visible",hasMore)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading,hasMore])

    const handleFilterProjects = (event) => {
        const { name, value } = event.target;
        setFilterInput({ [name]: value });
        setPageNumber(1)
    };

    const filterProjects    = (list) => {
        return list.filter((item) => {
            return (
                item.name.toLowerCase().includes(filterInput.search.toLowerCase()) &&
                // item.sector.toLowerCase().includes(filterInput.sector.toLowerCase()) &&
                item.project_area.toLowerCase().includes(filterInput.zone.toLowerCase()) &&
                item.funding_search.toLowerCase().includes(filterInput.financement)
            );
        });
    };

    const projectList       = filterProjects(projects);

    const goToAddproject = () =>
    {
        console.log("props", props)
        props.props.history.push('/addproject');
    };

    return (
             <>
                 <div className="Page-Wrapper">
                     <div className="container">
                         <div className="page-header">
                             <h3><Text tid="listproject" /></h3>
                             {/*<h3>{nameState}</h3>*/}
                         </div>

                         <div>
                             <div className="Filter-Row">
                                 <FilterProject0
                                     searchValue={filterInput}
                                     handleChangeValue={handleFilterProjects}
                                 />
                             </div>
                         </div>

                         <div className="offers-list">
                             <div className="row" >
                                 {
                                     loading ? (
                                         <ProjectSkeleton/>
                                 ) : error ? (
                                     <div data-testid="error-message">Ooops. An error occured!</div>
                                 ) : (
                                         () => {
                                                     if  (projectList.length > 0){
                                                         return (
                                                             projectList.map((project, index) => {
                                                                 if (projects.length === index +1){
                                                                     return (
                                                                         // <ProjectSkeleton/>
                                                                         <div onClick={goToAddproject} className="col-md-4" key={index +1} ref={lastProjectElementRef}>
                                                                            <ProjectView   project={project} />
                                                                        </div>
                                                                     )

                                                                 }else{
                                                                     return(
                                                                         // <ProjectSkeleton/>
                                                                         <div onClick={goToAddproject} className="col-md-4" key={index +1} >
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
                     </div>
                 </div>
                 <Footer />
             </>

    )
}


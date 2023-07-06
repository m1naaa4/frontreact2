import React, {useRef, useCallback, useState, useEffect} from 'react'
import ProjectSkeleton from "../../skeleton/ProjectSkeleton";
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ListingItemMentor from './ListingItemMentor';
import FilterMentor from '../User/Fields/Filter/FilterMentor';
import { GetMentors, loadMentorOnceAction } from '../../store/actions/Mentor/MentorActions';


export default function ListingMentors(props) {
    const { t, i18n } = useTranslation();
    const tag_state = useSelector(state => state.generaleVariable.tag);
    const tags = tag_state ? tag_state : [];

    const [filterInput, setFilterInput] = useState({
        'filters': true,
        'project_area': '',
        'funding_search': '',
        'sector': '',
        'search': '',
        'tags': tags,
    });

    const data = {
        filterInput,
        setFilterInput,
        props
    };

    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const projects = useSelector(state => state.mentors);
    const hasMore = useSelector(state => state.mentors.hasMore);
    const current = useSelector(state => state.mentors.current);
    const loading = useSelector(state => state.mentors.loading);

    const observer = useRef()
    const lastProjectElementRef = useCallback( node =>{
        if (projects.loading) return

        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                filterInput.filters = false;
                dispatch(GetMentors(filterInput, current + 1));
                setIsLoading(true)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

   useEffect(() => {
        if (!isLoading) {
            dispatch(loadMentorOnceAction(filterInput, 1));
        }
    }, [dispatch]);

    return (
            <div className="Page-Wrapper" >
                <div className="container">
                    <div className="Filter-Row">
                        < FilterMentor {
                            ...data
                        }
                        />
                    </div>

                     <div className="offers-list">
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
                                            projects.mentors != undefined &&
                                            projects.mentors.length > 0
                                        ) {

                                            return (
                                                projects.mentors.map((mentor, index) => {
                                                    if (projects.mentors.length === index +1){
                                                        return (
                                                            <div  className="col-md-4" key={mentor.id} ref={lastProjectElementRef}>
                                                                <ListingItemMentor project={mentor} />
                                                            </div>
                                                        )

                                                    }else{
                                                        return(
                                                            <div  className="col-md-4" key={mentor.id}>
                                                                <ListingItemMentor  project={mentor} />
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

    )
}


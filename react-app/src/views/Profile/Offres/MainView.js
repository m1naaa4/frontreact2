import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { getMyOffresAction } from '../../../store/actions/User/Project/ProjectAction';
import OffreGrid from './OffreGrid';
import ProfileHeaderForm from '../ProfileFormData';
import { ProfileAction } from '../../../store/actions/Profile/UserActions';
import { useLocation, useParams } from 'react-router';
import $  from 'jquery';


export default function MainView(props) { 
    const dispatch = useDispatch();
    const offres = useSelector(state => state.offres.offres);
    const params = useParams();
    const location = useLocation();
    console.log(offres)
    $(window).on('load', function(){
        dispatch( ProfileAction(params.id));
    });
    const infoProfile = useSelector(state => state.infoProfile);
    
    useEffect(() => { 
        let data = {
            action : 'getmyprojectlist',
            userIdd : infoProfile.user_id
        }       
        dispatch(getMyOffresAction(data, '', ''));
        //dispatch( ProfileAction(params.id));
    },[dispatch , location])

    return (
        <>  
        <ProfileHeaderForm {...props}/>
        <div className="Page-Wrapper Profile">
            <div className="container">
                <div className="offers-list">
                    <div className="row">
                        {offres?.projects &&
                            offres?.projects.map((offre, index) => (
                            <div div className="col-md-6 col-lg-4" key={index}>
                                <OffreGrid offre={offre}/>
                            </div>     
                        ))
                        }
                         {!offres?.projects?.length>0 &&
                            <div className="col-md-12">
                              <div className="offer-box">
                                 <div className="offer-box">
                                     no result found
                                 </div>
                              </div>
                            </div>
                         }
                    </div>
                    </div>
            </div>
        </div>
        
        </>
    
           
        
    )
}

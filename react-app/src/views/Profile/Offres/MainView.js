import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { getMyOffresAction } from '../../../store/actions/User/Project/ProjectAction';
import OffreGrid from './OffreGrid';



export default function MainView(props) { 
    const dispatch = useDispatch();
    const offres = useSelector(state => state.offres.offres);
    console.log(offres)
    useEffect(() => { 
        let data = {
            action : 'getmyprojectlist'
        }       
        dispatch(getMyOffresAction(data, '', ''));
    },[])

    return (
        <>  
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

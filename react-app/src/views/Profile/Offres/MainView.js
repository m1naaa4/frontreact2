import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import OffreGrid from './OffreGrid';
import ProfileHeaderForm from '../ProfileFormData';
import { ProfileAction } from '../../../store/actions/Profile/UserActions';
import { useLocation, useParams } from 'react-router';
import $ from 'jquery';
import { getMyContentsAction } from '../../../store/actions/Offres/MyContentAction';
import OffresSkeleton from '../../../skeleton/profile/OffresSkeleton';

export default function MainView(props) {
    const dispatch = useDispatch();
    const offres = useSelector(state => state.offres.mycontents);
    const loading = useSelector(state => state.offres.loading);
    const params = useParams();
    const location = useLocation();
    $(window).on('load', function () {
        dispatch(ProfileAction(params.id));
    });

    useEffect(() => {
        let data = {
            url: 'creation/getContents',
            user_profile_id: params.id
        }
        dispatch(getMyContentsAction(data, '', ''));
        //dispatch( ProfileAction(params.id));
    }, [dispatch, location])

    if (loading) {
        return <OffresSkeleton />
    }
    return (
        <div className="col-md-9">
            <div className="Center-Side">
                <div className="container">
                    <div className="offers-list">
                        <div className="row">
                            {offres &&
                                offres.map((offre, index) => (
                                    <div className="col-md-6" key={index}>
                                        <OffreGrid offre={offre} />
                                    </div>
                                ))
                            }
                            {!offres?.length === 0 &&
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
        </div>
    )
}

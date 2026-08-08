import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { getMyContentsAction } from '../../../store/actions/Offres/MyContentAction';
import OffresSkeleton from '../../../skeleton/profile/OffresSkeleton';
import ProjectGridView from '../../Projects/ProjectGridView';
import ListingItemFunder from '../../Funder/ListingItemFunder';
import ListingItemMentor from '../../Mentor/ListingItemMentor';
import { useTranslation } from 'react-i18next';

export default function MainView(props) {
    const dispatch = useDispatch();
    const offres = useSelector(state => state.offres.mycontents);
    const loading = useSelector(state => state.offres.loading);
    const params = useParams();
    const location = useLocation();
    const {t} = useTranslation();

    useEffect(() => {
        let data = {
            url: 'creation/getContents',
            user_profile_id: params.id
        }
        dispatch(getMyContentsAction(data, '', ''));
    }, [dispatch, location])

    if (loading) {
        return <OffresSkeleton />
    }
    return (
        <div className="col-md-9">
            <div className="Center-Side">
                <div className="container">
                    <div className="Profile-Section">
                        <div className="Profile-Section-Header">
                            <div>
                                <h3>{t('offerings') || 'Offers'}</h3>
                                <p>{offres?.length || 0} contenu(s) associé(s) à ce profil.</p>
                            </div>
                        </div>
                    </div>
                    <div className="offers-list Profile-Offers-Grid">
                        <div className="row">
                            {offres &&
                                offres.map((offre, index) => (
                                    <div className="col-md-6" key={index}>
                                        {(function() {
                                            
                                            switch (offre.provider) {
                                                case "project":
                                                    return <ProjectGridView project={offre}/>;
                                                case "funder":
                                                    return <ListingItemFunder project={offre}/>;
                                                case "mentor":
                                                    return <ListingItemMentor project={offre}/>;
                                                default:
                                                    return null;
                                            }
                                        })()}
                                </div>
                                ))
                            }
                            {!offres?.length === 0 &&
                                <div className="col-md-12">
                                    <div className="offer-box Profile-Empty-State">
                                        <div className="offer-box">
                                            {t('noresultfound')}
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

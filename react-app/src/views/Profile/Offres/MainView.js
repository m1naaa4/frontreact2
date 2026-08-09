import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router';
import { getMyContentsAction } from '../../../store/actions/Offres/MyContentAction';
import OffresSkeleton from '../../../skeleton/profile/OffresSkeleton';
import ProjectGridView from '../../Projects/ProjectGridView';
import ListingItemFunder from '../../Funder/ListingItemFunder';
import ListingItemMentor from '../../Mentor/ListingItemMentor';
import { useTranslation } from 'react-i18next';

export default function MainView() {
    const dispatch = useDispatch();
    const offres = useSelector(state => state.offres.mycontents);
    const loading = useSelector(state => state.offres.loading);
    const params = useParams();
    const location = useLocation();
    const { t } = useTranslation();
    const [page, setPage] = useState(1);
    const perPage = 3;
    const loadMoreRef = useRef(null);

    useEffect(() => {
        dispatch(getMyContentsAction({
            url: 'creation/getContents',
            user_profile_id: params.id
        }, '', ''));
    }, [dispatch, location.pathname, params.id]);

    useEffect(() => {
        setPage(1);
    }, [params.id, location.pathname]);

    const totalPages = Math.max(1, Math.ceil((offres?.length || 0) / perPage));
    const visibleOffers = useMemo(() => {
        const start = (page - 1) * perPage;
        return (offres || []).slice(0, start + perPage);
    }, [offres, page]);

    useEffect(() => {
        if (!offres?.length) return;
        if (page >= totalPages) return;
        const sentinel = loadMoreRef.current;
        if (!sentinel) return;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setPage((currentPage) => Math.min(currentPage + 1, totalPages));
            }
        }, { root: null, rootMargin: '160px 0px', threshold: 0.1 });

        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [offres?.length, page, totalPages]);

    if (loading) return <OffresSkeleton />;

    return (
        <div className="col-12">
            <div className="Center-Side">
                <div className="container">
                    <div className="Profile-Section">
                        <div className="Profile-Section-Header Profile-Section-Header-Soft">
                            <div>
                                <h3>{t('offerings') || 'Offers'}</h3>
                                <p>{offres?.length || 0} contenu(s) associé(s) à ce profil.</p>
                            </div>
                            <div className="Profile-Section-Header-Badge">{Math.min(page, totalPages)} / {totalPages}</div>
                        </div>
                    </div>

                    <div className="offers-list Profile-Offers-Grid Profile-Offers-Grid-Modern">
                        <div className="row g-3">
                            {visibleOffers.length > 0 ? visibleOffers.map((offre, index) => (
                                <div className="col-12 col-md-4" key={index}>
                                    <div className="Profile-Offer-Card">
                                        {(() => {
                                            switch (offre.provider) {
                                                case 'project':
                                                    return <ProjectGridView project={offre} />;
                                                case 'funder':
                                                    return <ListingItemFunder project={offre} />;
                                                case 'mentor':
                                                    return <ListingItemMentor project={offre} />;
                                                default:
                                                    return null;
                                            }
                                        })()}
                                    </div>
                                </div>
                            )) : (
                                <div className="col-12">
                                    <div className="offer-box Profile-Empty-State">
                                        <div className="offer-box">{t('noresultfound')}</div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {page < totalPages && <div ref={loadMoreRef} className="Profile-Offers-Sentinel" aria-hidden="true" />}
                    </div>
                </div>
            </div>
        </div>
    );
}

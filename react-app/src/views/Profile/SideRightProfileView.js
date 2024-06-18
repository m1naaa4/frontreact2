import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { InvitationsAction, SuggestionsAction } from '../../store/actions/Friend/FriendsAction';
import Invitations from './Friend/Invitations'
import SuggestionList from './Friend/SuggestionList'
import Skeleton from '@material-ui/lab/Skeleton';
import { useTranslation } from 'react-i18next';


export default function SideRightProfileView() {

  const userProfile = useSelector(state => state.userProfile.userProfile);
  const invitations = useSelector(state => state.userProfile.invitations);
  const suggestions = useSelector(state => state.userProfile.suggestions);

  const { t } = useTranslation();

  const dispatch = useDispatch();
  useEffect(() => {
    let data = {
      'url': 'friend/getInvitations'
    }

    let data1 = {
      'url': 'friend/getSuggestions'
    }
    dispatch(InvitationsAction(data));
    dispatch(SuggestionsAction(data1));
  }, []);


  return (
    <div className="col-md-4 col-lg-3 order-first">
      {

        <div className="Right-Side">

          <div className="Contact-Widget">
            <h3 className="Widget-Title">{t(`requests`)}</h3>
            <div className="Suggestion-List">
              {invitations && invitations !== 'loading' ? invitations.slice(0, 3).map((invitation, index) =>
                <Invitations invitation={invitation} key={invitation.id} />
              ) : Array(3).fill().map((item, index) => (
                <div className="d-flex align-items-center" key={index}>
                  <Skeleton width={40} height={40} style={{ borderRadius: "100%" }} /> &nbsp; <Skeleton width={150} height={24} />
                </div>
              ))
              }
            </div>
            {invitations?.length >= 4 && <Link to={`/profile/` + userProfile?.profile_id + `/friends/invitations`} className="Contact-SeeMore" href="#">{t(`seeMore`)}</Link>}
          </div>
          <div className="Contact-Widget">
            <h3 className="Widget-Title">{t(`suggestions`)}</h3>
            <div className="Suggestion-List">
              {suggestions && suggestions !== 'loading' ? suggestions.slice(0, 3).map((suggestion, index) =>
                <SuggestionList suggestion={suggestion} key={suggestion.id} />
              ) : Array(3).fill().map((item, index) => (
                <div className="d-flex align-items-center" key={index}>
                  <Skeleton width={40} height={40} style={{ borderRadius: "100%" }} /> &nbsp; <Skeleton width={100} height={24} /> &nbsp; <Skeleton width={40} height={40} style={{ borderRadius: "100%" }} />
                </div>
              ))
              }
            </div>
            {suggestions?.length >= 4 && <Link to={`/profile/` + userProfile?.profile_id + `/friends/suggestions`} className="Contact-SeeMore" href="#">{t(`seeMore`)}</Link>}
          </div>

          <div className="Widget-Conseils">
            <h3 className="Widget-Title">{t(`tips`)}</h3>
            <div className="Featured-Post-Thumb"><img src="/assets/images/conseils/Conseils-de-DADUPA.jpg" alt="" /></div>
            <div className="Featured-Post-Content">
              <div className="Featured-Post-Title"><a href="#!"> {t(`Le_marketing_digital_au_service`)}</a></div>
              <div className="Featured-Post-Meta">
                <ul>
                  <li><span>275 </span>{t(`viewplural`)}</li>
                  <li><span>41 </span>{t(`weekplural`)}</li>
                </ul>
              </div>
            </div>
          </div>
          {/* <div className="Widget-Sponsored">
              <h3 className="Widget-Title">Sponsored</h3>
              <div className="Sponsored-Post-Thumb">

              </div>
              <div className="Sponsored-Post-Content">
                <div className="Sponsored-Post-Title"><a href="#!">Le marketing digital au service</a></div>
                <div className="Sponsored-Post-Meta"><a href="#!">dadupa.com</a></div>
              </div>
            </div> */}
        </div>

      }
    </div>

  )
}

import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import { InvitationsAction, SuggestionsAction } from '../../store/actions/Friend/FriendsAction';
import Invitations from './Friend/Invitations'
import SuggestionList from './Friend/SuggestionList'




export default function SideRightProfileView() {

  const invitations = useSelector(state => state.userProfile.invitations);
  const suggestions = useSelector(state => state.userProfile.suggestions);

  const dispatch = useDispatch();
  useEffect(() => {
    let data = {
      'url' : 'friend/getInvitations'
    }
    
    let data1 = {
      'url' : 'friend/getSuggestions'
    }
    dispatch(InvitationsAction(data)); 
    dispatch(SuggestionsAction(data1)); 
  },[])

  return (
        
        <div className="col-md-3">
            {
              
            <div className="Right-Side">

            <div className="Contact-Widget">
              <h3 className="Widget-Title">Invitations</h3>
              <div className="Suggestion-List">
              {invitations && invitations !=='loading' && invitations.map((invitation, index) => 
                    <Invitations invitation={invitation} key={invitation.id}/>
                     )
                }
              </div>
            </div>
            <div className="Contact-Widget">
              <h3 className="Widget-Title">Suggestion de contacts</h3>
              <div className="Suggestion-List">
              {suggestions && suggestions !=='loading' && suggestions.map((suggestion, index) => 
                    <SuggestionList suggestion={suggestion} key={suggestion.id}/>
                     )
                }
              </div>
              <a className="Contact-SeeMore" href="#">Voir plus</a>
            </div>
            
            <div className="Widget-Conseils">
              <h3 className="Widget-Title">Conseils de DADUPA</h3>
              <div className="Featured-Post-Thumb"><img src="/assets/images/conseils/Conseils-de-DADUPA.jpg"  alt=""/></div>
              <div className="Featured-Post-Content">
                <div className="Featured-Post-Title"><a href="#!">Le marketing digital au service</a></div>
                <div className="Featured-Post-Meta">
                  <ul>
                    <li><span>275 </span>Views</li>
                    <li><span>41 </span>weeks ago</li>
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

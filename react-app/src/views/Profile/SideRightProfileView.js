import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import Invitations from './Friend/Invitations'
import SuggestionList from './Friend/SuggestionList'
import { GetInvitationsAction} from "../../store/actions/Friend/InvitationsAction";




export default function SideRightProfileView() {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetInvitationsAction()); 
  },[])

  return (
        
        <div className="col-md-3">
            {
              
            <div className="Right-Side">

            <div className="Contact-Widget">
              <h3 className="Widget-Title">Invitations</h3>
              <Invitations/>
            </div>
            <div className="Contact-Widget">
              <h3 className="Widget-Title">Suggestion de contacts</h3>
              <SuggestionList/>
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
            <div className="Widget-Sponsored">
              <h3 className="Widget-Title">Sponsored</h3>
              <div className="Sponsored-Post-Thumb">

              </div>
              <div className="Sponsored-Post-Content">
                <div className="Sponsored-Post-Title"><a href="#!">Le marketing digital au service</a></div>
                <div className="Sponsored-Post-Meta"><a href="#!">dadupa.com</a></div>
              </div>
            </div>
          </div>
           
        }
          </div>
        
    )
}

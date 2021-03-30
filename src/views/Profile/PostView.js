import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import FileUploadService from '../../helpers/FileUploadService';
import { ProfileAction } from '../../store/actions/Profile/UserActions';
import AddPostView from './Post/AddPostView';
import ListPostsView from './Post/ListPostsView';
import Post from './Post/Post';



export default function PostView(props) {

    return (
        
        <div className="col-md-6">
            <div className="Center-Side">

              <div className="Filter-Row">
                <form className="Filter-Form NoMargin-Top Margin-Bottom_30" action="#" method="post">
                  <div className="row">
                    <div className="col-sm-12 col-md-12 col-lg-12">
                      <div className="display-flex">
                        <div className="input-row">
                          <button type="button" className="OrderAlph">Ordre Alphabétique</button>
                        </div>
                        <div className="input-row date-row">
                          <div id="reportrange">
                              <i className="uil uil-calendar-alt"></i>&nbsp;
                              <span></span> <i className="fa fa-caret-down"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              <AddPostView  {...props}/>

              <div className="Posts-List">
                
             <ListPostsView/>

              </div>
            </div>
          </div>
          
        
    )
}

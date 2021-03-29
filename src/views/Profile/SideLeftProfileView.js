import React, {useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import FileUploadService from '../../helpers/FileUploadService';
import { ProfileAction } from '../../store/actions/Profile/UserActions';



export default function SideLeftProfileView() {

    const infoprofile = useSelector(state => state.infoProfile);

    useEffect(() => {        
      if (infoprofile.infoprofile.networks) {
      }
  })
   
  let networks;
  if (infoprofile.infoprofile.networks) {
          
    networks = <>{infoprofile.infoprofile.networks.map((name, index) => (
      // console.log(name.name)
              <li key={index}><i className={name.class}></i><a href={name.link}>@{name.name}</a> </li>
          ))}
    </>
}
    return (
        
        <div className="col-md-3">
            {
            infoprofile.infoprofile !== "" && infoprofile.infoprofile !== 'loading' ?
            <div className="Left-Side">
              <div className="Widget-BOX Profile-Info">
                <h3 className="Widget-Title text-center">Les 7 derniers jours</h3>
                <div className="Widget-Stats">
                  <div className="Stats-Field Stats-Field-Col-2">
                    <div className="Stats-Value"><span>+ </span><span className="counter">45</span></div>
                    <div className="Stats-Text">Interactions<br/> offres</div>
                  </div>
                  <div className="Stats-Field Stats-Field-Col-2">
                    <div className="Stats-Value"><span>+ </span><span className="counter">30</span></div>
                    <div className="Stats-Text">Visites<br/> de profil</div>
                  </div>
                </div>
              </div>
              <div className="Widget-BOX">

                <div className="Profile-Info Profile-Infos-Items">
                  <button type="button" className="UpdateInfos-BTN" data-toggle="modal" data-target="#exampleModalCenter"><i className="uil uil-pen"></i></button>
                  <ul>
                    <li><i className="uil uil-user"></i> {infoprofile.infoprofile.age}</li>
                    <li><i className="uil uil-crosshair"></i> {infoprofile.infoprofile.job}</li>
                    <li><i className="uil uil-phone"></i> {infoprofile.infoprofile.phone}</li>
                    <li><i className="uil uil-envelope"></i> {infoprofile.infoprofile.email}</li>
                    {networks}
                  </ul>
                </div>
                <div className="Profile-Info Profile-Bio">
                  <h3>Bio</h3>
                  <span>{infoprofile.infoprofile.about}</span>
                </div>
                <div className="Profile-Info">
                  <h3>Secteur d’activité</h3>
                  <span>{infoprofile.infoprofile.sector}</span>
                </div>
                <div className="Profile-Info">
                  <h3>Lieu de résidence</h3>
                  <span>{infoprofile.infoprofile.address}</span>
                </div>
                <div className="Profile-Adresse">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.443077639317!2d-7.6081671853399175!3d33.593806480733214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd6c03865309%3A0x1281f2138bd13aab!2sRegus%20-%20Casablanca%2C%20Downtown!5e0!3m2!1sen!2sma!4v1593043725007!5m2!1sen!2sma" 
                        style={{width:"100%", height:"200", frameborder:"0", style:"border:0", allowfullscreen:"", ariaHidden:"false", tabindex:"0"}}></iframe>
                </div>
              </div>
            </div>
            : infoprofile.success === false ?
            infoprofile.message: <span/>
        }
          </div>
        
    )
}

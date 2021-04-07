import React  from 'react'
import {useDispatch, useSelector} from "react-redux";


export default function SearchBar({filterInput, setFilterInput, props}) {


    


    return (
        <div className="Messenger-ListHeader">
            <button className="Messenger-ListHeaderButton" type="button" data-target="#Search-Modal" data-toggle="modal" data-placement="bottom" title="New Message"><i className="uil uil-focus-add"></i></button>
            <div className="Messenger-Search">
                <form className="search" action="#" method="post">
                    <input type="search" name="search" placeholder="Search in Messenger" value=""/>
                    <button type="submit" name="submit"><i className="uil uil-search"></i></button>
                </form>
            </div>
            <div className="Preferences-Options">
                <button type="button" data-toggle="tooltip" data-placement="bottom" title="Messenger Preferences" className="Messenger-PreferencesBTN"><i className="uil uil-ellipsis-v"></i></button>
                <ul className="Preferences-List">
                    <li className="Preferences-Option"><button>Action 1</button></li>
                    <li className="Preferences-Option"><button>Action 2</button></li>
                    <li className="Preferences-Option"><button>Action 3</button></li>
                </ul>
            </div>
        </div>
    )
}
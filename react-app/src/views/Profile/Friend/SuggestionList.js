import React from 'react'




const  SuggestionList = () => {


    return (
        <div className="Suggestion-List">
            <div className="Contact">
                <span className="Profile-Icon"><i className="uil uil-lightbulb-alt"></i></span>
                <div className="Contact-Thumb"><img src="/assets/images/profiles/profile-1.jpg"  alt=""/></div>
                <div className="Contact-Infos">
                    <h4>Nom complet</h4>
                </div>
                <div className="Add-Contact">
                    <button type="button" name="button"><i className="uil uil-user-plus"></i></button>
                </div>
            </div>
        
        </div>
    )

}
export default SuggestionList;
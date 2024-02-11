import React from 'react'
import { useTranslation } from 'react-i18next'


export default function SideLeftSettingView(props) { 
    const {t} = useTranslation();

    return (
        <>  

            <div className="col-md-4 col-lg-4 d-md-none d-lg-block">
              <div className="page-header">
                <h3>{t('generalsettings')}</h3>
                <p>Enter details about the project <br/>to preceed further</p>
                <img src="/assets/images/offer-thumbnail.svg" alt=""/>
              </div>
            </div>

        </>
    
           
        
    )
}
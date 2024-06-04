import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';


export default function NoContent() {
    const history = useHistory();
    const {t} = useTranslation();

    return (
      <div className='empty-state'>
        <div className='empty-state-content'>
          <h3 style={{ fontSize: "16px !important" }} className="single-offer-name">{t('noContentAvailable')}</h3>
          <img src="/assets/images/empty-state.png" alt="No content available" />
          <button onClick={history.goBack} name="previous" className="previous action-button">
            <i className="uil uil-arrow-left  "></i> {t('previous')}
          </button>
        </div>
      </div>
    )
}
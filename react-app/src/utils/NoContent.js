import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';


export default function NoContent() {
    const history = useHistory();
    const {t} = useTranslation();

    return (
        <div className='single-header mt-5 align-items-center'>
        <h3 style={{ fontSize: "16px !important" }} className="single-offer-name">{t('noContentAvailable')}</h3>

        <img style={{ height: '50vh' }} src="/assets/images/no-data.png" alt="No content available" />

        <button onClick={history.goBack} style={{ width: '200px' }} name="previous" className="previous action-button">
          <i className="uil uil-arrow-left  "></i> {t('previous')}
        </button>
      </div>
    )
}
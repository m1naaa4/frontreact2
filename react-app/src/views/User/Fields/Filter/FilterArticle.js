import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import { getArticles } from '../../../../store/actions/Articles/ArticlesActions';
import AllMultiselectCheckboxCategories from '../../../../utils/Filters/AllMultiselectCheckboxCategories';
import 'jquery-ui/themes/base/all.css';
import 'daterangepicker/daterangepicker.css';

import RangeDatePicker from '../../../../utils/RangeDatePicker';

import 'daterangepicker';
import 'daterangepicker/daterangepicker.css';


function FilterArticle({ filterInput }) {
    const { t } = useTranslation();

    const categories = useSelector(state => state.articles.categories);

    const [selectedCategoris, setSelectedCat] = useState();
    const [search, setSearch] = useState();
    const [dateRange, setDate] = useState();
    

    const dispatch = useDispatch();

    const handleSubmitValue = (e) => {
        e.preventDefault();
        filterInput.filters = true;

        let dcategory = selectedCategoris?.map((name, index) => (
            name.label
        ));

        filterInput.category = dcategory;
        filterInput.search = search;
        filterInput.created = {'startDate': dateRange};

        dispatch(getArticles(filterInput));
    }

    return (
        <div className="Filter-Row">
            <div className="Filter-Form mt-0 mb-5">
                <div className="row">
                    <div className="col-sm-11 col-md-12 col-lg-12">
                        <div className="display-flex">
                            <div className="input-row">
                                <input type="text" name="title" onChange={(e) => setSearch(e.target.value)} placeholder={t('form.menu.articles.title')} className="wizard-required" />
                            </div>
                            <div className="input-row input-multi-filter input-small">
                                <AllMultiselectCheckboxCategories {...{ setSelectedCat }} datas={categories} />
                            </div>
                            <div className="input-row">
                                <RangeDatePicker placeholderText={t('start')} selectedRangeDate={dateRange} {...{setDate}}/>
                            </div>
                            <div className="input-row">
                                <button type="submit" name="submit" style={{marginRight:"0px"}}  onClick={handleSubmitValue} className="filter-button">
                                    <i className="uil uil-search"></i> {t('search')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FilterArticle;

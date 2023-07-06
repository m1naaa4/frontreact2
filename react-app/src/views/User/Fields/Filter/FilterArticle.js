import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from 'react-i18next';
import { getArticles } from '../../../../store/actions/Articles/ArticlesActions';
import AllMultiselectCheckboxCategories from '../../../../utils/Filters/AllMultiselectCheckboxCategories';
import ReactDatePicker from 'react-datepicker';



function FilterArticle({ filterInput }) {
    const { t } = useTranslation();

    const categories = useSelector(state => state.articles.categories);

    const [selectedCategoris, setSelectedCat] = useState();
    const [search, setSearch] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    

    const dispatch = useDispatch();

    const handleSubmitValue = (e) => {
        e.preventDefault();
        filterInput.filters = true;

        let dcategory = selectedCategoris?.map((name, index) => (
            name.label
        ));

        filterInput.categories = dcategory;
        filterInput.search = search;
        filterInput.created = {'startDate': startDate, 'endDate': endDate};

        dispatch(getArticles(filterInput));
    }

    return (
        <div className="Filter-Row">
            <div className="Filter-Form mt-0 mb-5">
                <div className="row">
                    <div className="col-sm-11 col-md-12 col-lg-12">
                        <div className="display-flex">
                            <div className="input-row">
                                <input type="text" name="title" onChange={(e) => setSearch(e.target.value)} placeholder="title" className="wizard-required" />
                            </div>
                            <div className="input-row input-multi-filter input-small">
                                <AllMultiselectCheckboxCategories {...{ setSelectedCat }} datas={categories} />
                            </div>
                            <div style={{ width: '125px' }} className="input-row">
                                <ReactDatePicker className="wizard-required" placeholderText='start date' selected={startDate} onChange={(date) => setStartDate(date)} />
                            </div>
                            <div style={{ width: '125px' }} className="input-row">
                                <ReactDatePicker className="wizard-required" placeholderText='end date' selected={endDate} onChange={(date) => setEndDate(date)} />
                            </div>
                            <div className="input-row ml-auto w-auto">
                                <button type="submit" name="submit"  onClick={handleSubmitValue} className="article-filter-btn">
                                    <i className="uil uil-search"></i> Search
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

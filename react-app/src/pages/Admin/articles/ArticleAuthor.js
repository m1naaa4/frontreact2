import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAuthorArticles, getCategories } from '../../../store/actions/Articles/ArticlesActions';
import 'react-quill/dist/quill.snow.css';
import ReactDatePicker from 'react-datepicker';
import AllMultiSelectCheckboxCategory from '../../../utils/Filters/AllMultiselectCheckboxCategories';
import ArticleListView from '../../../views/Articles/ArticleListView';
import { useParams } from 'react-router'
import { useTranslation } from 'react-i18next';
import ProjectSkeletonGridOne from '../../../skeleton/ProjectSkeletonOne';


export default function ArticleAuthor() {
    const [selectedCat, setSelectedCat] = useState();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const {t} = useTranslation


    const dispatch = useDispatch()
    const categories = useSelector(state => state.articles.categories);
    const author = useSelector(state => state.articles.author);
    const loadingAuthor = useSelector(state => state.articles.loadingAuthor);

    if (!loadingAuthor) {
    }

    const params = useParams()
    const authorId = params.id

    useEffect(() => {
        dispatch(getAuthorArticles(authorId))
    }, [dispatch])

    useEffect(() => {
        dispatch(getCategories())
    }, [dispatch])

    return (
        <>
            <div className="Page-Wrapper" >
                <div className="container">
                    <div className="offers-list">
                        <div className="row" >
                            <div className="col-12 col-lg-9">
                                <div className="Filter-Row">
                                    <div className="Filter-Form mt-0 mb-5">
                                        <div className="row">
                                            <div className="col-sm-11 col-md-12 col-lg-12">
                                                <div className="display-flex">
                                                    <div className="input-row">
                                                        <input type="text" name="title" placeholder={t('form.menu.articles.title')} className="wizard-required" />bvnvbnvbn
                                                    </div>
                                                    <div className="input-row input-multi-filter input-small">
                                                        <AllMultiSelectCheckboxCategory {...{ setSelectedCat }} datas={categories} />
                                                    </div>
                                                    <div style={{ width: '125px' }} className="input-row">
                                                        <ReactDatePicker className="wizard-required" selected={startDate} onChange={(date) => setStartDate(date)} />
                                                    </div>
                                                    <div style={{ width: '125px' }} className="input-row">
                                                        <ReactDatePicker className="wizard-required" selected={endDate} onChange={(date) => setEndDate(date)} />
                                                    </div>
                                                    <div className="input-row ml-auto w-auto">
                                                        <button type="submit" name="submit" className="article-filter-btn">
                                                            <i className="uil uil-search"></i> {t('search')}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    {
                                        loadingAuthor === undefined || loadingAuthor ?
                                            <h1><ProjectSkeletonGridOne/></h1>
                                            :
                                            author.articles.map((article, index) =>
                                                <ArticleListView article={article} key={index + 1} />
                                            )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

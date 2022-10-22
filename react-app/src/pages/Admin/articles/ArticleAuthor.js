import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAuthorArticles, getCategories, getCategoryArticles } from '../../../store/actions/Articles/ArticlesActions';
import 'react-quill/dist/quill.snow.css';
import ReactDatePicker from 'react-datepicker';
import sectors from '../../../data/sectors';
import AllMultiSelectCheckboxCategory from '../../../utils/Filters/AllMultiselectCheckboxCategory';
import ArticleListView from '../../../views/Articles/ArticleListView';
import ArticleSidebarView from '../../../views/Articles/ArticleSidebarView';
import { Text } from '../../../containers/Language';
import { useParams } from 'react-router'


export default function ArticleAuthor() {
    const [selectedCat, setSelectedCat] = useState();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());


    const dispatch = useDispatch()
    const categories = useSelector(state => state.articles.categories);
    const author = useSelector(state => state.articles.author);
    const loading = useSelector(state => state.articles.loading);
    const loadingAuthor = useSelector(state => state.articles.loadingAuthor);
    console.log(loadingAuthor)

    if (!loadingAuthor) {
        console.log(author)
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
                                                        <input type="text" name="title" placeholder="title" className="wizard-required" />
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
                                                            <i className="uil uil-search"></i> Search
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
                                            <h1>Loading</h1>
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

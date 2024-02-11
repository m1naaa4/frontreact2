import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getArticles, getCategories } from '../../../store/actions/Articles/ArticlesActions';
import 'react-quill/dist/quill.snow.css';
import ArticleListView from '../../../views/Articles/ArticleListView';
import ArticleSidebarView from '../../../views/Articles/ArticleSidebarView';
import FilterArticle from '../../../views/User/Fields/Filter/FilterArticle';
import { useTranslation } from 'react-i18next';
import ListArticlesSkeleton from '../../../skeleton/profile/ListArticlesSkeleton';
import ListArticlesSideSkeleton from '../../../skeleton/profile/ListArticlesSideSkeleton';


export default function ArticlesList() {

    const dispatch = useDispatch();
    const articles = useSelector(state => state.articles.articles);
    const populares = useSelector(state => state.articles.populareArticles);
    const suggrestions = useSelector(state => state.articles.suggrestionArticles);
    const loading = useSelector(state => state.articles.loading);
    const [t] = useTranslation();

    const [filterInput, setFilterInput ]  = useState({
        'filters' : true,
        'categories' : '',
        'search' : '',
        'created': {'startDate': '', 'endDate': ''}
    });

    const data = { filterInput, setFilterInput };

    useEffect(() => {
        dispatch(getArticles(data));
        dispatch(getCategories());
    }, [dispatch]);

    return (
        <>
            <div className="Page-Wrapper" >
                <div className="container">
                    <div className="offers-list">
                        <div className="row" >
                            <div className="col-12 col-lg-9">
                                <FilterArticle
                                    {...data}
                                />
                                <div className="row">
                                    {
                                        loading ?
                                            <h1><ListArticlesSkeleton/></h1>
                                            :
                                            (articles.length > 0 ? 
                                                articles.map((article, index) =>
                                                <ArticleListView article={article} key={index + 1} />
                                                )
                                            : 
                                            <div className="col-md-12">
                                                <div className="offer-box">
                                                    <div className="offer-box">
                                                        no result found
                                                    </div>
                                                </div>
                                            </div>
                                            )    
                                    }
                                </div>
                            </div>
                            <div className='col-12 col-lg-3 articles-list-sidebar'>
                                {
                                    loading ?
                                        <h1><ListArticlesSideSkeleton/></h1>
                                        :
                                        suggrestions && suggrestions.map((article, index) =>                                            
                                            <ArticleSidebarView article={article} key={index} />
                                        )
                                }
                                {
                                    loading ?
                                        <h1><ListArticlesSideSkeleton/></h1>
                                        :
                                        populares.map((article, index) =>
                                            <ArticleSidebarView article={article} key={index} />
                                        )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

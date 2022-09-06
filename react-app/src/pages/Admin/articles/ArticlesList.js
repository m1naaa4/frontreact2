import React, { useState } from 'react'
import 'react-quill/dist/quill.snow.css';
import ReactDatePicker from 'react-datepicker';
import sectors from '../../../data/sectors';
import AllMultiSelectCheckboxSector from '../../../utils/Filters/AllMultiselectCheckboxSector';
import ArticleListView from '../../../views/Articles/ArticleListView';
import ArticleSidebarView from '../../../views/Articles/ArticleSidebarView';


export default function ArticlesList() {
    const [selectedsector, setSelectedsector] = useState();
    const [date, setDate] = useState(new Date());
    const article = {
        id: 1,
        title: "Article title",
        thumbnail: "https://cdn.arbtop.net/img-600-0/czo2MzoiaHR0cHM6Ly93d3cuZWxmYWdyLm9yZy91cGxvYWQvcGhvdG8vbmV3cy80MjgvOS8yMDB4MTUwby8zMjAuanBnIjs=.jpeg",
        categories: ["Cat 1", "Cat 2"],
        description: "test desc text ..."
    }

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
                                                        <AllMultiSelectCheckboxSector {...{ setSelectedsector }} datas={sectors} />
                                                    </div>
                                                    <div style={{ width: '125px' }} className="input-row">
                                                        <ReactDatePicker className="wizard-required" selected={date} onChange={(date) => setDate(date)} />
                                                    </div>
                                                    <div style={{ width: '125px' }} className="input-row">
                                                        <ReactDatePicker className="wizard-required" selected={date} onChange={(date) => setDate(date)} />
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
                                        Array(5).fill().map((e, index) =>
                                            <ArticleListView article={ article } key={index + 1} />
                                        )
                                    }
                                </div>
                            </div>
                            <div className='col-12 col-lg-3 articles-list-sidebar'>
                                <h4>Top article</h4>
                                <ArticleSidebarView article={ article } />
                                <h4>Recent articles</h4>
                                <ArticleSidebarView article={ article } />
                                <ArticleSidebarView article={ article } />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

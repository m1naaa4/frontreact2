import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export default function ArticlesList() {

    return (
        <>
            <div className="Page-Wrapper" >
                <div className="container">
                    {/* <div>
                        <div className="Filter-Row">
                            <FilterProject
                                {...data}
                            />
                        </div>
                    </div> */}
                    <div className="offers-list">
                        <div className="row" >
                            <div className="col-12 col-lg-9">
                                <div className="row">
                                    {
                                        Array(5).fill().map((project, index) =>
                                            <div className="col-12" key={index + 1}>
                                                <div className="article-box">
                                                    <img className='article-thumb' src="https://cdn.arbtop.net/img-600-0/czo2MzoiaHR0cHM6Ly93d3cuZWxmYWdyLm9yZy91cGxvYWQvcGhvdG8vbmV3cy80MjgvOS8yMDB4MTUwby8zMjAuanBnIjs=.jpeg" alt='article logo' />
                                                    <div>
                                                        <span className='article-categories'>Categorie 1, Categorie 2</span>
                                                        <h3 className='article-title'>Article title abcdefgh ijklmnopq</h3>
                                                        <p className="article-desc">dazgd azgh azh zud huazhdouih zdoua zdouh uagzsu ...</p>
                                                    </div>
                                                </div>
                                                <hr />
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className='col-12 col-lg-3 articles-list-sidebar'>
                                <h4>Top article</h4>
                                <div>
                                    <h3 className='article-sidebar-title'>Article title abcdh ijklmnopq</h3>
                                    <img className='article-thumb' src="https://cdn.arbtop.net/img-600-0/czo2MzoiaHR0cHM6Ly93d3cuZWxmYWdyLm9yZy91cGxvYWQvcGhvdG8vbmV3cy80MjgvOS8yMDB4MTUwby8zMjAuanBnIjs=.jpeg" alt='article logo' />
                                    <hr/>
                                </div>
                                <h4>Recent articles</h4>
                                <div>
                                    <h3 className='article-sidebar-title'>Article title abcdh ijklmnopq</h3>
                                    <img className='article-thumb' src="https://cdn.arbtop.net/img-600-0/czo2MzoiaHR0cHM6Ly93d3cuZWxmYWdyLm9yZy91cGxvYWQvcGhvdG8vbmV3cy80MjgvOS8yMDB4MTUwby8zMjAuanBnIjs=.jpeg" alt='article logo' />
                                    <hr/>
                                </div>
                                <div>
                                    <h3 className='article-sidebar-title'>Article title abcdh ijklmnopq</h3>
                                    <img className='article-thumb' src="https://cdn.arbtop.net/img-600-0/czo2MzoiaHR0cHM6Ly93d3cuZWxmYWdyLm9yZy91cGxvYWQvcGhvdG8vbmV3cy80MjgvOS8yMDB4MTUwby8zMjAuanBnIjs=.jpeg" alt='article logo' />
                                    <hr/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

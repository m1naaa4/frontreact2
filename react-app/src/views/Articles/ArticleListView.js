import React from 'react'
import { Link } from 'react-router-dom';


export default function ArticleListView({ article }) {

    return <div className="col-12">
        <div className="article-box">
            <img className='article-thumb' src={article.thumbnail ? article.thumbnail : "https://cdn.arbtop.net/img-600-0/czo2MzoiaHR0cHM6Ly93d3cuZWxmYWdyLm9yZy91cGxvYWQvcGhvdG8vbmV3cy80MjgvOS8yMDB4MTUwby8zMjAuanBnIjs=.jpeg"} alt='article logo' />
            <div>
                <div className='d-flex align-items-center justify-content-between'>
                    <span className='article-categories'>{article.categories.map(c=>c.name).join(', ')}</span>
                    <button className="reaction-button" id="shareButton" type="button">
                        <img src="/assets/images/icons/dadupa-sharewhite.svg" style={{ width: "13px", height: "13px" }} alt="" id="image_share" />
                    </button>
                </div>
                <h3 className='article-title'>{article.title}</h3>
                <p className="article-desc">{article.body.substring(0, 130).replace(/<[^>]+>/g, ' ')} ...</p>
                <div className='d-flex align-items-center justify-content-between'>
                    <div className='d-flex align-items-center mt-2' style={{ width: 'fit-content' }}>
                        <Link className="article-list-author" to={`/profile/${article.creator.id}`}>
                            <img src={article.creator.avatar} alt={article.creator.name} />
                            <h4>{article.creator.name}</h4>
                        </Link>
                        <span className='article-date'>, {article.created_at.for_humans}</span>
                    </div>
                    <div style={{ fontSize: "13px" }}>
                        10 <i className="dadupa-icon icon-clap"></i>
                        0 <i className="uil uil-comment-dots"></i>
                    </div>
                </div>
            </div>
        </div>
        <hr />
    </div>
}
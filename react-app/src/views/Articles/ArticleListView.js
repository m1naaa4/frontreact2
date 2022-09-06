import React from 'react'
import { Link } from 'react-router-dom';


export default function ArticleListView({ article }) {

    return <div className="col-12">
        <div className="article-box">
            <img className='article-thumb' src={article.thumbnail} alt='article logo' />
            <div>
                <div className='d-flex align-items-center justify-content-between'>
                    <span className='article-categories'>{article.categories.join(', ')}</span>
                    <button className="reaction-button" id="shareButton" type="button">
                        <img src="/assets/images/icons/dadupa-sharewhite.svg" style={{ width: "13px", height: "13px" }} alt="" id="image_share" />
                    </button>
                </div>
                <h3 className='article-title'>{article.title}</h3>
                <p className="article-desc">{article.description.substring(0, 130)} ...</p>
                <div className='d-flex align-items-center justify-content-between'>
                    <div className='d-flex align-items-center mt-2' style={{ width: 'fit-content' }}>
                        <Link class="article-list-author" to={`/profile/${article.author.profile_id}`}>
                            <img src={article.author.avatar} alt={article.author.fullName} />
                            <h4>{article.author.fullName}</h4>
                        </Link>
                        <span className='article-date'>, {article.date}</span>
                    </div>
                    <div style={{ fontSize: "13px" }}>
                        {article.likesCounter} <i className="dadupa-icon icon-clap"></i>
                        {article.commentsCounter} <i className="uil uil-comment-dots"></i>
                    </div>
                </div>
            </div>
        </div>
        <hr />
    </div>
}
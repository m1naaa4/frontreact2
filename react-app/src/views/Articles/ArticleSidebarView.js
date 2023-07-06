import React from 'react'
import { Link } from 'react-router-dom';


export default function ArticleSidebarView({ article }) {

    return <div>
        <Link to={`articles/${article.id}`}>
            <h3 className='article-sidebar-title'>{article.title}</h3>
        </Link>
        <p className='article-date'>{article.created_at.date}</p>

        <img className='article-thumb-sidebar' src={article.thumbnail ? article.thumbnail : "/assets/images/logoArticle.jpeg"} alt='article logo' />

        <div className='d-flex align-items-center justify-content-between mt-2'>
            <div className="article-list-author">
                <img src={article.author.avatar ?? '/assets/images/avatar.png'} alt={article.author.name} />
                <h4>{article.author.name}</h4>
            </div>
            <div className='text-center' style={{ fontSize: "13px" }}>
                {article.likeCount} <i className="dadupa-icon icon-clap"></i>
                {article.commentCount} <i className="uil uil-comment-dots"></i>
            </div>
        </div>

        <hr />
    </div>
}
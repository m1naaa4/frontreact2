import React from 'react'
import { Link } from 'react-router-dom';


export default function ArticleSidebarView({ article }) {

    return <div>
        <h3 className='article-sidebar-title'>{article.title}</h3>
        <p className='article-date'>{article.date}</p>

        <img className='article-thumb-sidebar' src={article.thumbnail} alt='article logo' />


        <div className='d-flex align-items-center justify-content-between mt-2'>
            <Link class="article-list-author" to={`/profile/${article.author.profile_id}`}>
                <img src={article.author.avatar} alt={article.author.fullName} />
                <h4>{article.author.fullName}</h4>
            </Link>
            <div className='text-center' style={{ fontSize: "13px" }}>
                {article.likesCounter} <i className="dadupa-icon icon-clap"></i>
                {article.commentsCounter} <i className="uil uil-comment-dots"></i>
            </div>
        </div>

        <hr />
    </div>
}
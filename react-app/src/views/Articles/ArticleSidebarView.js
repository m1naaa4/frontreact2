import React from 'react'


export default function ArticleSidebarView({ article }) {

    return <div>
        <h3 className='article-sidebar-title'>{article.title}</h3>
        <img className='article-thumb' src={article.thumbnail} alt='article logo' />
        <hr />
    </div>
}
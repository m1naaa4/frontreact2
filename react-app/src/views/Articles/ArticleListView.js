import React from 'react'


export default function ArticleListView({article}) {

    return <div className="col-12">
        <div className="article-box">
            <img className='article-thumb' src={article.thumbnail} alt='article logo' />
            <div>
                <span className='article-categories'>{article.categories.join(', ')}</span>
                <h3 className='article-title'>{article.title}</h3>
                <p className="article-desc">{article.description}</p>
            </div>
        </div>
        <hr />
    </div>
}
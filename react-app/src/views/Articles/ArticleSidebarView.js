import React from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';


export default function ArticleSidebarView({ article }) {

    const {t} = useTranslation();
    return <div className='article-sidebar-item'>
            <div className='article-thumb-sidebar'>
                <img src={article.media ? article.media[0] : "/assets/images/logoArticle.jpeg"} alt='article logo' />
            </div>
        
        <div className='article-content-sidebar'>
            <div>
                <div className='article-meta-sidebar'>
                    <div className='article-thumb-sidebar'>
                        <p className='article-date'>{article.created_at.date}</p>
                    </div>
                    <div className='article-reactions-sidebar'>
                        <ul>
                            <li><span>{article.likeCount}</span> <i className="dadupa-icon icon-clap"></i></li>
                            <li><span>{article.commentCount}</span> <i className="uil uil-comment-dots"></i></li>
                        </ul>
                        
                    </div>
                </div>
                
                <Link to={`articles/${article.id}`}>
                    <h3 className='article-sidebar-title'>{article.title}</h3>
                </Link>
                <div className="article-list-author">
                    <img src={article.author.avatar ?? '/assets/images/avatar.png'} alt={article.author.name} />
                    <h4>{article.author.name}</h4>
                </div>
                
            </div>
        </div>
        {/* <h4>{t('suggestedArticles')}</h4> */}
       


        {/* <div className='d-flex align-items-center justify-content-between mt-2'>
            
            
        </div>

        <hr /> */}
    </div>
}
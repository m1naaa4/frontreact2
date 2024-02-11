import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import SharePopUp from '../../utils/SharePopUp';


export default function ArticleListView({ article }) {
    const [shareUrl, setShareUrl] = useState(false);
    let url_to_share = [article.title, `${process.env.REACT_APP_FRONT_URL}` + '/articles/' + article.id];


    return <div className="col-12">
        <div className="article-box">
            <Link to={`articles/${article.id}`}>
                <img className='article-thumb' src={article.media ? article.media[0] : "/assets/images/logoArticle.jpeg"} alt='article logo' />
            </Link>
            <div className="w-100">
                <div className='d-flex align-items-center justify-content-between'>
                    <span className='article-categories'>{article.categories != undefined && article.categories.map(c => c.name).join(', ')}</span>
                    <button className="reaction-button" id="shareButton" type="button" onClick={()=>{setShareUrl(true)}}>
                        <img src="/assets/images/icons/dadupa-sharewhite.svg" style={{ width: "13px", height: "13px" }} alt="" id="image_share" />
                    </button>
                </div>
                <Link to={`articles/${article.id}`}>
                    <h3 className='article-title'>{article.title}</h3>
                </Link>
                <p className="article-desc">{article.body != undefined && article.body.substring(0, 130).replace(/<[^>]+>/g, ' ')} ...</p>
                <div className='d-flex align-items-center justify-content-between'>
                    <div className='d-flex align-items-center mt-2' style={{ width: 'fit-content' }}>
                        {
                            article.creator && <Link className="article-list-author" to={`/articles/author/${article.creator.id}`}>
                                <img src={article.creator.avatar} alt={article.creator.name} />
                                <h4>{article.creator.name}</h4>
                            </Link>
                        }
                        <span className='article-date'> {article.created_at.for_humans}</span>
                    </div>
                    <div style={{ fontSize: "13px" }}>
                        {article.visits} <i className="uil uil-eye"></i>
                        {article.likeCount} <i className="dadupa-icon icon-clap"></i>
                        {article.commentCount} <i className="uil uil-comment-dots"></i>
                    </div>
                </div>
            </div>
        </div>
        <hr />
        <SharePopUp url={url_to_share} open={shareUrl} handleOpen={setShareUrl}></SharePopUp>
    </div>
}
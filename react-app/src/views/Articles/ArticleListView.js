import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import SharePopUp from '../../utils/SharePopUp';


export default function ArticleListView({ article }) {
    const [shareUrl, setShareUrl] = useState(false);
    let url_to_share = [article.title, `${process.env.REACT_APP_FRONT_URL}` + '/articles/' + article.id];


    return <div className="article-box">
            <div className='article-thumbnail'>
                <Link to={`articles/${article.id}`}>
                    <img className='article-thumb' src={article.media ? article.media[0] : "/assets/images/logoArticle.jpeg"} alt='article logo' />
                </Link>
            </div>
            
            <div className="article-meta">
                <div className='article-meta-content'>
                    <div className='d-flex align-items-center justify-content-between'>
                        <span className='article-categories'>{article.categories != undefined && article.categories.map(c => c.name).join(', ')}</span>
                        <button className="reaction-button" id="shareButton" type="button" onClick={()=>{setShareUrl(true)}}>
                            {/* <img src="/assets/images/icons/dadupa-sharewhite.svg" style={{ width: "13px", height: "13px" }} alt="" id="image_share" /> */}
                            <i class="uil uil-share-alt"></i>
                        </button>
                    </div>
                    <Link to={`articles/${article.id}`}>
                        <h3 className='article-title'>{article.title}</h3>
                    </Link>
                    <p className="article-desc">{article.body != undefined && article.body.substring(0, 130).replace(/<[^>]+>/g, ' ')} ...</p>
                    <div className='article-footer d-flex align-items-center justify-content-between'>
                        <div className='d-flex align-items-center' style={{ width: 'fit-content' }}>
                            {
                                article.creator && <Link className="article-list-author" to={`/articles/author/${article.creator.id}`}>
                                    <img src={article.creator.avatar} alt={article.creator.name} />
                                    <h4>{article.creator.name}</h4>
                                </Link>
                            }
                            <span className='article-date'> {article.created_at.for_humans}</span>
                        </div>
                        <ul style={{ fontSize: "13px" }}>
                            {article.visits !== '' &&
                                <li><span>{article.visits}</span> <i className="uil uil-eye"></i></li>
                            }
                            <li><span>{article.likeCount}</span> <i className="dadupa-icon icon-clap"></i></li>
                            <li><span>{article.commentCount}</span> <i className="uil uil-comment-dots"></i></li>
                        </ul>
                    </div>
                </div>
            </div>
        {/* </div> */}
        <SharePopUp url={url_to_share} open={shareUrl} handleOpen={setShareUrl}></SharePopUp>
    </div>
}
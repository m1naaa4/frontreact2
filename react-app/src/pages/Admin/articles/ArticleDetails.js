import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddComment from '../../../views/Comment/AddComment';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import ArticleSidebarView from '../../../views/Articles/ArticleSidebarView';
import { useParams } from 'react-router'
import { getArticle } from "../../../store/actions/Articles/ArticlesActions";
import SharePopUp from '../../../utils/SharePopUp';
import { LikeAction } from '../../../store/actions/Like/LikeAction';
import { useTranslation } from 'react-i18next';
import ProjectSkeletonGrid from '../../../skeleton/ProjectSkeletonGrid';
import ListArticlesSideSkeleton from '../../../skeleton/profile/ListArticlesSideSkeleton';


export default function ArticleDetails(props) {

    const dispatch = useDispatch();
    const params = useParams();
    const article = useSelector(state => state.article.article);
    const loading = useSelector(state => state.article.loading);
    const articleId = params.id;
    const [like, setLike] = useState(false);
    const [likeCount, setLikeCount] = useState();
    const [countcomment, setCountcomment] = useState();
    const [t] = useTranslation();

    const populares = useSelector(state => state.articles.populareArticles);
    const suggrestions = useSelector(state => state.articles.suggrestionArticles);

    const [shareUrl, setShareUrl] = useState(false);
    let url_to_share = [article.title, `${process.env.REACT_APP_FRONT_URL}` + '/articles/' + article.id];

    useEffect(() => {
        if (articleId) {
            dispatch(getArticle(articleId));
        }
    }, [dispatch]);

    useEffect(() => {
        if (article != 'loading' && article) {
            setLikeCount(article.likeCount);
            setLike(article.is_liked);
            setCountcomment(article.commentCount);
        }
    }, [article]);

    const [currentImg, setCurrentImg] = useState(0)
    const handleSlider = () => {
        if (currentImg < article.media.length - 1) {
            setCurrentImg(currentImg + 1)
        } else {
            setCurrentImg(0)
        }
    }

    const likeAction = () => {
        setLike(!like);
        const dataa = {
            provider_id: params.id,
            provider: "article",
            type: like ? 'dislike' : 'like',
        }

        dispatch(LikeAction(dataa, '/like'));
    }

    useEffect(() => {
        window.pusher.pusher.subscribe(`new-like`).bind('like', function (data) {
            if (articleId == data.provider_id) {
                if (data.value == 1) {
                    setLikeCount((prevCount) => prevCount + 1);
                } else if (data.value == 0) {
                    setLikeCount((prevCount) => prevCount > 0 ? prevCount -1 : 0);
                    
                }
            }
        });
    }, [articleId]);

    useEffect(() => {
        window.pusher.pusher.subscribe(`article-comment`).bind('new-comment', function (data) {
            if (articleId == data.commentable_id) {
                setCountcomment((prevCount) => prevCount + 1);
            }
        });
    }, [articleId]);

    return (
        <div className="Single-Wrapper">
            <div className="container">
                <div className="Single-Content">
                    <div className="row">
                        {
                            loading != undefined && !loading ? (
                                <div className="col-md-8">
                                    <div className="single-header">
                                        <div className="mt-0">
                                            <h3 className="single-offer-name pt-0 text-capitalize" style={{ color: "#00b601" }}>{article.title}</h3>
                                            <div className='d-flex justify-content-between align-items-center mt-3'>
                                                <div className="Contact mb-0">
                                                    <div className="d-flex align-items-start">
                                                        <div className="Contact-Thumb"> <Link to={`/profile/1`}><img src={article.author.avatar} alt={article.author.name} /></Link></div>
                                                        <div className="Contact-Infos">
                                                            <Link to={`/profile/${article.author.id}`}><h4>{article.author.name}</h4></Link>
                                                        </div>
                                                    </div>
                                                </div>
                                                <span>{article.created_at.for_humans}</span>
                                            </div>
                                            <p className='mt-3 mb-0'>{article.categories.map(c => '#' + c.name).join(', ')}</p>
                                        </div>
                                    </div>

                                    <div className="Content-Wrap">
                                        <div className="Signle-Offer-Media">
                                            <img
                                                width="100%"
                                                src={
                                                    article.media ?
                                                        article.media[currentImg]
                                                        : "https://cdn.arbtop.net/img-600-0/czo2MzoiaHR0cHM6Ly93d3cuZWxmYWdyLm9yZy91cGxvYWQvcGhvdG8vbmV3cy80MjgvOS8yMDB4MTUwby8zMjAuanBnIjs=.jpeg"}
                                                alt="Project"
                                                onClick={handleSlider}
                                            />
                                        </div>
                                        <div className="Signle-Offer-Content">
                                            <div className="Signle-Offer-Text">
                                                {parse(
                                                    article.body
                                                )}
                                            </div>
                                            <div className="reactions-wrap">
                                                <div className="reactions-box">
                                                    <div className="row">
                                                        <div className="col-6 col-md-4 col-lg-6">
                                                            <div className="reaction likes"><i className="dadupa-icon icon-clap"></i><span>{likeCount}</span></div>
                                                            <div className="reaction views"><i className="uil uil-eye"></i>
                                                                <span>{article.visitCount}</span></div>
                                                        </div>
                                                        <div className="col-6 col-md-8 col-lg-6 text-right">
                                                            <div className="reaction comments"><span>{countcomment} {t('commentplural')}</span></div>
                                                            <div className="reaction shares"><span>{article.shared} {t(`shareplural`)}</span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="reactions-buttons">
                                            <button className={like ? 'reaction-button reaction-like post-liked' : 'reaction-button reaction-like'}
                                                onClick={likeAction} toggle="#password-field" type="button" name="button">
                                                <img src={like ? "/assets/images/icons/dadupa-clap-green.svg" : "/assets/images/icons/dadupa-clap.svg"} alt="" />
                                                {like ? t('unclap') : t('clap')}
                                            </button>

                                                <a className="reaction-button reaction-comment" href="#Comments-Wrap">
                                                    <img src="/assets/images/icons/dadupa-comment.svg" alt="" /> {t(`comment`)}
                                                </a>
                                                <button className="reaction-button" type="button" name="button" onClick={() => { setShareUrl(true) }}>
                                                    <img src="/assets/images/icons/dadupa-share.svg" alt="" /> {t(`partagez`)}
                                                </button>
                                            </div>
                                        </div>
                                        <SharePopUp url={url_to_share} open={shareUrl} handleOpen={setShareUrl}></SharePopUp>
                                    </div>

                                    <AddComment providerObject={article.id} providerType='article' />
                                </div>
                            ) : <h1><ProjectSkeletonGrid/></h1>
                        }

                        <div className="col-md-4 articles-list-sidebar pl-5 pr-0">
                        <h3 className='articles-list-title'>{t('suggestedArticles')}</h3>

                            {
                                loading ?
                                    <h1><ListArticlesSideSkeleton/></h1>
                                    :
                                    suggrestions && suggrestions.map((article, index) =>
                                        <ArticleSidebarView article={article} key={index} />
                                    )
                            }
                            
                            {
                                loading ?
                                    <h1><ListArticlesSideSkeleton/></h1>
                                    :
                                    populares.map((article, index) =>
                                        <ArticleSidebarView article={article} key={index} />
                                    )
                            }
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}
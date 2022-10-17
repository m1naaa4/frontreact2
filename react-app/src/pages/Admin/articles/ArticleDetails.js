import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddComment from '../../../views/Comment/AddComment';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { Text } from '../../../containers/Language';
import ArticleSidebarView from '../../../views/Articles/ArticleSidebarView';
import { useParams } from 'react-router'
import { getArticle } from "../../../store/actions/Articles/ArticlesActions";
import SharePopUp from '../../../utils/SharePopUp'

export default function ArticleDetails(props) {
    const articleExample = {
        id: 1,
        title: "Article title test text abcd",
        thumbnail: "https://cdn.arbtop.net/img-600-0/czo2MzoiaHR0cHM6Ly93d3cuZWxmYWdyLm9yZy91cGxvYWQvcGhvdG8vbmV3cy80MjgvOS8yMDB4MTUwby8zMjAuanBnIjs=.jpeg",
        categories: ["Cat 1", "Cat 2"],
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc consectetur blandit magna aliquet egestas. Aliquam quis nisl nec nibh ullamcorper volutpat eu in elit. Proin odio ipsum, suscipit sed laoreet sodales, consequat sit amet tortor. Maecenas metus diam, faucibus vitae libero efficitur, dapibus ultrices felis. Duis sit amet consequat ex, quis mollis leo. Pellentesque est est, molestie at massa a, maximus dignissim nisl. Maecenas non lacus lacinia lorem interdum tempor vitae non ante. Donec vitae ultricies quam, id aliquam erat. Donec vel dolor est. Aliquam vel fringilla odio. Maecenas auctor magna sit amet arcu vestibulum, sit amet eleifend massa fringilla. Proin vitae elit convallis, elementum massa quis, bibendum elit. Praesent id dignissim velit, ut bibendum lorem. Ut eget vestibulum eros.",
        date: "06/09/2022",
        author: {
            profile_id: 1,
            fullName: "Full Name",
            avatar: "https://disquestockage.fra1.digitaloceanspaces.com/album/disquestockage/1630bd14e169e6.png",
        },
        likesCounter: 10,
        commentsCounter: 3,
    }


    const dispatch = useDispatch()
    const params = useParams()
    const article = useSelector(state => state.article.article);
    const loading = useSelector(state => state.article.loading);
    const articleId = params.id

    const [shareUrl, setShareUrl] = useState(false);
    let url_to_share = [article.title, `${process.env.REACT_APP_FRONT_URL}` + '/articles/' + article.id];

    console.log(articleId)
    console.log(article)
    console.log(loading)

    useEffect(() => {
        if (articleId) {
            dispatch(getArticle(articleId));
        }
    }, [dispatch]);
    return (
        <div className="Single-Wrapper">
            <div className="container">
                <div className="Single-Content">
                    <div className="row">
                        {
                            loading != undefined && !loading ? (
                                <div className="col-md-9">
                                    <div className="single-header">
                                        <div className="mt-0">
                                            <h3 className="single-offer-name pt-0 text-capitalize" style={{ color: "#00b601" }}>{article.title}</h3>
                                            <div className='d-flex justify-content-between align-items-center mt-3'>
                                                <div className="Contact mb-0">
                                                    <div class="d-flex align-items-start">
                                                        <span className="Profile-Icon"><i className="uil uil-lightbulb-alt"></i></span>
                                                        <div className="Contact-Thumb"> <Link to={`/profile/1`}><img src={article.creator.avatar} alt={article.creator.name} /></Link></div>
                                                        <div className="Contact-Infos">
                                                            <Link to={`/profile/${article.creator.id}`}><h4>{article.creator.name}</h4></Link>
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
                                            <img width="100%" src={article.thumbnail ? article.thumbnail : "https://cdn.arbtop.net/img-600-0/czo2MzoiaHR0cHM6Ly93d3cuZWxmYWdyLm9yZy91cGxvYWQvcGhvdG8vbmV3cy80MjgvOS8yMDB4MTUwby8zMjAuanBnIjs=.jpeg"} alt="Project" />
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
                                                            <div className="reaction likes"><i className="dadupa-icon icon-clap"></i><span>99</span></div>
                                                            <div className="reaction views"><i className="uil uil-eye"></i>
                                                                <span>99</span></div>
                                                        </div>
                                                        <div className="col-6 col-md-8 col-lg-6 text-right">
                                                            <div className="reaction comments"><span>99 Comments</span></div>
                                                            <div className="reaction shares"><span>Shares</span></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="reactions-buttons">
                                                <button className='reaction-button reaction-like' toggle="#password-field" type="button" name="button">
                                                    <img src="/assets/images/icons/dadupa-clap.svg" alt="" /> Like
                                                </button>

                                                <a className="reaction-button reaction-comment" href="#Comments-Wrap">
                                                    <img src="/assets/images/icons/dadupa-comment.svg" alt="" /> Commenter
                                                </a>
                                                <button className="reaction-button" type="button" name="button" onClick={() => { setShareUrl(true) }}>
                                                    <img src="/assets/images/icons/dadupa-share.svg" alt="" /> Partager
                                                </button>
                                            </div>
                                        </div>
                                        <SharePopUp url={url_to_share} open={shareUrl} handleOpen={setShareUrl}></SharePopUp>
                                    </div>

                                    <AddComment providerObject={{}} providerType='project' />
                                </div>
                            ) : <h1>Loading ...</h1>
                        }

                        <div className="col-md-3 articles-list-sidebar pl-5 pr-0">
                            <h4><Text tid="articles_suggestedArticle" /></h4>
                            <ArticleSidebarView article={articleExample} />
                            <h4><Text tid="articles_topArticle" /></h4>
                            <ArticleSidebarView article={articleExample} />
                            <ArticleSidebarView article={articleExample} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
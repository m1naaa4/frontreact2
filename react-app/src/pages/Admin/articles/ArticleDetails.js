import React from 'react'
import AddComment from '../../../views/Comment/AddComment';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { Text } from '../../../containers/Language';


export default function ArticleDetails(props) {
    return (
        <div className="Single-Wrapper">
            <div className="container">
                <div className="Single-Content">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="single-header">
                                <div className="mt-0">
                                    <h3 className="single-offer-name pt-0" style={{ color: "#00b601" }}>Project title</h3>
                                    <div className='d-flex justify-content-between align-items-center mt-3'>
                                        <div className="Contact mb-0">
                                            <div class="d-flex align-items-start">
                                                <span className="Profile-Icon"><i className="uil uil-lightbulb-alt"></i></span>
                                                <div className="Contact-Thumb"> <Link to={`/profile/1`}><img src="https://disquestockage.fra1.digitaloceanspaces.com/album/disquestockage/1630bd14e169e6.png" alt="value.username" /></Link></div>
                                                <div className="Contact-Infos">
                                                    <Link to={`/profile/1`}><h4>Full Name</h4></Link>
                                                </div>
                                            </div>
                                        </div>
                                        <span>01/09/2022</span>
                                    </div>
                                    <p className='mt-3 mb-0'>#Tech, #IT</p>
                                </div>
                            </div>

                            <div className="Content-Wrap">
                                <div className="Signle-Offer-Media">
                                    <img width="100%" src="https://cdn.arbtop.net/img-600-0/czo2MzoiaHR0cHM6Ly93d3cuZWxmYWdyLm9yZy91cGxvYWQvcGhvdG8vbmV3cy80MjgvOS8yMDB4MTUwby8zMjAuanBnIjs=.jpeg" alt="Project" />
                                </div>

                                <div className="Signle-Offer-Content">
                                    <div className="Signle-Offer-Text">
                                        {parse(
                                            "<h4>Section 1 title</h4> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc consectetur blandit magna aliquet egestas. Aliquam quis nisl nec nibh ullamcorper volutpat eu in elit. Proin odio ipsum, suscipit sed laoreet sodales, consequat sit amet tortor. Maecenas metus diam, faucibus vitae libero efficitur, dapibus ultrices felis. Duis sit amet consequat ex, quis mollis leo. Pellentesque est est, molestie at massa a, maximus dignissim nisl. Maecenas non lacus lacinia lorem interdum tempor vitae non ante. Donec vitae ultricies quam, id aliquam erat. Donec vel dolor est. Aliquam vel fringilla odio. Maecenas auctor magna sit amet arcu vestibulum, sit amet eleifend massa fringilla. Proin vitae elit convallis, elementum massa quis, bibendum elit. Praesent id dignissim velit, ut bibendum lorem. Ut eget vestibulum eros.</p>" +
                                            "<h4>Section 2 title</h4> <p>uazdh iazud aziudhaizduh aizudh aizudh azudh aiuz</p>"
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
                                        <button className="reaction-button" type="button" name="button">
                                            <img src="/assets/images/icons/dadupa-share.svg" alt="" /> Partager
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <AddComment providerObject={{}} providerType='project' />
                        </div>
                        <div className="col-md-4 articles-list-sidebar pl-5 pr-0">
                            <h4><Text tid="articles_suggestedArticle" /></h4>
                            <div>
                                <h3 className='article-sidebar-title'>Article title abcdh ijklmnopq</h3>
                                <img className='article-thumb' src="https://cdn.arbtop.net/img-600-0/czo2MzoiaHR0cHM6Ly93d3cuZWxmYWdyLm9yZy91cGxvYWQvcGhvdG8vbmV3cy80MjgvOS8yMDB4MTUwby8zMjAuanBnIjs=.jpeg" alt='article logo' />
                                <hr />
                            </div>
                            <h4><Text tid="articles_topArticle" /></h4>
                            <div>
                                <h3 className='article-sidebar-title'>Article title abcdh ijklmnopq</h3>
                                <img className='article-thumb' src="https://cdn.arbtop.net/img-600-0/czo2MzoiaHR0cHM6Ly93d3cuZWxmYWdyLm9yZy91cGxvYWQvcGhvdG8vbmV3cy80MjgvOS8yMDB4MTUwby8zMjAuanBnIjs=.jpeg" alt='article logo' />
                                <hr />
                            </div>
                            <div>
                                <h3 className='article-sidebar-title'>Article title abcdh ijklmnopq</h3>
                                <img className='article-thumb' src="https://cdn.arbtop.net/img-600-0/czo2MzoiaHR0cHM6Ly93d3cuZWxmYWdyLm9yZy91cGxvYWQvcGhvdG8vbmV3cy80MjgvOS8yMDB4MTUwby8zMjAuanBnIjs=.jpeg" alt='article logo' />
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
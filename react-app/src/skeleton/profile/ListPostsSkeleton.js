import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton';


export default function ListPostsSkeleton() {
    return (
        <>
            <div className="WritePost">
                <div className="WritePost-Area">
                    <a className="WritePost-UserThumb">
                        <Skeleton width={50} height={50} />
                    </a>
                    <textarea className="WritePost-TextArea js-elasticArea">
                    </textarea>
                </div>
                <div className="WritePost-Options">
                    <button className='d-flex' type="button" name="button">
                        <Skeleton width={24} height={24} /> &nbsp; <Skeleton width={60} height={24} /> &nbsp;
                        <Skeleton width={24} height={24} /> &nbsp; <Skeleton width={60} height={24} /> &nbsp;
                        <Skeleton width={24} height={24} /> &nbsp; <Skeleton width={60} height={24} />
                    </button>
                </div>
            </div>

            <div className="Posts-List">
                {
                    Array(15).fill().map((item, index) => (
                        <div className="PostWrap" key={index + 1}>
                            <div className="PostHeader">
                                <a className="PostUser-Thumb">
                                    <Skeleton width={50} height={50} />
                                </a>
                                <a className="PostUser-Details">
                                    <Skeleton width={100} height={10} />
                                    <div className="PostUser-Time"><Skeleton width={50} height={5} /></div>
                                </a>
                                <div className="PostOptions">
                                    <button type="button" className="PostOptions-BTN"><Skeleton width={24} height={24} /></button>
                                </div>
                            </div>

                            <div className="PostBody">
                                <div className="PostBody-Text">
                                    <p>
                                        <Skeleton width={500} height={10} />
                                        <Skeleton width={500} height={10} />
                                        <Skeleton width={300} height={10} />
                                    </p>
                                    <Skeleton variant="rect" height={300} width={500} />
                                </div>
                            </div>

                            <div className="PostFooter">
                                <div className="reactions-wrap">
                                    <div className="reactions-box">
                                        <div className="row">
                                            <div className="col-6 col-md-4 col-lg-6">
                                                <div className="reaction likes"><Skeleton width={100} height={24} /></div>
                                            </div>
                                            <div className="col-6 col-md-8 col-lg-6 text-right">
                                                <div className="reaction comments"><Skeleton width={120} height={24} /></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="reactions-buttons">
                                    <button className='reaction-button reaction-like post-liked d-flex' type="button" name="button">
                                        <Skeleton width={24} height={24} /> &nbsp;
                                        <Skeleton width={70} height={24} /> &nbsp;
                                        <Skeleton width={24} height={24} /> &nbsp;
                                        <Skeleton width={70} height={24} /> &nbsp;
                                        <Skeleton width={24} height={24} /> &nbsp;
                                        <Skeleton width={70} height={24} /> &nbsp;
                                    </button>
                                </div>
                                <div id="Comments-Wrap" className="Comments-Wrap">
                                    <div className="Comments-Box">
                                        <form className="Comment-Writing">
                                            <div className="Comment-Col-2">
                                                <a className="Comment-User-Thumb" >
                                                    <Skeleton width={40} height={40} />
                                                </a>
                                            </div>
                                            <div className="Comment-Col-10">
                                                <div className="Comment-Area">
                                                    <div className="Comment-Input">
                                                        <input type="text" name="body" placeholder="Write your comment" />
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}


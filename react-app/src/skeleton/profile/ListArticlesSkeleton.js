import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton';


export default function ListArticlesSkeleton() {
    return (
        <>
            {Array(15).fill().map((item, index) => (
                <div className="article-box" key={index}>
                    <Skeleton width={225} height={132} />
                    <div className="w-100">
                        <div className='d-flex align-items-center justify-content-between'>
                            <span className='article-categories'></span>
                            {/* <button className="reaction-button" id="shareButton" type="button" > */}
                                <Skeleton width={32} height={32} />
                            {/* </button> */}
                        </div>
                        <h3 className='article-title'><Skeleton height={22} width={579} /></h3>
                        <p className="article-desc"><Skeleton height={45} width={579} /></p>
                        <div className='d-flex align-items-center justify-content-between'>
                            <div className='d-flex align-items-center mt-2' style={{ width: 'fit-content' }}>
                                <span className='article-date'> <Skeleton height={27} width={579} /></span>
                            </div>
                            
                        </div>
                    </div>
                </div>

            ))}  
        </>
    )
}


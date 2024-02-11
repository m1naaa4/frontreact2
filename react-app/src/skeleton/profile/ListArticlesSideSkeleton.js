import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton';


export default function ListArticlesSideSkeleton() {
    return (
        <>
            {Array(2).fill().map((item, index) => (
                <div key={index}>
                    <a href='#'>
                        <Skeleton width={255} height={21} />
                    </a>
                    <Skeleton width={255} height={21} />
                    <Skeleton className='article-thumb-sidebar' width={150} height={88} />
        
                    <div className='d-flex align-items-center justify-content-between mt-2'>
                        <div className="article-list-author">
                            <Skeleton width={30} height={34} />
                            <Skeleton width={161} height={34} />
                        </div>
                        
                        <div className='text-center' style={{ fontSize: "13px" }}>
                        <Skeleton width={59} height={45} />
                        </div>
                    </div>
                    <hr />
                </div> 

            ))}  
        </>
    )
}


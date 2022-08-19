import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton';


export default function FavoritesSkeleton() {
    return (
        <div className="Favoris-List">
            <div className="button-group filter-button-group d-flex">
                <button className="button" data-filter="*"><Skeleton width={60} height={24} /></button>
                <button className="button" data-filter="*"><Skeleton width={60} height={24} /></button>
                <button className="button" data-filter="*"><Skeleton width={60} height={24} /></button>
            </div>
            <div className="row">
                {
                    Array(5).fill().map((favorite, index) => {
                        return (
                            <div className="col-4" key={index + 1}>
                                {/* <FavoriteGrid favorite={favorite} key={index} /> */}
                                <Skeleton style={{width: "100%", height:"300px"}} />
                            </div>
                        )

                    })
                }
                <div className="grid-sizer col-1"></div>
            </div>
        </div>
    )
}


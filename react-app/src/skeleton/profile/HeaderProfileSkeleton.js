import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton';


export default function HeaderProfileSkeleton() {
    return (
        <div className="Profile-Cover" id="photoCover">
            <div className="container">
                <div className="Profile-Wrap">
                    <div className="Profile-Infos">
                        <div className="Profile-Picture" id="imageProfile" style={{ backgroundImage: `url('/assets/images/avatar.png')` }} />

                        <div className="Profile-Name">
                            <span className="Profile-Icon"><Skeleton width={170} height={24} /></span>
                        </div>
                    </div>
                    <label style={{width: "170px", height:"50px"}} htmlFor="coverUpload" className="coverUpload"/>
                    <div className="Profile-Navigation">
                        <ul className="Profie-Menu">
                            <li><a className='active-profile-link d-flex'><Skeleton className="rounded-circle" width={24} height={24} /> <Skeleton width={60} height={24} /></a></li>
                            <li><a className='active-profile-link d-flex'><Skeleton className="rounded-circle" width={24} height={24} /> <Skeleton width={60} height={24} /></a></li>
                            <li><a className='active-profile-link d-flex'><Skeleton className="rounded-circle" width={24} height={24} /> <Skeleton width={60} height={24} /></a></li>
                            <li><a className='active-profile-link d-flex'><Skeleton className="rounded-circle" width={24} height={24} /> <Skeleton width={60} height={24} /></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

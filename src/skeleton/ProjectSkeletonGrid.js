import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton';





const ProjectSkeletonGrid  = () =>{

    return(
        <div className="Single-Content">
            <div className="row">
                    <div className="col-md-8">
                        <div className="single-header">
                            <div className="single-offer-header">
                                <h3 className="single-offer-name"><Skeleton height={20} width={200} /></h3>
                            </div>
                        </div>
                        <div className="Company-Infos">
                            <div className="Company-Left">
                                <div className="single-offer-logo">
                                    <Skeleton variant="rect" height={45} width={45} />
                                </div>
                                <div className="Company-Name"></div>
                                <div className="Company-Email"><Skeleton height={20} width={200} /></div>
                                <div className="Company-Addresse"><Skeleton height={20} width={200} /></div>
                            </div>
                            <div className="Company-Right">
                                <div className="Company-Phone"><Skeleton height={20} width={100} /></div>
                            </div>
                        </div>
                        <div className="Content-Wrap">
                            <div className="Signle-Offer-Media">
                                <Skeleton height={400}  /> 
                            </div>
            
                            <div className="Signle-Offer-Content">
                                <div className="reactions-wrap">
                                    <div className="reactions-box">
                                        
                                    </div>
                                </div>
                                <div className="reactions-buttons">
                                    
                                </div>
                                <div className="Signle-Offer-Text">
                                    <Skeleton height={20}  />
                                    <Skeleton height={20}  />
                                    <Skeleton height={20}  />
                                    <Skeleton height={20} />
                                    <Skeleton height={20} width={500} />
                                </div>
            
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="Single-Offer-Details">
                            <ul className="Offer-Details-List">
                                <li className="Offer-Item">
                                    <label> <Skeleton height={20} width={100}  /></label>
                                    <span> <Skeleton height={20} width={150} /></span>
                                </li>
                                <li className="Offer-Item">
                                    <label> <Skeleton height={20} width={100}   /></label>
                                    <span> <Skeleton height={20}  width={150} /></span>
                                </li>
                                <li className="Offer-Item">
                                    <label> <Skeleton height={20} width={100}   /></label>
                                    <span> <Skeleton height={20}  width={150} /></span>
                                </li>
                                <li className="Offer-Item">
                                    <label> <Skeleton height={20} width={100}   /></label>
                                    <span> <Skeleton height={20}  width={150} /></span>
                                </li>
                                <li className="Offer-Item">
                                    <label> <Skeleton height={20} width={100}   /></label>
                                    <span> <Skeleton height={20}  width={150} /></span>
                                </li>
                            </ul>
                        </div>
                    </div>
             </div>
        </div>   
    )
}
export default ProjectSkeletonGrid
import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton';


export default function SideLeftProfileSkeleton() {


  return (
    <div className="Left-Side">
      <div className="Widget-BOX">
        <div className="Profile-Info Profile-Infos-Items">
          <h3><a href="#!" ><Skeleton height={30} width={200} /></a></h3>
          <span><Skeleton height={25} width={100} /></span>
        </div>

        <div className="Profile-Info Profile-Bio">
        <button type="button" className="UpdateInfos-BTN"><Skeleton height={25} width={25} /></button>
          <span><Skeleton height={25} width={100} /></span>
          <span><Skeleton height={25} width={100} /></span>
        </div>

        <div className="Profile-Info">
          <h3><a href="#!" ><Skeleton height={30} width={200} /></a></h3>
          <span><Skeleton height={25} width={100} /></span>
        </div>

        <div className="Profile-Info">
          <h3><a href="#!" ><Skeleton height={30} width={200} /></a></h3>
          <span><Skeleton height={25} width={100} /></span>
          <span><Skeleton height={25} width={100} /></span>
        </div>
      </div>
    </div>

  )
}

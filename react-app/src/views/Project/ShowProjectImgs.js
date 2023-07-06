import React, { useEffect, useState } from "react";
import { useSelector} from "react-redux";

import {
  LightgalleryProvider,
  LightgalleryItem,
} from "react-lightgallery";
import NoContent from "../../utils/NoContent";


const PhotoItem = ({ image, thumb, group }) => (
  <div style={{ maxWidth: "250px", width: "200px", padding: "5px" }}>
    <LightgalleryItem group={group} src={image} thumb={thumb}>
      <img src={image} style={{ width: "100%" }} />
    </LightgalleryItem>
  </div>
);


export default function ShowProjectImgs() {

  const project = useSelector(state => state.getproject.getproject?.project);

  const [imgs, setImgs] =  useState([]);

  useEffect (() => {
    if (project) { 
      const links = project?.media_link.map((item) => { 
        if (/\.(jpeg|jpg|gif|png)$/i.test(item)) {
          return item;
        }
        return null;
      }).filter(item => item !== null);
      setImgs(links);
    }
  }, [project]);

  return (
    <div className="content">
      <LightgalleryProvider>
        <h3>Photos</h3>

        <div className="d-flex align-items-center flex-wrap">
          {imgs.length ? imgs.map((p, idx) => (
            <PhotoItem key={idx} image={p} group="imgs" />
          )): <NoContent/>
          }
        </div>
      </LightgalleryProvider>
    </div>
  );
}
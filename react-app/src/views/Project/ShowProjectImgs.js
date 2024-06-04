import React, { useEffect, useState } from "react";
import { useSelector} from "react-redux";

import {
  LightgalleryProvider,
  LightgalleryItem,
} from "react-lightgallery";
import NoContent from "../../utils/NoContent";
import { useTranslation } from "react-i18next";


const PhotoItem = ({ image, thumb, group }) => (
  <div className="image-item">
    <LightgalleryItem group={group} src={image} thumb={thumb}>
      <img src={image} style={{ width: "100%" }} />
    </LightgalleryItem>
  </div>
);


export default function ShowProjectImgs() {

  const project = useSelector(state => state.getproject.getproject?.project);
  const {t} = useTranslation();

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
        <h3 className="tab-title">{t('pictures')}</h3>
          <div className='images-wrap'>
            <div className='row'>

              {imgs.length ? imgs.map((p, idx) => (
                <div className="col-md-3">
                  <PhotoItem key={idx} image={p} group="imgs" />
                </div>
              )): 
              <NoContent/>
              }
            </div>
        </div>
      </LightgalleryProvider>
    </div>
  );
}
import React, { useEffect, useRef, useState } from "react";
import LightGallery from 'lightgallery/react';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-video.css';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import { useSelector } from "react-redux";

const GalleryComponent = ({ thumbnail, settings , videoUrl}) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const onSlideItemLoad = (event) => {
    const slideItem = event.detail.el;
    slideItem.setAttribute('data-src', videoUrl);
  };

  return (
    <LightGallery key={videoUrl}
            elementClassNames="custom-wrapper-className"
            >
              <a key={1} data-lg-size="1280-720" data-pinterest-text="Pin it3" 
                data-tweet-text="lightGallery slide  4" 
                data-src="https://youtu.be/IUN664s7N-c" 
                data-poster="https://img.youtube.com/vi/IUN664s7N-c/maxresdefault.jpg" 
              >
                <img className="img-responsive" src="https://img.youtube.com/vi/IUN664s7N-c/maxresdefault.jpg" />
              </a>

            </LightGallery>
  );
};

export default GalleryComponent;

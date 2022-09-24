import React from "react";
import LightGallery from 'lightgallery/react';
// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-video.css';

// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import PT from "prop-types";
import {
  LightgalleryProvider,
  LightgalleryItem,
} from "react-lightgallery";

const imgs = [
  "https://images.unsplash.com/photo-1594818898109-44704fb548f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
  "https://images.unsplash.com/photo-1594818896795-35ad7bcf3c6a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
  "https://images.unsplash.com/photo-1594818896744-57eca4d47b07?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
  "https://images.unsplash.com/photo-1594818896744-57eca4d47b07?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
  "https://images.unsplash.com/photo-1594818897077-aec41f55241f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80",
  "https://images.unsplash.com/photo-1594818897077-aec41f55241f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80",
  "https://images.unsplash.com/photo-1594818897077-aec41f55241f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80",
  "https://images.unsplash.com/photo-1594818897077-aec41f55241f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80",
  "https://images.unsplash.com/photo-1594818897077-aec41f55241f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1951&q=80",
];


const PhotoItem = ({ image, thumb, group }) => (
  <div style={{ maxWidth: "250px", width: "200px", padding: "5px" }}>
    <LightgalleryItem group={group} src={image} thumb={thumb}>
      <img src={image} style={{ width: "100%" }} />
    </LightgalleryItem>
  </div>
);

const VideoItem = ({ thumbnail, video }) => {
  const settings = `{
    "source": [{"src": "${video}", "type":"video/mp4"}], 
    "attributes": {"preload": false, "playsinline": true, "controls": true}
  }`;

  return <LightGallery
    appendSubHtmlTo='.lg-item'
    addClass='.fb-comments'
    mode='lg-fade'
    loop='true'
    plugins={[lgThumbnail, lgZoom, lgVideo]}
    download={false}
    enableDrag={false}
    enableSwipe={false}
  >
    <a data-video={settings}>
      <img
        style={{ maxWidth: "250px", width: "200px", padding: "5px" }}
        src={thumbnail}
        alt="Video Title" />
    </a>
  </LightGallery>
}

export default function ShowProjectMedia() {
  return (
    <div className="content">
      <div>
        <LightgalleryProvider
        >
          <h1>Media</h1>

          <div className="d-flex align-items-center flex-wrap">
            {imgs.map((p, idx) => (
              <PhotoItem key={idx} image={p} group="imgs" />
            ))}
          </div>

          <h1>Videos</h1>
          {
            Array(7).fill().map((e, indx) => (
              <VideoItem
                key={indx + 1}
                thumbnail="https://images.unsplash.com/photo-1594818896744-57eca4d47b07?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                video="https://disquestockage.fra1.digitaloceanspaces.com/album/disquestockage/1630dfa102d5ed.mp4"
              />
            ))
          }

        </LightgalleryProvider>
      </div>
    </div>
  );
}
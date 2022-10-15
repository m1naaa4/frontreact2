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

const VideoItem = ({ thumbnail, video }) => {
  const settings = `{
    "source": [{"src": "${video}", "type":"video/mp4"}], 
    "attributes": {"preload": false, "playsinline": true, "controls": true}
  }`;

  return <LightGallery
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
      <h3>Videos</h3>
      <div className="d-flex flex-wrap">
        {
          Array(7).fill().map((e, indx) => (
            <VideoItem
              key={indx + 1}
              thumbnail="https://images.unsplash.com/photo-1594818896744-57eca4d47b07?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
              video="https://disquestockage.fra1.digitaloceanspaces.com/album/disquestockage/1630dfa102d5ed.mp4"
            />
          ))
        }
      </div>
    </div>
  );
}
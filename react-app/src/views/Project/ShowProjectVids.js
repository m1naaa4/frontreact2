import React, { useEffect, useRef, useState } from "react";
import {
  LightgalleryProvider,
  LightgalleryItem,
  LightGallery
} from "react-lightgallery";
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-video.css';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import lgVideo from 'lightgallery/plugins/video';
import { useSelector } from "react-redux";
import GalleryComponent from "./GalleryComponent";

const VideoItem = ({ video }) => {
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [thumbnail, setThumbnail] = useState(null);
  
  
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    console.log(video);
    if (!video || !canvas) {
      return;
    }
    const ctx = canvas.getContext('2d');

    video.addEventListener('loadedmetadata', () => {
      if (video.offsetHeight === undefined) {
        return;
      }
      // Set canvas dimensions to match video dimensions
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Draw the first frame of the video onto the canvas
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      // Get the thumbnail image data from the canvas as a data URL
      const thumbnailData = canvas.toDataURL('image/jpeg');


      // Use the thumbnailData as needed
      setThumbnail(thumbnailData)
    });
  }, [video]);

  
  const settings = JSON.stringify({
    source: [{ src: video, type: 'video/mp4' }],
    attributes: { preload: false, playsinline: true, controls: true },
  });

  return (
    <LightGallery mode='lg-fade' loop='true' 
    plugins={[lgThumbnail, lgZoom, lgVideo]} download={false} enableDrag={false} enableSwipe={false}>
      <a data-video={settings} className="lg-video-item" >
        {thumbnail ? (
          <img
            style={{ maxWidth: "250px", width: "200px", padding: "5px" }}
            src={thumbnail}
            alt="Video Title"
          />
        ) : (
          <div>Loading ...</div>
        )}
      </a>
      <video ref={videoRef} src={video} style={{ display: "none" }} />
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </LightGallery>
  );
};
 
const ShowProjectVids = () => {
  const [videos, setVideos] = useState([]);
  const project = useSelector(state => state.getproject.getproject?.project);

  useEffect (() => {
    if (project) { 
      const links = project?.media_link.map((item) => { 
        if (/\.(mp4|ogg|webm|x-msvideo|quicktime)$/i.test(item)) {
          return item;
        }
        return null;
      }).filter(item => item !== null);

      setVideos(links);
      console.log(links);
    }
  }, [project]);

  return (
    <div className="content">
      <h3>Videos</h3>
      <LightgalleryProvider>
      <div className="d-flex flex-wrap">
        
          {videos.map((videoUrl, index) => (
                <LightGallery key={index}
                  mode='lg-fade'
                  loop='true'
                  plugins={[lgZoom, lgVideo]}
                  download={false}
                  enableDrag={false}
                  enableSwipe={false}
                >
                  {videoUrl}
                  <a
                    key={index}
                    data-lg-size="880-250"
                    data-video={'{"source": [{"src": "' + videoUrl + '", "type": "video/mp4"}]}'}
                    data-poster={videoUrl}
                  > 
                  <img
                    style={{ maxWidth: "250px", width: "200px", padding: "5px" }}
                    src="https://images.unsplash.com/photo-1594818896744-57eca4d47b07?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
                    alt="Video Title" 
                  />
                  </a>
                  
                </LightGallery>
            
          ))}
      </div>
      </LightgalleryProvider>
    </div>
  );
};

export default ShowProjectVids;

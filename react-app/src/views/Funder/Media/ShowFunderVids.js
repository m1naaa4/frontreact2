import React, { useEffect, useState } from "react";
// import LightGallery from 'lightgallery/react';
// import styles
// import 'lightgallery/css/lg-fb-comment-box.css';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-video.css';

// import plugins if you need
// import lgThumbnail from 'lightgallery/plugins/thumbnail';
// import lgZoom from 'lightgallery/plugins/zoom';
// import lgVideo from 'lightgallery/plugins/video';
// import SubVideo from "./SubVideo";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player";
import NoContent from "../../../utils/NoContent";
 
const ShowFunderVids = () => {
  const [videos, setVideos] = useState([]);
  const project = useSelector(state => state.funders.funder);

  useEffect (() => {
    if (project) { 
      const links = (Array.isArray(project.media)? project.media : [project?.media]).map((item) => { 
        if (/\.(mp4|ogg|webm|x-msvideo|quicktime)$/i.test(item)) {
          return item;
        }
        return null;
      }).filter(item => item !== null);

      setVideos(links);
    }
  }, [project]);

  return (
    <div className="content">
      <h3>Videos</h3>
      {/* <div className="d-flex flex-wrap"> */}
        {videos.length > 0 ? videos.map((videoUrl, index) => (
          <ReactPlayer width='250' height='200' controls={true} key={index} url={videoUrl}/>
        )) : <NoContent/>
            }
      {/* </div> */}
    </div>
  );
};

export default ShowFunderVids;

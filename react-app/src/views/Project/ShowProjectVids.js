import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import ReactPlayer from "react-player";
import NoContent from "../../utils/NoContent";
import { useTranslation } from "react-i18next";
import "./ShowProjectVids.css";
 
const ShowProjectVids = () => {
  const [videos, setVideos] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);
  const project = useSelector(state => state.getproject.getproject?.project);
  const {t} = useTranslation();

  useEffect (() => {
    if (project) { 
      const mediaLinks = Array.isArray(project?.media_link) ? project.media_link : [];
      const links = mediaLinks.map((item) => { 
        if (/\.(mp4|ogg|webm|x-msvideo|quicktime)$/i.test(item)) {
          return item;
        }
        return null;
      }).filter(item => item !== null);

      setVideos(links);
    }
  }, [project]);

  const activeConfig = useMemo(() => {
    if (!activeVideo) {
      return null;
    }

    return {
      url: activeVideo,
      playing: true,
      controls: true,
      width: '100%',
      height: '100%'
    };
  }, [activeVideo]);

  return (
    <div className="content">
      <h3 className="tab-title">{t('Videos')}</h3>

      {videos.length > 0 ? (
        <>
          <div
            className="project-video-grid"
          >
            {videos.map((videoUrl, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setActiveVideo(videoUrl)}
                className="project-video-card"
              >
                <div className="project-video-thumb">
                  <ReactPlayer
                    width="100%"
                    height="100%"
                    controls={false}
                    playing={false}
                    muted
                    light
                    url={videoUrl}
                  />
                </div>
              </button>
            ))}
          </div>

          {activeConfig && (
            <div
              onClick={() => setActiveVideo(null)}
              className="project-video-overlay"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="project-video-player"
              >
                <button
                  type="button"
                  onClick={() => setActiveVideo(null)}
                  className="project-video-close"
                  aria-label="Fermer la vidéo"
                >
                  ×
                </button>
                <ReactPlayer {...activeConfig} />
              </div>
            </div>
          )}
        </>
      ) : (
        <NoContent />
      )}
    </div>
  );
};

export default ShowProjectVids;

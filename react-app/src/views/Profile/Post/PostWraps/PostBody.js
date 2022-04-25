import React, { useRef, useEffect } from 'react'
import $ from "jquery";
import YouTube from 'react-youtube';
import { LightgalleryItem } from "react-lightgallery";
import VideoJS from '../../../../helpers/VideoJS';


export default function PostBody({ post }) {    
  const playerRef = useRef(null);
  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: post.media_link,
      type: 'video/mp4'
    }]
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      player.log('player is waiting');
    });

    player.on('dispose', () => {
      player.log('player will dispose');
    });
  };

  useEffect(() => {
    var fixLeft = $('.Left-Side').offset()?.top + $('.Left-Side').outerHeight() - window.innerHeight;       // get initial position of the element
        $(window).scroll(function() {                  // assign scroll event listener
            var currentScroll = $(window).scrollTop(); // get current position
            if (currentScroll >= fixLeft) {           // apply position: fixed if you
                var mtStatic = ($('.Dadupa-Header').outerHeight() + 10);
                $('.Left-Side').css({                      // scroll to that element or below it
                    position: 'fixed',
                    bottom: '-'+(mtStatic+15)+'px',
                    width: '255',
                });
                $('.Right-Side').css({                      // scroll to that element or below it
                      position: 'fixed',
                      bottom: '-'+mtStatic+'px',
                      width: '255',
                });
            } else {                                   // apply position: static
                $('.Left-Side').css({                      // if you scroll above it
                    position: 'static'
                });
                $('.Right-Side').css({                      // if you scroll above it
                  position: 'static'
              });
            }
        });
      });
      const opts = {
        height: '300',
        width: '100%',
        // playerVars: {
        //   // https://developers.google.com/youtube/player_parameters
        //   autoplay: 1,
        // },
      };

    const PhotoItem = ({ image,group }) => (
        <div>
            <LightgalleryItem group={group} src={image}>
              <img src={image} width="100%" />
            </LightgalleryItem>
        </div>
    );
    return (
        
      <div className="PostBody">
        <div className="PostBody-Text">
        
          {post.body}
          {
            post.media_link? (post.is_video ? (
              <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
                ) : (post.type === 'youtube' ?
                (<YouTube videoId={post.media_link} opts={opts} />):(<PhotoItem image={post.media_link} group={post.id}></PhotoItem>))):''
          }
        </div>
    </div>        

    )
}

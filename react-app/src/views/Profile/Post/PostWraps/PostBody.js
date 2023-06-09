import React, { useRef, useEffect } from 'react'
import $ from "jquery";
import YouTube from 'react-youtube';
import VideoJS from '../../../../helpers/VideoJS';
import ReactPlayer from 'react-player';


export default function PostBody({ post }) {    
  const playerRef = useRef(null);
  const videoJsOptions = {
    autoplay: false,
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

    const imgLarger = {
      width: '100%',
    };

    const styles = {
      // width: '100%',
      // height: '10px',
      width: `${100/post?.media_link?.length}%`,
      height: "calc(100.25%)"
    };

    // const PhotoItem = ({ image, group }) => (
    //     <div>
    //         <LightgalleryItem group={group} src={image}>
    //           <img src={image} width="100%" />
    //         </LightgalleryItem>
    //     </div>
    // );

    const getExtension = (file) => {
      if (/^(https?:\/\/)?((www\.)?youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9_-]{11}/.test(file))
      { 
          return 'youtube';
      }
      else if (/^(https?:\/\/)?(www\.)?vimeo\.com\/\d+/.test(file))
      {
          return 'vimeo';
      }
      else
      {
          return file.split('.').pop().toLowerCase();
      }
    };

    return (
        
      <div className="PostBody">
        <div className="PostBody-Text">
        
          {post.body}
          {post && Array.isArray(post?.media_link) &&
          <>
          {post?.media_link.map((item, index) => (
                <div key = {index} >
                    <div className=" input-row">
                    {(function() {
                      var imgClass = (index === 0) ? imgLarger : styles;
                            if(getExtension(post.type) == 'youtube'){
                                return <YouTube videoId={item} opts={opts} />
                            }else{
                                if(getExtension(post.type) == 'vimeo'){
                                    return <ReactPlayer style={imgClass} url={item} controls = {true} />
                                }else{
                                    if(getExtension(item) == 'mp4' || getExtension(item) == ('x-mpeg2') ||
                                    getExtension(item) == ('x-msvideo') || getExtension(item) == ('quicktime')){
                                        return <VideoJS style={imgClass}  options = {
                                        {
                                            autoplay: false,
                                            controls: true,
                                            responsive: true,
                                            fluid: true,
                                            sources: [{
                                                src: item,
                                                type: 'video/mp4'
                                            }]
                                        }
                                        }/>
                                    }else{
                                        return <img style={imgClass} src={item} alt="post"/>
                                    }
                                }
                            }
                    })()}
                    </div>
                </div>
            ))}
          </>
          }
        </div>
    </div>        

    )
}
